import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import {
  isPaymentServiceEnabled,
  togglePaymentService,
} from "../services/services.js";

import { Cashfree, CFEnvironment } from "cashfree-pg";
const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_SECRET_ID;
const enviornment =
  process.env.CF_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;
const cashfree = new Cashfree(enviornment, clientId, clientSecret);

export const checkout = async (req, res) => {
  // check is payment service is enabled or not
  const paymentServiceStatus = await isPaymentServiceEnabled();
  if (!paymentServiceStatus) {
    res.status(503).json({ message: "Payment service is currently disabled." });
    return;
  }

  // get user id from auth middleware
  const userId = req.userId;
  // get product id and user phone from request body
  const { productId, userPhone, selectedStation } = req.body;

  try {
    // fetch product and user details from database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.phone = userPhone || user.phone;
    await user.save();

    // check product availability
    const productIsAvailable =
      product.category === "web" ? true : product.stock > 0;
    if (!productIsAvailable) {
      return res.status(400).json({ message: "Product is out of stock." });
    }
    // reduce product stock by 1 if not web category
    if (product.category !== "web") {
      product.stock -= 1;
    }
    await product.save();

    // create payment record in database
    const payment = await Payment.create({
      user: userId,
      product: product._id,
      amount: product.price,
      selectedStation: selectedStation,
    });
    await payment.save();

    // create order data for cashfree
    const order_data = {
      order_amount: product.price,
      order_currency: "INR",
      order_id: payment._id,
      customer_details: {
        customer_id: userId,
        customer_phone: userPhone,
        customer_email: user.email,
        customer_name: user.name,
      },
      order_meta: {
        payment_methods: "upi",
      },
      cart_details: {
        cart_items: [
          {
            item_id: product._id,
            item_name: product.name,
            item_description: product.projectContext,
            item_price: product.price,
            item_quantity: 1,
            item_currency: "INR",
            item_category: product.category,
          },
        ],
      },
      order_expiry_time: new Date(
        Date.now() + 1 * 16 * 60 * 1000 // 16 minutes from now
      ).toISOString(),
      order_note: `Order for ${product.name}`,
    };
    const response = await cashfree.PGCreateOrder(order_data);

    if (response.data.payment_session_id) {
      res.status(200).json({
        paymentSessionId: response.data.payment_session_id,
        orderId: payment._id,
      });
    } else {
      await Payment.findByIdAndDelete(payment._id);
      res.status(500).json({ message: "Failed to create payment session." });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { OrderId } = req.body;

    // fetch payment record from database
    const paymentSchema = await Payment.findById(OrderId);
    if (!paymentSchema) {
      return res
        .status(404)
        .json({ message: "Payment not found, please contact support team." });
    }

    // fetch payment status from cashfree
    const result = await cashfree.PGOrderFetchPayments(OrderId);
    let responseBody = { message: "Payment response received." };
    let httpStatus = 201;

    if (result && result.data && result.data.length > 0) {
      const paymentStatus = result.data[0].payment_status;

      if (paymentStatus === "SUCCESS") {
        // create order record in database
        const orderSchema = await Order.create({
          user: paymentSchema.user,
          product: paymentSchema.product,
          amount: paymentSchema.amount,
          selectedStation: paymentSchema.selectedStation,
        });
        await orderSchema.save();

        // add product to user's cart (library)
        let cart = await Cart.findOne({ user: paymentSchema.user });
        if (cart) {
          const productExists = cart.products.includes(paymentSchema.product);

          if (productExists) {
            responseBody.message =
              "Product was already in the cart, order created.";
            httpStatus = 200;
          } else {
            cart.products.push(paymentSchema.product);
            await cart.save();
            responseBody.message =
              "Order created and product added to existing cart.";
            httpStatus = 201;
          }
        } else {
          const newCart = await Cart.create({
            user: paymentSchema.user,
            products: [paymentSchema.product],
          });
          responseBody.message =
            "Order created, cart created, and product added.";
          responseBody.orderId = orderSchema._id;
          responseBody.amount = orderSchema.amount;

          httpStatus = 201;
        }

        paymentSchema.status = "completed";

        // Ensure order details are sent even if cart already existed
        if (!responseBody.orderId) {
          responseBody.orderId = orderSchema._id;
          responseBody.amount = orderSchema.amount;
        }
      } else if (paymentStatus === "FAILED") {
        paymentSchema.status = "failed";
        responseBody.message = `Payment ${paymentStatus}.`;
        httpStatus = 400;
      } else if (paymentStatus === "EXPIRED") {
        paymentSchema.status = "expired";
        responseBody.message = `Payment ${paymentStatus}.`;
        httpStatus = 410;
      } else if (paymentStatus === "USER_DROPPED") {
        paymentSchema.status = "user_dropped";
        responseBody.message = `Payment ${paymentStatus}.`;
        httpStatus = 400;
      } else if (paymentStatus === "PENDING") {
        paymentSchema.status = "processing";
        responseBody.message = `Payment ${paymentStatus}.`;
        httpStatus = 202;
      }

      await paymentSchema.save();
    } else {
      console.log("No payment fetch result found.");
      responseBody.message = "Payment check failed: No result from gateway.";
      httpStatus = 500;
    }

    res.status(httpStatus).json(responseBody);
  } catch (error) {
    console.error("Error processing payment response:", error);
    res
      .status(500)
      .json({ message: "Server error while processing payment response." });
  }
};

export const paymentServiceToggle = async (req, res) => {
  try {
    const { enabled } = req.body;
    await togglePaymentService(enabled);
    res.status(200).json({ message: "Payment service status updated." });
  } catch (error) {
    console.error("Error toggling payment service:", error);
  }
};

export const paymentServiceStatus = async (req, res) => {
  try {
    const status = isPaymentServiceEnabled();
    res.status(200).json({ enabled: status });
  } catch (error) {
    console.error("Error fetching payment service status:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching service status." });
  }
};

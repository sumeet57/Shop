import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import {
  isPaymentServiceEnabled,
  togglePaymentService,
} from "../services/services.js";

import { Cashfree, CFEnvironment } from "cashfree-pg";
const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_SECRET_ID;
const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, clientSecret);

export const paymentResponse = async (req, res) => {
  try {
    const { OrderId } = req.body;
    console.log(req.body);

    const paymentSchema = await Payment.findById(OrderId);
    if (!paymentSchema) {
      return res.status(404).json({ message: "Payment record not found." });
    }

    const result = await cashfree.PGOrderFetchPayments(OrderId);
    let responseBody = { message: "Payment response received." };
    let httpStatus = 201;

    if (result && result.data && result.data.length > 0) {
      const paymentStatus = result.data[0].payment_status;
      console.log("Payment fetch result:", paymentStatus);

      if (paymentStatus === "SUCCESS") {
        const orderSchema = await Order.create({
          user: paymentSchema.user,
          product: paymentSchema.product,
          amount: paymentSchema.amount,
          selectedStation: paymentSchema.selectedStation,
        });
        await orderSchema.save();

        try {
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
              // Removed responseBody.cart = cart;
              httpStatus = 201;
            }
          } else {
            const newCart = await Cart.create({
              user: paymentSchema.user,
              products: [paymentSchema.product],
            });
            responseBody.message =
              "Order created, cart created, and product added.";

            // CORRECTED: Send order details instead of cart
            responseBody.orderId = orderSchema._id;
            responseBody.amount = orderSchema.amount;

            httpStatus = 201;
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
          responseBody.message =
            "Payment SUCCESS, but server error occurred while updating cart.";
          httpStatus = 500;
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

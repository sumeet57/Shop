import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// cashfree integration
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { isPaymentServiceEnabled } from "../services/services.js";
const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_SECRET_ID;
const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, clientSecret);

export const getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const cart = await Cart.find({ user: userId }).populate("products");
    if (!cart) {
      console.log("Cart not found for user ID:", userId);
      return res.status(404).json({ message: "Cart not found." });
    }

    res.status(200).json({ data: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error while fetching cart." });
  }
};

export const addToCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const productExists = cart.products.includes(productId);

      if (productExists) {
        return res
          .status(409)
          .json({ message: "Product is already in the cart." });
      }

      cart.products.push(productId);
      await cart.save();
      return res
        .status(200)
        .json({ message: "Product added to existing cart.", cart });
    } else {
      const newCart = await Cart.create({
        user: userId,
        products: [productId],
      });
      return res
        .status(200)
        .json({ message: "Cart created and product added.", cart: newCart });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error while adding to cart." });
  }
};

export const checkout = async (req, res) => {
  // check is payment service is enabled or not
  const paymentServiceStatus = await isPaymentServiceEnabled();

  if (!paymentServiceStatus) {
    res.status(503).json({ message: "Payment service is currently disabled." });
    return;
  }

  const userId = req.userId;
  const { productId, userPhone, selectedStation } = req.body;

  try {
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

    const productIsAvailable =
      product.category === "web" ? true : product.stock > 0;
    if (!productIsAvailable) {
      return res.status(400).json({ message: "Product is out of stock." });
    }
    if (product.category !== "web") {
      product.stock -= 1;
    }
    await product.save();

    const payment = await Payment.create({
      user: userId,
      product: product._id,
      amount: product.price,
      selectedStation: selectedStation,
    });

    await payment.save();

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
        return_url: `${process.env.CLIENT_URL}/`,
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
        Date.now() + 1 * 16 * 60 * 1000 // 2 minutes
      ).toISOString(),
      order_note: `Order for ${product.name}`,
    };
    const response = await cashfree.PGCreateOrder(order_data);

    if (response.data.payment_session_id) {
      res.status(200).json({
        paymentLink: response.data.payment_link,
        paymentSessionId: response.data.payment_session_id,
        orderId: payment._id,
      });
    } else {
      res.status(500).json({ message: "Failed to create payment session." });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};

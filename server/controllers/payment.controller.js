import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import {
  isPaymentServiceEnabled,
  togglePaymentService,
} from "../services/services.js";
export const paymentResponse = async (req, res) => {
  try {
    const { OrderId } = req.body;
    console.log(req.body);

    const paymentSchema = await Payment.findById(OrderId);
    if (!paymentSchema) {
      return res.status(404).json({ message: "Payment record not found." });
    }
    if (paymentSchema.status === "processing") {
      paymentSchema.status = "completed";
    }
    await paymentSchema.save();

    const orderSchema = await Order.create({
      user: paymentSchema.user,
      product: paymentSchema.product,
      amount: paymentSchema.amount,
      selectedStation: paymentSchema.selectedStation,
    });
    await orderSchema.save();

    try {
      let cart = await Cart.findOne(paymentSchema.user);

      if (cart) {
        const productExists = cart.products.includes(paymentSchema.product);

        if (productExists) {
          return res
            .status(409)
            .json({ message: "Product is already in the cart." });
        }

        cart.products.push(paymentSchema.product);
        await cart.save();
        return res
          .status(201)
          .json({ message: "Product added to existing cart.", cart });
      } else {
        const newCart = await Cart.create({
          user: paymentSchema.user,
          products: [paymentSchema.product],
        });
        return res.status(201).json({
          message: "Cart created and product added.",
          cart: newCart,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Server error while adding to cart." });
    }

    await paymentSchema.save();
    res.status(201).json({ message: "Payment response received." });
  } catch (error) {
    console.error("Error processing payment response:", error);
    res
      .status(500)
      .json({ message: "Server error while processing payment response." });
  }
};

export const paymentFailed = async (req, res) => {
  try {
    const { OrderId } = req.body;

    const paymentSchema = await Payment.findById(OrderId);
    if (!paymentSchema) {
      return res.status(404).json({ message: "Payment record not found." });
    }

    const product = await Product.findById(paymentSchema.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    paymentSchema.status = "failed";
    await paymentSchema.save();

    if (product.category === "iot") {
      product.stock += 1;
      await product.save();
    }

    res.status(200).json({ message: "Payment marked as failed successfully." });
  } catch (error) {
    console.error("Error processing failed payment:", error);
    res.status(500).json({
      message: "Server error while processing failed payment.",
    });
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

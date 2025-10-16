import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Cart from "../models/cart.model.js";
export const paymentResponse = async (req, res) => {
  try {
    const { order, payment, customer_details } = req.body.data;

    console.log("\n\n===================================");
    console.log("payment response webhook called");
    console.log("Order ID:", order.order_id);
    console.log("===================================\n\n");

    const paymentSchema = await Payment.findById(order.order_id);
    if (!paymentSchema) {
      console.log("Payment record not found for ID:", order.order_id);
      return res.status(404).json({ message: "Payment record not found." });
    } else if (paymentSchema.status !== "completed") {
      console.log("Payment already completed for ID:", order.order_id);
      return res.status(200).json({ message: "Payment already completed." });
    } else if (paymentSchema.status === "completed") {
      paymentSchema.status =
        payment.payment_status === "SUCCESS"
          ? "completed"
          : payment.payment_status === "FAILED"
          ? "failed"
          : payment.payment_status === "USER_DROPPED"
          ? "cancelled"
          : "processing";
    }

    await paymentSchema.save();
    if (payment.payment_status === "SUCCESS") {
      const orderSchema = await Order.create({
        user: paymentSchema.user,
        product: paymentSchema.product,
        amount: payment.payment_amount,
      });
      await orderSchema.save();

      try {
        let cart = await Cart.findOne(paymentSchema.user);

        if (cart) {
          console.log("Cart found for user ID:", paymentSchema.product);
          const productExists = cart.products.includes(paymentSchema.product);
          console.log("Product exists in cart:", productExists);

          if (productExists) {
            return res
              .status(409)
              .json({ message: "Product is already in the cart." });
          }

          cart.products.push(paymentSchema.product);
          await cart.save();
          return res
            .status(200)
            .json({ message: "Product added to existing cart.", cart });
        } else {
          const newCart = await Cart.create({
            user: paymentSchema.user,
            products: [paymentSchema.product],
          });
          return res.status(200).json({
            message: "Cart created and product added.",
            cart: newCart,
          });
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server error while adding to cart." });
      }
    }

    await paymentSchema.save();
    res.status(200).json({ message: "Payment response received." });
  } catch (error) {
    console.error("Error processing payment response:", error);
    res
      .status(500)
      .json({ message: "Server error while processing payment response." });
  }
};

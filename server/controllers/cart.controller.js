import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

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

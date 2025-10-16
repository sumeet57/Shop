import Product from "../models/product.model.js";
import { imagekit } from "../services/image.service.js";
export const createProduct = async (req, res) => {
  const {
    name,
    projectContext,
    description,
    price,
    stock,
    category,
    features,
    includes,
    imageUrl,
  } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image upload failed." });
  }
  try {
    const featuresArray = JSON.parse(features);
    const includesArray = JSON.parse(includes);

    const newProduct = new Product({
      user: req.userId,
      name,
      projectContext,
      description,
      price,
      imageUrl,
      imageFileId: req.body.imageFileId,
      stock,
      category,
      features: featuresArray,
      includes: includesArray,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating product." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (updateData.features && typeof updateData.features === "string") {
      updateData.features = JSON.parse(updateData.features);
    }
    if (updateData.includes && typeof updateData.includes === "string") {
      updateData.includes = JSON.parse(updateData.includes);
    }

    if (updateData.imageUrl && updateData.imageFileId) {
      const existingProduct = await Product.findById(id);
      if (existingProduct && existingProduct.imageFileId) {
        try {
          await imagekit.deleteFile(existingProduct.imageFileId);
        } catch (err) {
          console.error(
            "Cleanup error: Failed to delete old image from ImageKit:",
            err
          );
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Product update failed:", error);
    res.status(500).json({
      message: error.message || "Server error while updating product.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting product." });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching product." });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
};

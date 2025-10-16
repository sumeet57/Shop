import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  projectContext: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, required: true, trim: true },
  imageFileId: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true, index: true },
  features: { type: Array, trim: true },
  includes: { type: Array, trim: true },
});
const Product = mongoose.model("Product", productSchema);
export default Product;

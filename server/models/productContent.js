import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
});

const productContentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  links: [linkSchema], // Array of links
});

const ProductContent = mongoose.model("ProductContent", productContentSchema);
export default ProductContent;

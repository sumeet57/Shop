import mongoose from "mongoose";

const productContentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  link: {
    type: [String],
    required: true,
  },
});

const ProductContent = mongoose.model("ProductContent", productContentSchema);
export default ProductContent;

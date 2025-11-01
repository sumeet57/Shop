import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: { type: Number, required: true, min: 1 },
  discountedAmount: { type: Number, default: 0, min: 0 },
  paymentMethod: {
    type: String,
    enum: ["upi", "cash", "gift"],
    required: true,
  },
  selectedStation: { type: String, required: true },
  status: {
    type: String,
    enum: ["confirmed", "making", "shipped", "delivered", "cancelled"],
    default: "confirmed",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

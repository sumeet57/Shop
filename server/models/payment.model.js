import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "completed", "failed", "cancelled"],
    default: "processing",
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

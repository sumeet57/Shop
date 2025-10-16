import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  hashedCode: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  attempts: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
  blockExpiresAt: {
    type: Date,
  },
});

const Verification = mongoose.model("Verification", verificationSchema);

export default Verification;

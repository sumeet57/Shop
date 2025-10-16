import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/email.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const cookieOptionsAccess = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 30 * 60 * 1000, // 30 minutes
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
  // sameSite: "None",
};
const cookieOptionsRefresh = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
  // sameSite: "None",
};

const generateTokensAndSetCookies = (userId, res) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.cookie("accessToken", accessToken, cookieOptionsAccess);
  res.cookie("refreshToken", refreshToken, cookieOptionsRefresh);

  return { accessToken, refreshToken };
};

export const requestCode = async (req, res) => {
  const { email, type } = req.body;

  if (!email || !type) {
    return res
      .status(400)
      .json({ message: "Email and action type are required." });
  }

  try {
    if (type === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Account not found. Please register first." });
      }
    }

    let verification = await Verification.findOne({ email });

    if (verification) {
      if (verification.attempts >= 5) {
        if (
          verification.blockExpiresAt &&
          verification.blockExpiresAt > new Date()
        ) {
          return res
            .status(429)
            .json({ message: "Too many attempts. Please try again later." });
        }
        verification.attempts = 1;
        verification.blockExpiresAt = undefined;
      } else {
        verification.attempts += 1;
      }
    } else {
      verification = new Verification({ email, attempts: 1 });
    }

    if (verification.attempts === 5) {
      verification.blockExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    }

    const code = generateCode();
    verification.hashedCode = await bcrypt.hash(code, 12);
    verification.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await verification.save();

    await sendVerificationEmail(email, code);

    res.status(200).json({
      message: "Verification code sent to your email.",
      testOnlyCode: code,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while requesting code." });
  }
};
export const register = async (req, res) => {
  const { email, name, code } = req.body;
  try {
    const verification = await Verification.findOne({ email });
    if (!verification || verification.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "Code is invalid or has expired." });
    }
    const isMatch = await bcrypt.compare(code, verification.hashedCode);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect verification code." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }
    const newUser = await User.create({
      name,
      email,
    });
    await Verification.deleteOne({ email });

    generateTokensAndSetCookies(newUser._id, res);

    res.status(200).json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

export const login = async (req, res) => {
  const { email, code } = req.body;
  try {
    const verification = await Verification.findOne({ email });
    if (!verification || verification.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "Code is invalid or has expired." });
    }
    const isMatch = await bcrypt.compare(code, verification.hashedCode);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect verification code." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Account not found. Please register first." });
    }
    await Verification.deleteOne({ email });

    generateTokensAndSetCookies(user._id, res);

    res
      .status(200)
      .json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching user." });
  }
};
export const logout = (req, res) => {
  res.clearCookie("accessToken", { ...cookieOptionsAccess });
  res.clearCookie("refreshToken", { ...cookieOptionsRefresh });
  return res.status(200).json({ message: "Logged out successfully." });
};

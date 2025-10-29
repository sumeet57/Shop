import {
  loginSchema,
  registerSchema,
  verifyCodeSchema,
} from "../validations/auth.validate.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validate.js";

// auth validation middlewares
export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateVerificationCode = (req, res, next) => {
  const { error } = verifyCodeSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// product validation middlewares
export const validateCreateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// params mongoose ID validation middleware
import mongoose from "mongoose";
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  next();
};

import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "A valid email address is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),
  code: Joi.string().length(6).required().messages({
    "string.length": "Verification code must be 6 characters long",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "A valid email address is required",
  }),
  code: Joi.string().length(6).required().messages({
    "string.length": "Verification code must be 6 characters long",
  }),
});

export const verifyCodeSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "A valid email address is required su",
  }),
  type: Joi.string().valid("register", "login").required(),
});

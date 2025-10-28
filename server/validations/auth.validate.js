import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
  code: Joi.string().length(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
});

export const verifyCodeSchema = Joi.object({
  email: Joi.string().email().required(),
  type: Joi.string().valid("register", "login").required(),
});

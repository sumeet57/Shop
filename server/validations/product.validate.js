import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.min": "Product name must be at least 3 characters long",
    "string.max": "Product name must be at most 100 characters long",
  }),
  projectContext: Joi.string().min(10).max(150).required().messages({
    "string.min": "Project context must be at least 10 characters long",
    "string.max": "Project context must be at most 150 characters long",
  }),
  price: Joi.number().min(1000).max(10000).required().messages({
    "number.min": "Price must be at least 1000",
    "number.max": "Price must be at most 10000",
  }),
  description: Joi.string().min(20).max(2000).required().messages({
    "string.min": "Description must be at least 20 characters long",
    "string.max": "Description must be at most 2000 characters long",
  }),
  // if category is iot, then stock is required otherwise is optional
  category: Joi.string().valid("iot", "web", "WEB", "IOT").required().messages({
    "any.only": "Category must be either 'IOT' or 'WEB'",
  }),
  stock: Joi.when("category", {
    is: "iot",
    then: Joi.number().min(0).required().messages({
      "number.min": "Stock must be at least 0",
      "any.required": "Stock is required for IOT products",
    }),
    otherwise: Joi.number().min(0).optional().messages({
      "number.min": "Stock must be at least 0",
    }),
  }),
  link: Joi.string().uri().required().messages({
    "string.uri": "Link must be a valid URI",
  }),
  file: Joi.any().optional().messages({
    "any.required": "Product image is required",
  }),
  features: Joi.optional(),
  includes: Joi.optional(),
  imageUrl: Joi.optional(),
  imageFileId: Joi.optional(),
});

export const updateProductSchema = createProductSchema.fork(
  [
    "name",
    "projectContext",
    "price",
    "description",
    "category",
    "stock",
    "link",
  ],
  (schema) => schema.optional()
);

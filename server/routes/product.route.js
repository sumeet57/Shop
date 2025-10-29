import { Router } from "express";
import { Authenticate } from "../middlewares/Authentication.js";
import { authorize } from "../middlewares/Authorization.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { imagekitUploadMiddleware } from "../middlewares/ImageUpload.js";
import {
  validateCreateProduct,
  validateObjectId,
  validateUpdateProduct,
} from "../middlewares/validation.js";

const productRouter = Router();
const adminOnly = [Authenticate, authorize(["admin"])];
productRouter.post(
  "/create",
  ...adminOnly,
  imagekitUploadMiddleware, // ✅ parse body first
  validateCreateProduct, // ✅ validate after
  createProduct
);

productRouter.put(
  "/update/:id",
  validateObjectId,
  ...adminOnly,
  imagekitUploadMiddleware, // ✅ parse first
  validateUpdateProduct, // ✅ validate after
  updateProduct
);

productRouter.delete(
  "/delete/:id",
  validateObjectId,
  ...adminOnly,
  deleteProduct
);
productRouter.get("/:id", validateObjectId, getProduct);
productRouter.get("/", getProducts);

export default productRouter;

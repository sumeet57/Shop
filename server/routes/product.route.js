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

const productRouter = Router();

productRouter.post(
  "/create",
  Authenticate,
  authorize(["admin"]),
  imagekitUploadMiddleware,
  createProduct
);
productRouter.put(
  "/update/:id",
  Authenticate,
  authorize(["admin"]),
  imagekitUploadMiddleware,
  updateProduct
);
productRouter.delete(
  "/delete/:id",
  Authenticate,
  authorize(["admin"]),
  deleteProduct
);
productRouter.get("/:id", getProduct);
productRouter.get("/", getProducts);

export default productRouter;

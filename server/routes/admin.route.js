import { Router } from "express";
import { Authenticate } from "../middlewares/Authentication.js";
import { authorize } from "../middlewares/Authorization.js";
import {
  getOrders,
  updateOrderStatus,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

const adminOnly = [Authenticate, authorize(["admin"])];
adminRouter.get("/orders", Authenticate, authorize(["admin"]), getOrders);
adminRouter.put("/orders/:orderId", ...adminOnly, updateOrderStatus);

export default adminRouter;

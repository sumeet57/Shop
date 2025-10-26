import { Router } from "express";
import { Authenticate } from "../middlewares/Authentication.js";
import { authorize } from "../middlewares/Authorization.js";
import {
  getAllUsers,
  getOrders,
  updateOrderStatus,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

const adminOnly = [Authenticate, authorize(["admin"])];
adminRouter.get("/orders", ...adminOnly, getOrders);
adminRouter.put("/orders/:orderId", ...adminOnly, updateOrderStatus);
adminRouter.get("/users", ...adminOnly, getAllUsers);

export default adminRouter;

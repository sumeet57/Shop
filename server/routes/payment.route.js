import { Router } from "express";
import {
  paymentFailed,
  paymentResponse,
  paymentServiceStatus,
  paymentServiceToggle,
} from "../controllers/payment.controller.js";
import { checkout } from "../controllers/cart.controller.js";
import { Authenticate } from "../middlewares/Authentication.js";
import { authorize } from "../middlewares/Authorization.js";

const paymentRoute = Router();

paymentRoute.post("/checkout", Authenticate, checkout);
paymentRoute.post("/verify", Authenticate, paymentResponse);
paymentRoute.post("/failed", Authenticate, paymentFailed);
paymentRoute.post(
  "/payment-service",
  Authenticate,
  authorize(["admin"]),
  paymentServiceToggle
);
paymentRoute.get(
  "/payment-service-status",
  Authenticate,
  authorize(["admin"]),
  paymentServiceStatus
);
// paymentRoute.post("/webhook", paymentResponse);

export default paymentRoute;

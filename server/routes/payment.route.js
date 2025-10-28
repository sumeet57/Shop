import { Router } from "express";
import {
  checkout,
  verifyPayment,
  paymentServiceStatus,
  paymentServiceToggle,
} from "../controllers/payment.controller.js";

import { Authenticate } from "../middlewares/Authentication.js";
import { authorize } from "../middlewares/Authorization.js";

const paymentRoute = Router();

paymentRoute.post("/checkout", Authenticate, checkout);
paymentRoute.post("/verify", Authenticate, verifyPayment);
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

export default paymentRoute;

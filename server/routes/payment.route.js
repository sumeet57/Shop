import { Router } from "express";
import {
  paymentFailed,
  paymentResponse,
} from "../controllers/payment.controller.js";
import { checkout } from "../controllers/cart.controller.js";
import { Authenticate } from "../middlewares/Authentication.js";

const paymentRoute = Router();

paymentRoute.post("/checkout", Authenticate, checkout);
paymentRoute.post("/verify", Authenticate, paymentResponse);
paymentRoute.post("/failed", Authenticate, paymentFailed);
// paymentRoute.post("/webhook", paymentResponse);

export default paymentRoute;

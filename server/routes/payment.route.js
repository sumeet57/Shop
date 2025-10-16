import { Router } from "express";
import { paymentResponse } from "../controllers/payment.controller.js";
import { checkout } from "../controllers/cart.controller.js";
import { Authenticate } from "../middlewares/Authentication.js";

const paymentRoute = Router();

paymentRoute.post("/checkout", Authenticate, checkout);
paymentRoute.post("/webhook", paymentResponse);

export default paymentRoute;

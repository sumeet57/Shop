import { Router } from "express";
import { Authenticate } from "../middlewares/Authentication.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/", Authenticate, getCart);
cartRouter.post("/add/:productId", Authenticate, addToCart);

export default cartRouter;

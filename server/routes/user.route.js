import { Router } from "express";
import { Authenticate } from "../middlewares/Authentication.js";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../controllers/address.controller.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile", Authenticate, getUser);
userRouter.get("/addresses", Authenticate, getAddresses);
userRouter.post("/addresses", Authenticate, addAddress);
userRouter.put("/addresses/:id", Authenticate, updateAddress);
userRouter.delete("/addresses/:id", Authenticate, deleteAddress);

export default userRouter;

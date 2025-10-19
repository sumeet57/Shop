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
userRouter.post("/add-address", Authenticate, addAddress);
userRouter.get("/get-addresses", Authenticate, getAddresses);
userRouter.post("/update-address/:id", Authenticate, updateAddress);
userRouter.delete("/delete-address/:id", Authenticate, deleteAddress);

export default userRouter;

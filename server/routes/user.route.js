import { Router } from "express";
import { Authenticate } from "../middlewares/Authentication.js";

import { getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile", Authenticate, getUser);
userRouter.put("/profile", Authenticate, updateUser);

export default userRouter;

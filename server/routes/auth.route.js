import { Router } from "express";
import {
  getUser,
  login,
  logout,
  register,
  requestCode,
  updateUser,
} from "../controllers/user.controller.js";
import { Authenticate } from "../middlewares/Authentication.js";
import {
  validateLogin,
  validateRegister,
  validateUpdateProfile,
  validateVerificationCode,
} from "../middlewares/validation.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.post("/request-code", validateVerificationCode, requestCode);
authRouter.get("/me", Authenticate, getUser);
authRouter.put("/me", Authenticate, validateUpdateProfile, updateUser);
authRouter.post("/logout", Authenticate, logout);

export default authRouter;

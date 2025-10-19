import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRoute from "./routes/payment.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/payments", paymentRoute);
app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);

export default app;

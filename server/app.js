import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import { upload } from "./services/multer.service.js";
import productRouter from "./routes/product.route.js";

import path from "path";
import { fileURLToPath } from "url";
import cartRouter from "./routes/cart.route.js";
import paymentRoute from "./routes/payment.route.js";

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/payments", paymentRoute);
// app.use("/api/cart", cartRouter);

export default app;

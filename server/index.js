import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/connectDatabase.js";
import { Server } from "socket.io";
import http from "http";
const PORT = process.env.PORT || 5000;
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

let totalUsers = 0;

io.on("connection", (socket) => {
  totalUsers = totalUsers + 1;
  io.emit("totalUsers", totalUsers); // Send totalUsers to all clients on connect
  socket.on("disconnect", () => {
    totalUsers = totalUsers - 1;
    io.emit("totalUsers", totalUsers); // Send updated totalUsers to all clients on disconnect
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

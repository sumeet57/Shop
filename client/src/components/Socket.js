import { io } from "socket.io-client";

const url = import.meta.env.VITE_BACKEND_URL;

const socket = io(url, {
  autoConnect: false,
});

socket.on("connection", () => {
  console.log("Connected to socket server");
});

export default socket;

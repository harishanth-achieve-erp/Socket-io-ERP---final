import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import eventRoutes from "./route/events.js";
import { initSocket } from "./socket/socketHandler.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initSocket(io);

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/events", eventRoutes);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

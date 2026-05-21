import pool from "../config/db.js";

let io;

export function initSocket(socketIo) {
  io = socketIo;

  io.on("connection", async (socket) => {
    console.log("Client connected:", socket.id);

    try {
      const result = await pool.request().query(` SELECT title, description, type, source, created_at FROM ERPEvents ORDER BY created_at DESC`);
      socket.emit("all-events", result.recordset);
    } catch (error) {
      console.error("Failed to load events on connect:", error);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

export function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}

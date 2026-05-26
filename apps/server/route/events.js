import express from "express";
import pool from "../config/db.js";
import { getIO } from "../socket/socketHandler.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, type, source } = req.body;

    await pool
      .request()
      .input("title", title)
      .input("description", description)
      .input("type", type)
      .input("source", source).query(`
        INSERT INTO ERPEvents (title, description, type, source)
        VALUES (@title, @description, @type, @source)
      `);

    const result = await pool.request().query(`
      SELECT title, description, type, source, created_at
      FROM ERPEvents
    `);

    getIO().emit("all-events", result.recordset);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

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
        INSERT INTO ERPEvents
        (title, description, type, source)
        VALUES
        (@title, @description, @type, @source)
      `);

    //Emit realtime event
    getIO().emit("new-event", {
      title,
      description,
      type,
      source,
      created_at: new Date(),
    });

    res.json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/", async (reqest, response) => {
  try {
    const result = await pool.request().query(
      `SELECT title, description, type, source, created_at
      FROM ERPEvents
      ORDER BY created_at DESC`,
    );
    response.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error(error);
    reqest.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;

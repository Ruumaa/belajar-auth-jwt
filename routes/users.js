import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);
    res.status(200).json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *", //returning untuk mendapatkan record setelah data di insert
      [req.body.name, req.body.email, hashedPassword]
    );
    res.status(200).send("User created successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

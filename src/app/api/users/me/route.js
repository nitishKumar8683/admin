import { getDataUser } from "@/helpers/getUserData";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function GET(request) {
  try {
    // Get user ID from the request
    const userId = await getDataUser(request);

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required",
        },
        { status: 400 },
      );
    }

    // Create a connection to the MySQL database
    const connection = await pool.getConnection();

    try {
      // Query to fetch user data excluding the password
      const [rows] = await connection.query(
        "SELECT id, name, email, role, isDelete, phoneNumber, image_url, public_id FROM users WHERE id = ?",
        [userId],
      );

      // Check if user data is found
      if (rows.length === 0) {
        return NextResponse.json(
          {
            message: "User not found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json({
        message: "User found",
        dataUser: rows[0],
      });
    } finally {
      // Ensure the connection is always released back to the pool
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}

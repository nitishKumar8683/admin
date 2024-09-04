import { connect, pool } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Connect to the database
    await connect();

    // SQL query to fetch all feedbacks without pagination
    const feedbacks = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM feedbackData", (err, results) => {
        if (err) {
          console.error("Query error:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    console.log("Feedbacks fetched:", feedbacks);

    // Return the feedbacks
    return NextResponse.json(
      {
        success: true,
        data: feedbacks,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

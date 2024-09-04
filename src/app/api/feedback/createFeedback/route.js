import { connect, pool } from "@/db/dbConfig";
import { NextResponse } from "next/server";

await connect();

export async function POST(req) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const { name, email, childName, feedbackText, satisfaction } = body;

    // Debugging: Check if all fields are present and not null
    console.log("Request Body:", body);
    if (!name || !email || !childName || !feedbackText || !satisfaction) {
      throw new Error("Missing required fields in request body.");
    }

    // SQL query with placeholders for parameters
    const query = `
      INSERT INTO feedbackData (name, email, childName, feedbackText, satisfaction) 
      VALUES (?, ?, ?, ?, ?);
    `;

    // Execute the query with the provided values
    const [result] = await pool
      .promise()
      .query(query, [name, email, childName, feedbackText, satisfaction]);

    // Log the result for debugging
    console.log("Query Result:", result);

    // Return a success response
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error executing query:", error.message);

    // Return an error response
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}


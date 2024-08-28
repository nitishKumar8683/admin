import { connect } from "@/db/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextResponse } from "next/server";

// Connect to the database
connect();

// Replace the following with your MongoDB connection string
export async function GET() {
  try {
    const feedbacks = await Feedback.find({});
    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
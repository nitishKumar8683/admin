import { connect } from "@/db/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextResponse } from "next/server";

// Connect to the database
export async function GET(request) {
  try {
    await connect();

    // Get page and limit from query parameters, defaulting to 1 and 10
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 5);

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch feedbacks with pagination
    const feedbacks = await Feedback.find({}).skip(skip).limit(limit);

    // Count total documents in the collection
    const totalDocuments = await Feedback.countDocuments({});

    // Calculate total number of pages
    const totalPages = Math.ceil(totalDocuments / limit);

    // Return the feedbacks, current page, and total pages
    return NextResponse.json(
      {
        success: true,
        data: feedbacks,
        currentPage: page,
        totalPages,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

import { connect } from "@/db/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(NextRequest:any, {params}:any) {
  const id = params.id;
  console.log(id);
  try {
    const id = params.id

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 },
      );
    }

    // Perform the delete operation
    const result = await Feedback.findByIdAndDelete(id);

    // Check if the feedback was found and deleted
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Feedback deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}

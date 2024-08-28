import { connect } from "@/db/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextResponse } from "next/server";

connect();

export async function PUT(request , {params}) {
  const id = params.id
  console.log(id)
  try {

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Id not found",
        status: 400,
      });
    }

    const updateData = await request.json(); 

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: false,
        error: "No update data provided",
        status: 400,
      });
    }

    const result = await Feedback.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!result) {
      return NextResponse.json({
        success: false,
        error: "Feedback not found",
        status: 404,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Feedback updated successfully",
      data: result,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || "An error occurred",
      status: 500,
    });
  }
}

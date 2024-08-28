import {connect} from "@/db/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextResponse } from "next/server";

connect();

// Handler for POST request
export async function POST(req) {
  try {
    const body = await req.json();
//    const { childName } = body;
    const feedback = await Feedback.create(body);
    // console.log(childName);
    return NextResponse.json(
      { success: true, data: feedback },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

import Review from "@/models/reviewModel";
import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET(req, res) {
    try {
        const reviewData = await Review.find({ isDelete: { $ne: "1" } })
        return NextResponse.json({
            message: "Data Retrieve Successfully",
            success: true,
            reviewData,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

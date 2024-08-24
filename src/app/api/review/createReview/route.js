import Review from "@/models/reviewModel";
import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()

        const { name, email, product, rating, comments, recommend } = reqBody

        const extingUser = await Review.findOne({ email })
        if (extingUser) {
            return NextResponse.json({
                message: "Email already exists",
                status: 400,
                success: false,
            });
        }

        const newReview = new Review({
            name, email, product, rating, comments, recommend, isDelete: ""
        })

        const savedReview = await newReview.save()
        console.log(savedReview)
        return NextResponse.json({
            message: "Review form save successfully",
            savedReview,
            success: true,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error creating user",
                error: error.message,
            },
            { status: 500 },
        );
    }
}
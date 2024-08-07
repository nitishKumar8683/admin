import Child from "@/models/childModel";
import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()

        const { childName, guardianName, phoneNumber, address, timeIn, dob, timeOut } = reqBody

        const extingUser = await Child.findOne({ phoneNumber })
        if (extingUser) {
            return NextResponse.json({
                message: "Phone Number already exists",
                status: 400,
                success: false,
            });
        }

        const newChild = new Child({
            childName,
            guardianName,
            phoneNumber,
            address,
            timeIn,
            dob,
            timeOut,
            isDelete: ""
        })

        const savedChild = await newChild.save()
        console.log(savedChild)
        return NextResponse.json({
            message: "Child Detail created successfully",
            savedChild,
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
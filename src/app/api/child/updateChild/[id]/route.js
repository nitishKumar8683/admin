import { NextResponse } from "next/server";
import Child from "@/models/childModel";
import { connect } from "@/db/dbConfig";

connect()

export async function PUT(req, { params }) {
    const id = params.id
    console.log(id)
    const reqBody = await req.json()
    const { childName, guardianName, phoneNumber, address, timeIn, dob, timeOut } = reqBody
    try {
        const updateData = await Child.findByIdAndUpdate(id, {
            childName, guardianName, phoneNumber, address, timeIn, dob, timeOut
        })

        if (!updateData) {
            return NextResponse.json({ message: "User not found..." })
        }
        const dataResponse = NextResponse.json({
            message: "Updated Successfull",
            updateData,
        });
        return dataResponse;
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
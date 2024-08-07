import { NextRequest, NextResponse } from "next/server";
import Child from "@/models/childModel";
import { connect } from "@/db/dbConfig";

connect()

export async function GET(req, { params }) {
    const id = params.id
    try {
        const userDataById = await Child.findById({ _id: id })
        if (!userDataById) {
            return NextResponse.json({ message: "User not found" });
        }
        const dataResponse = NextResponse.json({
            message: "Data Successfull get",
            userDataById,
        });

        return dataResponse;
    } catch (error) {
        console.error("Error Fetch bY Id User:", err);
        return NextResponse.json(
            { message: "Failed to Fetch User" },
            { status: 500 },
        );
    }
}
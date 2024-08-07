import { connect } from "@/db/dbConfig";
import Child from "@/models/childModel";
import { NextResponse } from "next/server";

connect();

export async function GET(req, res) {
    try {
        const childsData = await Child.find({ isDelete: { $ne: "1" }})
        return NextResponse.json({
            message: "User Retrieve Successfully",
            success: true,
            childsData,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

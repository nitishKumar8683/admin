import { connect } from "@/db/dbConfig";
import Child from "@/models/childModel";
import { NextResponse } from "next/server";

connect();

export async function DELETE(req , {params}) {
    const id = params.id
    console.log(id)

    try {
        const user = await Child.findById(id);

        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }

        if (user.isDelete === "") {
            user.isDelete = "1";
            await user.save();
            return NextResponse.json({
                message: "User isDelete successfully",
            });
        } else {
            return NextResponse.json({
                message: "User is already deleted",
            });
        }
    } catch (err) {
        console.error("Failed to update isDelete field:", err);
        return NextResponse.json(
            { message: "Failed to update isDelete field" },
            { status: 500 },
        );
    }
}
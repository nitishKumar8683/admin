import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
    childName: {
        type: String,
    },
    guardianName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: Date
    },
    timeIn: {
        type: String
    },
    timeOut: {
        type: String
    },
    isDelete: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Child = mongoose.models.childs || mongoose.model("childs", childSchema)

export default Child
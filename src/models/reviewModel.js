import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    product: {
        type: String
    },
    rating: {
        type: String
    },
    comments: {
        type: String
    },
    recommend: {
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

const Review = mongoose.models.reviews || mongoose.model("reviews", reviewSchema)

export default Review
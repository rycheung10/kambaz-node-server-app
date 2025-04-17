import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        author: String,
        role: String,
        createdAt: String,
        type: String,
        folders: [String],
        course: String,
    },
    { collection: "pazza" } // 👈 this tells Mongoose to use the "pazza" collection
);

export default postSchema;

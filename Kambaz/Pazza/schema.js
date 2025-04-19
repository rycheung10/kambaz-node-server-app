import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    body: String,
    author: String,
    role: String,
    createdAt: String,
});

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
        studentAnswers: answerSchema,
        instructorAnswers: answerSchema,
    },
    { collection: "pazza" } // 👈 this tells Mongoose to use the "pazza" collection
);

export default postSchema;

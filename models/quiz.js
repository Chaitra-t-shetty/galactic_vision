const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;

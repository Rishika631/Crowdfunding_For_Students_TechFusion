const mongoose = require("mongoose")
const { Schema } = mongoose

const StudentSchema = new Schema({
    studentName: {
        type: String,
        ref: "User",
        required: true
    },
    fatherName: {
        type: String,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        ref: "User",
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    tenmarks: {
        type: Number,
        required: true
    },
    twelvemarks: {
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    income: {
        type: Number,
        min:0,
        required: true
    },
    rating: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('student', StudentSchema)
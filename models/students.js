import mongoose from "mongoose";
const studentsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    group:{
        type: String,
        required: true,
        trim: true
    },
    extrapoints:{
        type: String,
        required: true,
        trim: true
    },
},
{
    timestamps: true,
});

export const Students = mongoose.model("Students", studentsSchema);
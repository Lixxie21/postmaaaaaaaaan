import mongoose from "mongoose";
const cardSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    link:{
        type: String,
        required: true,
        trim: true
    },
    decription:{
        type: String,
        trim: true
    },
},
{
    timestamps: true,
});

export const Card = mongoose.model("Card", cardSchema);
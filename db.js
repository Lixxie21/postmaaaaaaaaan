import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://5ATICS:4I9ycvvY6fmDWWGk@lachonalola.5atrt9o.mongodb.net/";

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected succesfully");
    }catch(error){
        console.error("MOngoDB connection failed :c");
    }
};
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;
console.log("MONGO_URI:", process.env.MONGO_URL);
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log("MONGO ATLAS CONNECTED");
  } catch (err) {
    console.log("MONGO DB Connection Error : ", err);
    process.exit(1);
  }
};

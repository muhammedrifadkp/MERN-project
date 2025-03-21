import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://muhammedrifadkp3:merntest@tseepacademy.rxgap.mongodb.net/tseepacademy?retryWrites=true&w=majority");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
import mongoose from "mongoose";
import { DB_CONFIG } from "../config/config.js";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB_CONFIG.MONGODB_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;

import mongoose from "mongoose";
import { logger } from "../logs/logger.js";
import { DB_CONFIG } from "../config/config.js";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB_CONFIG.MONGODB_URI);
    logger.info("MongoDB conectado");
    logger.info(`Host: ${mongoose.connection.host}`);
    logger.info(`DB: ${mongoose.connection.name}`);
  } catch (error) {
    logger.grave(`Error conectando a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;

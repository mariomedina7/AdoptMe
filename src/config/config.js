import { configDotenv } from "dotenv";

configDotenv();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
};

export const DB_CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
};

export const CONFIG = {
  server: SERVER_CONFIG,
  database: DB_CONFIG,
};

export default CONFIG;

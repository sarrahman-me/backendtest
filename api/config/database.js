import dotenv from "dotenv";

dotenv.config();

export default {
  HOST: process.env.DB_HOST || "localhost",
  USER: "postgres",
  PASSWORD: process.env.DB_PASSWORD || "secret",
  DB: "users",
  dialect: "postgres",
};

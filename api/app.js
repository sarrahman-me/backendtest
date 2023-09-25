import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./config/logger.js";
import db from "./database/index.js";
import routers from "./routers/index.js";

const app = express();

try {
  const operation = retry.operation({
    retries: 2,
    factor: 1,
    minTimeout: 3 * 60 * 1000,
    maxTimeout: 3 * 60 * 1000,
  });

  operation.attempt(async () => {
    try {
      await db.sequelize.sync();
      logger.info("Database tables synchronized.");
      await db.sequelize.authenticate();
      logger.info("Connected to user-management-service postgresql database");
    } catch (error) {
      logger.error("Failed to connect to database:", error.message);
      if (operation.retry(error)) {
        return;
      }
      logger.error("No more retries, giving up.");
      // Handle error atau throw error jika tidak dapat tersambung ke database
    }
  });
} catch (error) {
  logger.error(error.message);
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(routers);

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`unhandled rejection at : ${reason.stack || reason}`);
});

export default app;

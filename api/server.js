import app from "./app.js";
import logger from "./config/logger.js";

const port = 5000;

app.listen(port, () => {
  logger.info(`authentication api is running on port ${port}`);
});

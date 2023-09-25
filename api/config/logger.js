import winston from "winston";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.json(),
    winston.format.printf((info) => {
      return JSON.stringify({
        level: info.level,
        message: info.message,
        ms: info.ms,
        timestamp: info.timestamp,
      });
    })
  ),
  transports: [new winston.transports.Console({})],
});

export default logger;

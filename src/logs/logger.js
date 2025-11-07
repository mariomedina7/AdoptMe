import winston from "winston";
import path from "path";

const customLevels = {
  levels: {
    grave: 0,
    warn: 1,
    info: 2,
    leve: 3,
  },
  colors: {
    grave: "red",
    warn: "yellow",
    info: "blue",
    leve: "green",
  },
};

winston.addColors(customLevels.colors);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const transportConsole = new winston.transports.Console({
  level: process.env.NODE_ENV === "production" ? "info" : "leve",
  format: consoleFormat,
  handleExceptions: true,
  handleRejections: true,
});

const transportFile = new winston.transports.File({
  filename: path.join("logs", "app.log"),
  level: "info",
  format: fileFormat,
});

export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [transportConsole, transportFile],
  exitOnError: false,
});

export const middLogg = (req, res, next) => {
  req.logger = logger;
  next();
};

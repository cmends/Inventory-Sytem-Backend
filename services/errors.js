import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  //   format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

export const responseHandler = (res, status, message, data) => {
  logger.error(data);
  return res.status(status).send({
    message,
    data: {},
  });
};

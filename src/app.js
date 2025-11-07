import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDB from './db/connectionDb.js';
import indexRouter from './routes/index.js';
import setupSwagger from './config/swagger.js';
import { logger, middLogg } from './logs/logger.js';
import { SERVER_CONFIG } from './config/config.js';

const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(middLogg);

setupSwagger(app);
app.use('/api', indexRouter);
app.get("/health", (_req, res) => {
  logger.info("Healthcheck OK");
  res.send("OK");
});

app.listen(SERVER_CONFIG.PORT, () => logger.info(`Listening on ${SERVER_CONFIG.PORT}`))

export default app;
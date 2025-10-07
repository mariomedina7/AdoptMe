import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDB from './db/connectionDb.js';
import indexRouter from './routes/index.js';
import { SERVER_CONFIG } from './config/config.js';

const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);

app.listen(SERVER_CONFIG.PORT, () => console.log(`Listening on ${SERVER_CONFIG.PORT}`))

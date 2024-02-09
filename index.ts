import express from 'express';
import dotenv from 'dotenv';
import logger from './config/logger';
import connectDB from './config/database/db'
import cors from 'cors'
import { userRouter } from './src/routes/userRoute'
import mongoose from 'mongoose';
dotenv.config()
const app: express.Application = express();
app.use(cors())
app.use(express.json());
app.use('/v1/user/', userRouter)
const db = mongoose.connection;
connectDB()


app.get('/', (req: express.Request, res: express.Response) => {
    logger.info('GET request received');
    res.send('version: 1.0.0');
});

db.once('open', () => {
    logger.info('DB:connected:invoke');
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });
});


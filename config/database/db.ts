import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger';
dotenv.config()

const mongoURI: string = process.env.MONGODB_URI || "";

const connectDB = async () => {
    logger.info('Database:connectDB:invoke');
    mongoose.connect(mongoURI)
        .then(() => logger.info('Database:connectDB:connected'))
        .catch(err => console.error(err));
}

export default connectDB
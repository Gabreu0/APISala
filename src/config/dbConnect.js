import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase() {
    mongoose.connect(process.env.MONGODB_URI);
    return mongoose.connection;
}

export default connectToDatabase;

import mysql from 'mysql2/promise';
import { dbConfig } from './config.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mysql.createConnection(dbConfig);
        console.log(`Database connected! DB host: ${connectionInstance}`);
    } catch (error) {
        console.log(`Database connect error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
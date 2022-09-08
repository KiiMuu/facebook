import mongoose, { Mongoose } from 'mongoose';
require('dotenv').config();

class Database {
	constructor() {
		this.connect();
	}

	async connect(): Promise<void> {
		try {
			const conn: Mongoose = await mongoose.connect(
				`${process.env.DB_URL}`
			);

			console.log(`MongoDB connected: ${conn.connection.host}`);
		} catch (error: any) {
			console.log(`ERROR: ${error.message}`);
			process.exit(1);
		}
	}
}

const connectToDB = new Database();

export default connectToDB;

import mongoose, { createConnection } from "mongoose";

const db_app = createConnection(process.env.MONGODB_URL!);
const db_discord = createConnection(process.env.TEST!);

export { db_app, db_discord}
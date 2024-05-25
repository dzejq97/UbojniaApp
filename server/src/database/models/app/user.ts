import { Schema, model, Model } from "mongoose";
import { db_app } from "../../mongo";

export type TUser = {
    username: String,
    email: String,
    password: String,
    createdAt: Date
}
export type UserType = Model<TUser>;
const schema = new Schema<TUser, UserType>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: () => Date.now() }
});
const Users: UserType = db_app.model<TUser, UserType>('User', schema);
export default Users;
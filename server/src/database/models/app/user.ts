import { Schema, model, Model, Types, FilterQuery ,HydratedDocument } from "mongoose";
import { db_app } from "../../mongo";

export type TUser = {
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    posts: Types.ObjectId[],
    comments: Types.ObjectId[],
    commentsReplies: Types.ObjectId[]
}
export type UserType = Model<TUser>;
const User: UserType = db_app.model<TUser, UserType>('User', new Schema<TUser, UserType>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: () => Date.now() },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'PostComment'}],
    commentsReplies: [{ type: Schema.Types.ObjectId, ref: 'PostCommentReply'}]
}));
export default User;
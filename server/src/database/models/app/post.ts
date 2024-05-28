import { Schema, model, Model, Types } from "mongoose";
import { db_app } from "../../mongo";

export type TPost = {
    author: Types.ObjectId,
    content: String,
    comments: Types.ObjectId[],
    createdAt: Date,
    likes: Types.ObjectId[]
}
export type PostType = Model<TPost>;
const Post: PostType = db_app.model<TPost, PostType>('Post', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId , ref: 'PostComment' }],
    createdAt: { type: Date, default: () => Date.now() },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like'}]
}));
export default Post;
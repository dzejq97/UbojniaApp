import { Schema, model, Model, Types, FilterQuery, HydratedDocument } from "mongoose";
import { db_app } from "../../mongo";

export type TPost = {
    author: Types.ObjectId,
    content: String,
    comments: Types.ObjectId[]
    createdAt: Date,
    likes: Types.ObjectId[],
    topic: String,
}

type PostType = Model<TPost>;
export const PostModel: PostType = db_app.model<TPost, PostType>('Post', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    topic: { type: String, default: ''},
    comments: [{ type: Schema.Types.ObjectId, ref: 'PostComment'}]
}));

export default PostModel;
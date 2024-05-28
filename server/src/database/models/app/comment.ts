import { Schema, model, Model, Types } from "mongoose";
import { db_app } from "../../mongo";

export type TPostComment = {
    author: Types.ObjectId,
    post: Types.ObjectId,
    content: String,
    createdAt: Date
};
export type PostCommentType = Model<TPostComment>;
const PostComment: PostCommentType = db_app.model<TPostComment, PostCommentType>('PostComment', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => Date.now()}
}));
export default PostComment;
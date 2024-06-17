import { Model, Schema, Types } from "mongoose"
import { db_app } from "../../mongo";
import { TUser } from "./User";

export type TPostComment = {
    author: Types.ObjectId,
    post: Types.ObjectId,
    createdAt: Date,
    content: String,
    replies: Types.ObjectId[],
    likes: Types.ObjectId[],
}

export type PostCommentType = Model<TPostComment>;
const PostComment = db_app.model<TPostComment, PostCommentType>('PostComment', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    post: { type: Schema.Types.ObjectId, ref: 'Post'},
    createdAt: { type: Date, default: () => Date.now()},
    content: { type: String},
    replies: [{ type: Schema.Types.ObjectId, ref: 'PostCommentReply'}],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like'}]
}));
export default PostComment;


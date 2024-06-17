import { Model, Schema, Types } from "mongoose"
import { db_app } from "../../mongo";

export type TPostCommentReply = {
    author: Types.ObjectId,
    comment: Types.ObjectId,
    createdAt: Date,
    content: String,
    likes: Types.ObjectId[]
}

export type PostCommentReplyType = Model<TPostCommentReply>;
const PostCommentReply = db_app.model<TPostCommentReply, PostCommentReplyType>('PostCommentReply', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: Schema.Types.ObjectId, ref: 'PostComment'},
    createdAt: { type: Date, default: () => Date.now() },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like'}]
}))
export default PostCommentReply;
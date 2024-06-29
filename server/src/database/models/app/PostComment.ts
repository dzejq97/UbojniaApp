import { HydratedDocument, Model, Schema, Types } from "mongoose"
import { db_app } from "../../mongo";

export type TPostComment = {
    author: Types.ObjectId,
    post: Types.ObjectId,
    createdAt: Date,
    content: String,
    replies: Types.ObjectId[],
    likes: Types.ObjectId[],
}

type PostCommentType = Model<TPostComment>;
const PostCommentModel = db_app.model<TPostComment, PostCommentType>('PostComment', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    post: { type: Schema.Types.ObjectId, ref: 'Post'},
    createdAt: { type: Date, default: () => Date.now()},
    content: { type: String},
    replies: [{ type: Schema.Types.ObjectId, ref: 'PostCommentReply'}],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like'}]
}));
export default PostCommentModel;


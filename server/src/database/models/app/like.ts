import { Schema, Model, Types } from "mongoose";
import { db_app } from "../../mongo";

export type TLike = {
    author: Types.ObjectId,
    post: Types.ObjectId,
    comment: Types.ObjectId,
    user: Types.ObjectId,
    createdAt: Date
}
export type LikeType = Model<TLike>;
const Like: LikeType = db_app.model<TLike, LikeType>('Like', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post'},
    comment: { type: Schema.Types.ObjectId, ref: 'PostComment'},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: () => Date.now() },
}));
export default Like;
import { Model, Schema, Types } from "mongoose"
import { db_app } from "../../mongo";

export type TLike = {
    author: Types.ObjectId,
    createdAt: Date,
    target: Types.ObjectId,
}
export type LikeType = Model<TLike>;
const Like: LikeType = db_app.model<TLike, LikeType>('Like', new Schema({
    author: { type: Schema.Types.ObjectId, ref:'User', required: true },
    createdAt: { type: Date, default: Date.now() },
    target: { type: Schema.Types.ObjectId }
}));
export default Like;
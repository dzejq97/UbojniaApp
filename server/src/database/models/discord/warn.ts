import { Model, Schema, Types } from "mongoose"
import { db_discord } from "../../mongo";

export type TWarn = {
    member: Types.ObjectId,
    moderator: Types.ObjectId,
    reason: string,
    timestamp: Date,
}
export type WarnType = Model<TWarn>;
const schema = new Schema<TWarn, WarnType>({
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    moderator: { type: Schema.Types.ObjectId, ref: 'Member' },
    reason: { type: String, default: 'brak' },
    timestamp: { type: Date, default: () => Date.now() }
})
const Warns: WarnType = db_discord.model<TWarn, WarnType>('Warn', schema );
export default Warns;
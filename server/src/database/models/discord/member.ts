import { Schema, model, Model, HydratedDocument, Types } from "mongoose";
import { db_discord } from "../../mongo";
import { Guild, GuildMember } from "discord.js";
import { client } from "../../../services/bot/client";
import { rolesToIDArray } from "../../../services/bot/utils/roles";
import { TWarn } from "./warn";

export type TMember = {
    discordID: string,
    tag: string,
    joinedAt: Date,
    roles: string[],
    isBot: boolean,
    warns: Types.ObjectId[]
};
export type MemberType = Model<TMember>;
const schema = new Schema<TMember, MemberType>({
    discordID: { type: String, required: true, unique: true },
    tag: { type: String, required: true, unique: true },
    joinedAt: { type: Date, default: () => Date.now() },
    roles: [{ type: String }],
    isBot: { type: Boolean },
    warns: [{ type: Schema.Types.ObjectId, ref: 'Warn'}]
})

const Members: MemberType = db_discord.model<TMember, MemberType>('Member', schema);
export default Members;

export const memberExists = async (member: GuildMember): Promise<boolean> => {
  try {
      if (await Members.exists({ discordID: member.user.id})) return true;
      else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const createMember = async (member: GuildMember): Promise<HydratedDocument<TMember> | null> => {
    try {
        const member_doc = await Members.create({
            discordID: member.user.id,
            tag: member.user.tag,
            roles: rolesToIDArray(member.roles),
            isBot: member.user.bot
        });
        
        return member_doc;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getMember = async (member: GuildMember): Promise<HydratedDocument<TMember> | null> => {
    try {
        const member_doc = await Members.findOne({ discordID: member.user.id });
        return member_doc;
    } catch (error) {
        console.log(error);
        return null;
    }
}
import { HydratedDocument, Types } from "mongoose";
import { IAuthor, ResponseReadyPostCommentReply } from "../interfaces";
import PostCommentReplyModel, { TPostCommentReply } from "../../../database/models/app/PostCommentReply";
import UserModel from "../../../database/models/app/User";

export default class Reply {
    _id: string | Types.ObjectId;
    comment_id: string | Types.ObjectId;
    author: IAuthor | Types.ObjectId | null = null;
    createdAt: Date | null = null;
    content: string | null = null;
    likes_count: number | null = null;

    private static _reply = PostCommentReplyModel;
    private static _user = UserModel;

    constructor (doc: HydratedDocument<TPostCommentReply>) {
        this._id = doc._id.toString();
        this.comment_id = doc.comment.toString();
        this.author = doc.author;
        this.createdAt = doc.createdAt;
        this.content = doc.content.toString();
        this.likes_count = doc.likes.length;
    }

    get responseReady() {
        return <ResponseReadyPostCommentReply>{
            _id: this._id,
            author: this.author,
            createdAt: this.createdAt,
            content: this.content,
            likes_count: this.likes_count
        }
    }

    async fetchAuthor() {
        try {
            const author_doc = await Reply._user.findById(this.author).orFail();
            this.author = <IAuthor>{
                _id: author_doc._id.toString(),
                username: author_doc.username.toString()
            };
        } catch(e) {
            console.log(e);
        }
    }

    static async getByID(_id: string | Types.ObjectId): Promise<Reply | undefined> {
        try {
            const reply_doc = await Reply._reply.findById(_id).orFail();
            const reply = new this(reply_doc);
            await reply.fetchAuthor();
            return reply;
        } catch(e) {
            console.log(e);
        }
    }

    static async getByCommentID(comment_id: string | Types.ObjectId): Promise<Reply[] | undefined> {
        try {
            const replies_doc = await Reply._reply.find({comment: comment_id}).orFail();
            const replies: Reply[] = [];
            replies_doc.forEach(async (reply_doc) => {
                const reply = new this(reply_doc);
                await reply.fetchAuthor();
                replies.push(reply);
            });
            return replies;
        } catch(e) {
            console.log(e);
        }
    }

}
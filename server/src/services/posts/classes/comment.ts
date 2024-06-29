import { HydratedDocument, Types } from "mongoose";
import { IAuthor, ResponseReadyPostComment, ResponseReadyPostCommentReply } from "../interfaces";
import PostCommentModel, { TPostComment } from "../../../database/models/app/PostComment";
import PostCommentReplyModel from "../../../database/models/app/PostCommentReply";
import UserModel from "../../../database/models/app/User";
import Reply from "./reply";

export default class Comment {
    _id: string | Types.ObjectId;
    post_id: string | Types.ObjectId;
    author: IAuthor | null | Types.ObjectId = null;
    createdAt: Date | null = null;
    content: string | null = null;
    replies_count: number | null = null;
    replies: Reply[] = [];
    likes_count: number | null = null;

    private static _comment = PostCommentModel;
    private static _reply = PostCommentReplyModel;
    private static _user = UserModel;

    constructor (doc: HydratedDocument<TPostComment>) {
        this._id = doc._id.toString();
        this.post_id = doc.post;
        this.author = doc.author;
        this.createdAt = doc.createdAt;
        this.content = doc.content.toString();
        this.replies_count = doc.replies.length;
        this.likes_count = doc.likes.length;
    }

    public get responseReady() {
        const replies: ResponseReadyPostCommentReply[] = [];
        this.replies.forEach(reply => replies.push(reply.responseReady));

        return <ResponseReadyPostComment>{
            _id: this._id,
            author: this.author,
            createdAt: this.createdAt,
            content: this.content,
            replies_count: this.replies_count,
            replies: replies,
            likes_count: this.likes_count,
        }
    }

    async fetchAuthor() {
        try {
            const author_doc = await Comment._user.findById(this.author).select({_id: 1, username: 1}).orFail();
            this.author = <IAuthor>{
                _id: author_doc._id.toString(),
                username: author_doc.username.toString()
            }
        } catch(e) {
            console.log(e);
        }
    }

    async fetchReplies() {
        try {
            const replies = await Reply.getByCommentID(this._id);
            if (!replies) throw new Error();

            this.replies = replies;
        } catch(e) {
            console.log(e);
        }
    }

    static async getByID(_id: string | Types.ObjectId): Promise<Comment | undefined> {
        try {
            const comment_doc = await this._comment.findById(_id).orFail();
            const comment = new this(comment_doc);
            await comment.fetchAuthor();
            return comment;
        } catch(e) {
            console.log(e);
        }
    }

    static async getByPostID(post_id: string | Types.ObjectId): Promise<Comment[] | undefined> {
        try {
            const comments_doc = await this._comment.find({post: post_id}).orFail();
            const comments: Comment[] = [];
            comments_doc.forEach(async (comment_doc) => {
                const comment = new this(comment_doc);
                await comment.fetchAuthor();
                await comment.fetchReplies();
                comments.push(comment);
            });
            return comments;
        } catch (e) {
            console.log(e);
        }
    }
}
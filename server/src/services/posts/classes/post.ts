import { HydratedDocument, Types } from "mongoose";
import { IAuthor, IPostCreateData, ResponseReadyLike, ResponseReadyPost, ResponseReadyPostComment, ResponseReadyPostCommentReply } from "../interfaces";
import PostModel, { TPost } from "../../../database/models/app/Post";
import UserModel, { TUser } from "../../../database/models/app/User";
import PostCommentModel from "../../../database/models/app/PostComment";
import PostCommentReplyModel from "../../../database/models/app/PostCommentReply";

export default class Post {
    _id: string | Types.ObjectId;
    author: IAuthor | null | Types.ObjectId = null;
    createdAt: Date | null = null;
    content: string | null = null;
    comments: ResponseReadyPostComment[] | null = null;
    top_comments: ResponseReadyPostComment[] | null = null;
    comments_count: number | null = null;
    likes: ResponseReadyLike[] | null = null;
    likes_count: number | null = null;
    topic: string | null = null;

    private static _post = PostModel;
    private static _user = UserModel;

    constructor (doc: HydratedDocument<TPost>) {
        this._id = doc._id.toString();
        this.author = doc.author;
        this.createdAt = doc.createdAt;
        this.content = doc.content.toString();
        this.comments_count = doc.comments.length;
        this.likes_count = doc.likes.length;
    }

    public get responseReady(): ResponseReadyPost {
        return <ResponseReadyPost>{
            _id: this._id,
            author: this.author,
            createdAt: this.createdAt,
            content: this.content,
            comments: this.comments,
            top_comments: this.top_comments,
            comments_count: this.comments_count,
            likes: this.likes,
            likes_count: this.likes_count,
            topic: this.topic
        }
    }

    async fetchAuthor() {
        try {
            let author: HydratedDocument<TUser>;
            if (this.author instanceof Types.ObjectId) {
                author = await Post._user.findById(this.author).select({ _id: 1, username: 1 }).orFail();
            } else if (!this.author) {
                const author_id = await Post._post.findById(this._id).select({ author: 1}).orFail();
                author = await Post._user.findById(author_id).select({ _id: 1, username: 1}).orFail(); 
            } else return;

            this.author = <IAuthor>{
                _id: author._id.toString(),
                username: author.username
            }

        } catch(e) {
            console.log(e);
        }
    }

    static async getByID(_id: string | Types.ObjectId): Promise<Post | undefined> {
        try {
            const post_doc = await this._post.findById(_id).orFail();
            const post = new this(post_doc);
            await post.fetchAuthor();
            return post;
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }

    static async create(data: IPostCreateData): Promise<Post | undefined> {
        try {
            const post_doc = await Post._post.create({
                author: data.author_id,
                content: data.content,
                topic: data.topic ? data.topic : '',
            });

            const post = new this(post_doc);
            await post.fetchAuthor();
            return post;
        } catch(e) {
            console.log(e);
        }
    }
}
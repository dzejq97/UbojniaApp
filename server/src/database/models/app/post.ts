import { Schema, model, Model, Types, FilterQuery, HydratedDocument } from "mongoose";
import { db_app } from "../../mongo";
import PostComment from "./PostComment";
import PostCommentReply from "./PostCommentReply";
import User, { TUser } from "./User";

export type TPost = {
    author: Types.ObjectId,
    content: String,
    comments: Types.ObjectId[]
    createdAt: Date,
    likes: Types.ObjectId[],
    topic: String,
}

export type PostType = Model<TPost>;
const Post: PostType = db_app.model<TPost, PostType>('Post', new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    topic: { type: String, default: ''},
    comments: [{ type: Schema.Types.ObjectId, ref: 'PostComments'}]
}));
export default Post;

interface FullPost {
    _id: Types.ObjectId,
    author: {
        _id: Types.ObjectId,
        username: String
    },
    content: String,
    createdAt: Date,
    likes: Number,
    topic: String,
    comments?: PartComments[]
}

interface PartComments {
    _id: Types.ObjectId,
    author: {
        _id: Types.ObjectId,
        username: String,
    },
    createdAt: Date,
    content: String,
    likes: Number,
    replies?: PartCommentsReplies[], 
}
interface PartCommentsReplies {
    _id: Types.ObjectId,
    author: {
        _id: Types.ObjectId,
        username: String,
    },
    createdAt: Date,
    content: String,
    likes: Number
}

export async function getFullPost(id: string | Types.ObjectId): Promise<FullPost | undefined> {
    const post_doc = await Post.findOne();
    const post_author = await User.findOne({_id: post_doc?.author}).select({_id: 1, username: 1});
    
    let post_data: FullPost = {
        _id: post_doc?._id!,
        author: {
            _id: post_author?._id!,
            username: post_author?.username!
        },
        content: post_doc?.content!,
        createdAt: post_doc?.createdAt!,
        likes: post_doc?.likes.length!,
        topic: post_doc?.topic!,
        comments: []
    }

    const comments = await PostComment.find({ post: post_doc?._id });
    for (const comment of comments) {
        const comment_author = await User.findOne({_id: comment.author}).select({_id: 1, username: 1});
        let comment_data: PartComments = {
            _id: comment._id!,
            author: {
                _id: comment_author?._id!,
                username: comment_author?.username!
            },
            createdAt: comment.createdAt!,
            content: comment.content!,
            likes: comment.likes.length!,
            replies: []
        }
        
        const replies = await PostCommentReply.find({ comment: comment._id });
        for (const reply of replies) {
            const reply_author = await User.findOne({_id: reply.author}).select({ _id: 1, username:1});
            let reply_data: PartCommentsReplies = {
                _id: reply._id!,
                author: {
                    _id: reply_author?._id!,
                    username: reply_author?.username!
                },
                createdAt: reply.createdAt!,
                content: reply.content!,
                likes: reply.likes.length!
            }

            comment_data.replies?.push(reply_data);
        }
        post_data.comments?.push(comment_data);
    }

    return post_data;
}


interface ICommentData {
    author_id: Types.ObjectId | string,
    content: string,
}
export async function createComment(post_id: string | Types.ObjectId, data: ICommentData) {
    const comment = await PostComment.create({
        author: data.author_id,
        content: data.content,
        post: post_id,
    });
    await Post.findOneAndUpdate({_id: post_id}, {$push: { comments: comment._id }});
    await User.findOneAndUpdate({ _id: data.author_id}, { $push: { comments: comment._id}});
}

export async function createReply(comment_id: string | Types.ObjectId, data: ICommentData) {
    const reply = await PostCommentReply.create({
        author: data.author_id,
        content: data.content,
        comment: comment_id,
    });
    await PostComment.findOneAndUpdate({ _id: comment_id}, { $push: { replies: reply._id}});
    await User.findOneAndUpdate({ _id: data.author_id}, { $push: { commentsReplies: reply._id }});
}
import { Types } from "mongoose"

export interface IAuthor {
    _id?: string,
    username?: string
}

export interface ResponseReadyPost {
    _id: string,
    author?: IAuthor,
    createdAt?: Date,
    content?: string,
    comments?: ResponseReadyPostComment[],
    top_comments?: ResponseReadyPostComment[],
    comments_count?: number,
    likes?: ResponseReadyLike[],
    likes_count?: number,
    topic?: string
}

export interface ResponseReadyPostComment {
    _id: string,
    author: IAuthor,
    createdAt: Date,
    content: string,
    replies?: ResponseReadyPostCommentReply[],
    replies_count?: number,
    likes?: ResponseReadyLike[],
    likes_count?: number,
}

export interface ResponseReadyPostCommentReply {
    _id: string,
    author: IAuthor,
    createdAt: Date,
    content: string,
    likes_count?: number
}

export interface ResponseReadyLike {
    author: IAuthor,
    createdAt: Date
}

export interface IPostCreateData {
    author_id: string,
    content: string,
    topic?: string
}
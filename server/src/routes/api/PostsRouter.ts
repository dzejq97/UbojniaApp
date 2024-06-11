import express from "express";
import Post from "../../database/models/app/post";
import PostComment, { TPostComment } from "../../database/models/app/comment";
import Like from "../../database/models/app/like";
import User, { TUser } from "../../database/models/app/user";
const router = express.Router();

router.post('/create', async (req, res) => {
    if (!req.session.user) return res.status(401).send('Internal error');
    const content = req.body.content as string | null | undefined;
    if (!content || !content.length) return res.status(400).send('Content not provided');

    const post = await Post.create({
        content: content,
        author: req.session.user._id,
    });
    await User.findOneAndUpdate({ _id: req.session.user._id}, { $push: { posts: post._id }})
    
    res.send(post);
});

router.get('/latest', async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(30).populate<{ author: TUser, comments: TPostComment}>(['author', 'comments']);

    if (!posts) return res.status(500).send('Internal error');

    res.status(200).send(posts);
})

router.get('/:postID', async (req, res) => {
    const postID = req.params.postID;

    const post = await Post.findById(postID);
    if (!post) {
        return res.status(404).send('Post not found');
    } else {
        return res.send(post);
    }
})

router.post('/:postID/comment', async (req, res) => {
    const postID = req.params.postID;
    const content = req.body.content as string | null | undefined;
    if (!content || !content.length) return res.status(400).send('Content not provided');

    const post = await Post.findById(postID);
    
    if (!post) {
        return res.status(500).send('Internal error');
    }

    const comment = await PostComment.create({
        author: req.session.user?._id,
        post: post._id,
        content: content
    });

    post.comments.push(comment._id);
    await post.save();
    res.status(200).send('Success');
});

router.post('/:postID/like', async (req, res) => {
    const postID = req.params.postID;
    
    const post = await Post.findById(postID);
    if (!post) {
        return res.status(500).send('Internal error');
    }

    if (await Like.exists({ author: req.session.user?._id, post: post._id })) {
        return res.status(400).send('Already liked')
    }

    const like = await Like.create({
        author: req.session.user?._id,
        post: post._id
    });

    post.likes.push(like._id);
    await post.save();

    return res.status(200).send('Success');
})

export default router;
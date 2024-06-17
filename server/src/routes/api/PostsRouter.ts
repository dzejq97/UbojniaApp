import express from "express";
import User, { TUser } from "../../database/models/app/User";
import Post, { createComment, createReply, getFullPost } from "../../database/models/app/post";
import { TPostComment } from "../../database/models/app/PostComment";
const router = express.Router();

router.post('/create', async (req, res) => {
    const content = req.body.content as string | null | undefined;
    if (!content || !content.length) return res.status(400).send('Content not provided');

    const post = await Post.create({
        content: content,
        author: req.session.user?._id,
    });
    await User.findOneAndUpdate({ _id: req.session.user?._id}, { $push: { posts: post._id }})
    
    res.send(post);
});

router.get('/latest', async (req, res) => {

})

router.get('/:postID', async (req, res) => {
    const postID = req.params.postID;

    //await createComment(postID, { author_id: req.session.user?._id!, content: 'essssssa'})

    const post = await getFullPost(postID);

    await createReply(post?.comments![0]._id!, {
        author_id: req.session.user?._id!,
        content: 'jebać jebać i się nie bać'
    })

    res.send(post);
})

router.get('/:postID/topcomments', async (req, res) => {
    const postID = req.params.postID;
})

router.get('/:postID/allcomments', async (req, res) => {

})

router.post('/:postID/comment', async (req, res) => {
});

router.post('/:postID/like', async (req, res) => {
})

export default router;
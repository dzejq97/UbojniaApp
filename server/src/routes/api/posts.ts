import express from "express";
import PostsController from "../../controllers/posts";
const router = express.Router();

router.post('/create', );
router.get('/:postID', );
router.post('/:postID/like')
router.post('/:postID/comment',);

router.get('/:postID/allcomments',);
router.get('/:postID/topcomments')
router.post('/:postID/comments/:commentID/reply');
router.post('/:postID/comments/:commentID/like')
export default router;
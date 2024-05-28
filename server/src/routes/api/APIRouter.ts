import express from 'express';
const router = express.Router();

import PostsRouter from './PostsRouter';
router.use('/posts', PostsRouter)
import UsersRouter from './UsersRouter';
router.use('/users', UsersRouter);

router.get('/', (req, res) => {
    res.send('UbojniaAPI')
})



export default router;
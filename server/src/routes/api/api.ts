import express from 'express';
const APIRouter = express.Router();

import PostsRouter from './posts';
APIRouter.use('/posts', PostsRouter)

import UsersRouter from './UsersRouter';
APIRouter.use('/users', UsersRouter);



export default APIRouter;
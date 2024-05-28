import express from "express"
const router = express.Router();
import requireAuth from '../middleware/requireAuth';

router.get('/', async (req, res) => {
    res.send('<h1>Hello from UbojniaBOT API</h1>');
});

import AuthRouter from "./authRouter";
router.use('/auth', AuthRouter);

import APIRouter from './api/APIRouter';
router.use('/api', requireAuth, APIRouter);

router.use((req, res) => {
    res.status(404);
});


export default router;
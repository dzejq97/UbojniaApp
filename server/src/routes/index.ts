import express from "express"
const router = express.Router();
import requireAuth from '../middleware/requireAuth';

router.get('/', async (req, res) => {
    res.send('<h1>Hello from UbojniaBOT API</h1>');
});

import AuthRouter from "./auth";
router.use('/auth', AuthRouter);

import APIRouter from './api/index';
router.use('/api', requireAuth, APIRouter);


export default router;
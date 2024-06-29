import express from "express"
const router = express.Router();
import requireAuth from '../middleware/requireAuth';

import AuthController from "../controllers/auth";

router.get('/', async (req, res) => {
    res.send('<h1>Hello from UbojniaBOT API</h1>');
});

router.get('/auth/me', AuthController.me);
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.all('/auth/logout', AuthController.logout);

import APIRouter from './api/api';
router.use('/api', requireAuth, APIRouter);

router.use('*', (req, res) => {
    res.status(404).send();
});

export default router;
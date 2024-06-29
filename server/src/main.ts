import 'dotenv/config';
import express, { Express } from "express";
import cookieParser from 'cookie-parser';
import { client } from './services/bot/client';
import logger from './middleware/logger';
import session from 'express-session'
import router from './routes/router';
import { TUser, UserType } from './database/models/app/User';
import cors from 'cors'
import { HydratedDocument } from 'mongoose';
import AuthService from './services/auth';

declare module "express-session" {
    interface SessionData {
        user: AuthService.ISessionUser,
    }
}

const server: Express = express();
server.use(cors({
    credentials: true,
    origin: true
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use(cookieParser());
server.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))
server.use(logger);

server.use('/', router);

(async () => {
        server.listen(process.env.PORT || 8080, () => {
            console.log(`✅:Server is listening on port ${process.env.PORT}`);
        });

        //await client.login(process.env.TOKEN);
})();
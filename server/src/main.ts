import 'dotenv/config';
import express, { Express } from "express";
import cookieParser from 'cookie-parser';
import { client } from './bot/client';
import logger from './middleware/logger';
import session from 'express-session'
import indexRouter from './routes/index';
import { TUser } from './database/models/app/user';
import cors from 'cors'

declare module "express-session" {
    interface SessionData {
        user: TUser
    }
}

const server: Express = express();
server.use(cors());
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

server.use('/', indexRouter);

(async () => {
        server.listen(process.env.PORT || 8080, () => {
            console.log(`✅:Server is listening on port ${process.env.PORT}`);
        });

        //await client.login(process.env.TOKEN);
})();
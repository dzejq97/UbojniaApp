import { Request, Response } from "express";
import AuthService from "../services/auth";

namespace AuthController {
    const isLoggedIn = (req: Request): boolean => {
        if (req.session.user) return true;
        else return false;
    }

    export const me = async (req: Request, res: Response) => {
        try {
            if (req.session.user) res.status(200).send(req.session.user);
            else res.status(401).send();
        } catch(e) {
            res.status(500).send(e);
        }
    }

    export const logout = async (req: Request, res: Response) => {
        req.session.destroy( (err) => {
            if (!err) return res.status(200).send();
            else return res.status(500).send(err);
        });
    }

    export const login = async (req: Request, res: Response) => {
        if (isLoggedIn(req)) return res.status(202).send();

        const username_or_email = req.body.username;
        const password = req.body.password;

        const user = await AuthService.findUser({
            username_or_email: username_or_email,
            password: password
        });

        if (!user) res.status(400).send();
        else {
            req.session.user = user
            res.status(200).send(user);
        }
    }

    export const register = async (req: Request, res: Response) => {
        if (isLoggedIn(req)) return res.status(202).send();

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !email || !password) return res.status(400).send();

        const status = await AuthService.createAccount({
            username: username,
            email: email,
            password: password
        });

        if (status) return res.status(200).send();
        else return res.status(409).send();
    }
}

export default AuthController;
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) next();
    else res.status(401).send({ message: 'Unauthenticated'});

}
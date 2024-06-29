import User from "../database/models/app/User";
import crypto from 'crypto';

namespace AuthService {
    const hash = (pass: string) => {
        return crypto.createHash('md5').update(pass).digest('hex');
    }

    interface IFindUserData {
        username_or_email: string,
        password: string,
    }
    export interface ISessionUser {
        _id: string,
        username: string,
        email: string,
        createdAt: Date,
    }

    export const findUser = async (data: IFindUserData): Promise<ISessionUser | undefined> => {
        try {
            let user = await User.findOne({
                username: data.username_or_email,
                password: hash(data.password)
            });
            if (!user) await User.findOne({
                email: data.username_or_email,
                password: hash(data.password)
            });

            if (!user) return undefined;
            else return <ISessionUser>{
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }

    interface IRegisterData {
        username: string,
        email: string,
        password: string,
    }

    export const createAccount = async (data: IRegisterData): Promise<boolean> => {
        try {
            if (await User.exists({ username: data.username}) || await User.exists({ email: data.email })) {
                return false;
            }

            await User.create({
                username: data.username,
                email: data.email,
                password: hash(data.password)
            });
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}

export default AuthService;
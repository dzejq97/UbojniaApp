import { writable } from "svelte/store";
import type { TUser } from './interfaces/user';
import doFetch from "./doFetch";

export interface ISession {
    authorized: boolean;
    user?: TUser
}

export const session = writable(<ISession>{ authorized: false});

export const update = async() => {
    const res = await doFetch('/auth/me', { method: 'GET'});
    if (res.status === 200) {
        const json = await res.json();
        session.set({ authorized: true, user: json });
    } else {
        session.set({ authorized: false, user: undefined});
    }
}

export const signIn = async (body: ISignInBody): Promise<boolean> => {
    const res = await doFetch('/auth/login', { 
        method: 'POST',
        body: JSON.stringify(body)
    });

    if (res.status === 200) {
        const json = await res.json();
        session.set({authorized: true, user: json.user});
        return true;
    } else if (res.status === 202) {
        return true;
    } else {
        session.set({authorized: false, user: undefined});
        return false;
    }
};
export const signOut = async () => {
    await doFetch('/auth/logout', { method: 'POST'});
    session.set({ authorized: false, user: undefined});
}



interface ISignInBody {
    username: string,
    password: string,
}
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, route }) {
    const res = await fetch('/auth/me', { method: 'GET'} );
    if (res.status === 200) {
        if (route.id === '/' || route.id === '/register') throw redirect(302, '/portal');

        return {
            authenticated: true,
            user: await res.json()
        }
    } else {
        if (route.id?.startsWith('/portal')) throw redirect(302, '/');

        return {
            authenticated: false
        }
    }
}
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
    const res = await fetch('/api/posts/latest', {
        method: 'GET',
    });

    //console.log(await res.json());

    if (res.status === 200) {
        return {
            latest_posts: await res.json()
        }
    } else {
        throw error(500);
    }
}
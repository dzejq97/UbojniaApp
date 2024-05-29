export async function load() {
    const response = await fetch('http://localhost:5003/api/posts/latest');
    const latest_posts = await response.json();


    return latest_posts;
}
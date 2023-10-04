const API_BASE_URL = 'https://my.api.mockaroo.com';
const API_KEY = '04d55c10';

export async function fetchBlogPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
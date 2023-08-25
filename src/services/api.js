import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api-blog-post.onrender.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});


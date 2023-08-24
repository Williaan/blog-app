import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api-blog-nw22xj95k-willian-dev.vercel.app/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});


import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// In Render, RENDER_EXTERNAL_URL doesn't have /api, so we ensure it's added
if (!baseURL.endsWith('/api')) {
    baseURL += '/api';
}

const api = axios.create({
    baseURL,
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

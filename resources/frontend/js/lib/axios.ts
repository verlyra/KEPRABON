import axios, { AxiosHeaders } from 'axios';
import { generateHmacHeaders } from './hmac';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const method = config.method || 'post';
        if (!(config.headers instanceof AxiosHeaders))config.headers = new AxiosHeaders(config.headers);
        const requestUrl = axios.getUri(config);
        const urlObject = new URL(requestUrl, window.location.origin);
        const uri = urlObject.pathname + urlObject.search;
        const body = config.data;
        const hmacHeaders = generateHmacHeaders(method, uri, body);

        config.headers.set('X-Signature', hmacHeaders['X-Signature']);
        config.headers.set('X-Timestamp', hmacHeaders['X-Timestamp']);
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
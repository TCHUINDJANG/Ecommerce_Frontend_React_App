import axios from 'axios'

const apiClient = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    
    timeout: 10000,
    headers: {
        'Content-Type':'application/json',
    },
});

//intercepteur pour ajouter le token JWT

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;
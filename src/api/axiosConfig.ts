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
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
} , error => {
    return Promise.reject(error);
});


// / Gestion des erreurs globales

const publicRoutes = ['/', '/login', '/register', '/products'];
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 && !publicRoutes.includes(window.location.pathname)) {
            // Rediriger vers le login si non authentifié
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
// src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://taxera.onrender.com' 
    : 'http://localhost:10000');

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // For cookies
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token expiration
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
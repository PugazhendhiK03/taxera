const API_BASE = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://taxera-server.onrender.com' 
    : 'http://localhost:10000');

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Enhanced request interceptor for auth tokens
apiClient.interceptors.request.use(config => {
  // You can add auth tokens here if needed later
  return config;
});

// Enhanced response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Handle token refresh here if you implement refresh tokens
      window.location.href = '/login?session=expired';
      return Promise.reject(error);
    }
    
    // Handle other errors
    return Promise.reject({
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);
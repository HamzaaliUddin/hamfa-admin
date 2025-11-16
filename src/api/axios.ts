import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Get token from localStorage
    const token = localStorage.getItem('admin_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // Handle errors globally
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized - Auto logout
      if (status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Access forbidden');
      }
      
      // Handle 500 Server Error
      if (status >= 500) {
        console.error('Server error occurred');
      }
      
      return Promise.reject(data || error.message);
    }
    
    // Network error
    if (error.request) {
      console.error('Network error - no response received');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    
    return Promise.reject(error.message || 'An error occurred');
  }
);

export default axiosInstance;


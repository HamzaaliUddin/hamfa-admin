import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // Set token in cookie for server-side middleware validation
      if (typeof document !== 'undefined') {
        document.cookie = `admin_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      }
    }

    // Debug log
    console.log('🚀 API Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      hasToken: !!token,
    });

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Debug log
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    // Backend wraps responses in { body: {...} }, so unwrap it
    // If response has a body property, return that, otherwise return data as-is
    return response.data.body || response.data;
  },
  error => {
    // Debug log
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Handle errors globally
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized - Auto logout
      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
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

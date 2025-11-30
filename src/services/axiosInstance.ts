import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noAuth?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

    // Check if we need to add an Authorization token
    if (!config.noAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // Set token in cookie for server-side middleware validation
      if (typeof document !== 'undefined') {
        document.cookie = `admin_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      }
    }

    // Return the modified config
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Debug log
    console.log(
      `%cSuccess: ${response?.config?.url}`,
      'color: green; background-color:rgb(225, 255, 230); font-weight: bold; padding: 8px;',
      response?.data
    );

    // Backend wraps responses in { body: {...} }, so unwrap it
    // If response has a body property, return that, otherwise return data as-is
    return response?.data;
  },
  async (error) => {
    const error_response = {
      status: error?.response?.status,
      data: error?.response?.data
    };
    
    // Debug log
    console.log(
      `%cError: ${error?.config?.url}`,
      'color: red; background-color:rgb(255, 225, 225); font-weight: bold; padding: 8px;',
      error_response
    );

    // Handle errors globally
    if (error.response) {
      const { status } = error.response;

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
    }

    return Promise.reject(error_response);
  }
);

export default axiosInstance;


import { authUtils } from '@/utils/auth';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noAuth?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    // Get token from cookies
    const token = typeof window !== 'undefined' ? Cookies.get('admin_token') : null;

    // Check if we need to add an Authorization token
    if (!config.noAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  response => {
    // Debug log
    console.log(
      `%cSuccess: ${response?.config?.url}`,
      'color: green; background-color:rgb(225, 255, 230); font-weight: bold; padding: 8px;',
      response?.data
    );

    // Backend wraps responses in { status, message, body: {...}, errors }
    // We need to unwrap and return just the body content
    if (response?.data?.body !== undefined) {
      return response.data.body;
    }

    // If no body property, return data as-is (for non-standard responses)
    return response?.data;
  },
  async error => {
    const error_response = {
      status: error?.response?.status,
      data: error?.response?.data,
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
          // Remove token from cookies
          // authUtils.removeToken();
          // Remove user from localStorage
          // authUtils.removeUser();
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

// src/api/authApi.js
import axios from "axios";

// API Configuration - chỉ dùng API chính
const API_BASE_URL = "http://192.168.29.231:8080";

console.log("🚀 API Base URL:", API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor để tự động thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response và auto logout khi token hết hạn
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Có thể redirect về login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Login API
export const loginUser = (credentials) => {
  console.log("🔐 Login request to:", `${API_BASE_URL}/auth/login`);
  console.log("📝 Credentials:", { email: credentials.email, password: "***" });
  
  return apiClient.post("/auth/login", credentials);
};

// Register API
export const registerUser = (userInfo) => {
  console.log("📝 Register request to:", `${API_BASE_URL}/auth/register`);
  console.log("👤 User info:", { ...userInfo, password: "***", confirmPassword: "***" });
  
  return apiClient.post("/auth/register", userInfo);
};

// Endpoint logout
export const logoutUser = () => {
  return apiClient.post("/auth/logout");
};

// Endpoint lấy thông tin user hiện tại
export const getCurrentUser = () => {
  return apiClient.get("/auth/me");
};

// Endpoint refresh token
export const refreshToken = () => {
  return apiClient.post("/auth/refresh");
};

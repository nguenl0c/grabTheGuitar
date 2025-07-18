// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

// Tạo Context
const AuthContext = createContext(null);

// Tạo Provider (Component cha để bao bọc ứng dụng)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Lấy token từ localStorage khi ứng dụng tải lần đầu
    const [token, setToken] = useState(localStorage.getItem('token'));

    console.log("🔧 AuthProvider initialized:", { user, token });

    useEffect(() => {
        if (token) {
            // Lấy thông tin user từ localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [token]);

    // Hàm này sẽ được gọi từ trang Login
    const login = (userData, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    };

    // Hàm này sẽ được gọi từ Header hoặc trang Profile
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        isLoggedIn: !!token, // Trả về true nếu có token
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Tạo custom hook để dễ dàng sử dụng context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};
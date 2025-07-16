import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMail, IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";
import whiteLogo from '../assets/2.png';
import { loginUser } from '../api/authApi';

const Login = () => {   
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            setErrors({});
            
            try {
                // Gọi API đăng nhập
                const response = await loginUser({
                    email: formData.email,
                    password: formData.password
                });

                console.log('Login successful:', response.data);
                
                // Lưu token nếu backend trả về
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                // Redirect đến trang chủ hoặc dashboard
                navigate('/');
                
            } catch (error) {
                console.error('Login error:', error);
                
                if (error.response?.data?.message) {
                    // Nếu backend trả về thông báo lỗi
                    setErrors({ 
                        general: error.response.data.message 
                    });
                } else if (error.response?.status === 401) {
                    // Unauthorized - thông tin đăng nhập không đúng
                    setErrors({ 
                        general: 'Email hoặc mật khẩu không đúng' 
                    });
                } else if (error.response?.status === 404) {
                    // Not found - có thể là endpoint không tồn tại
                    setErrors({ 
                        general: 'Không thể kết nối đến server. Vui lòng thử lại sau.' 
                    });
                } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                    // Network error - server không khả dụng
                    setErrors({ 
                        general: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.' 
                    });
                } else {
                    // Lỗi khác
                    setErrors({ 
                        general: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' 
                    });
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#2f3238]">
            {/* Left side - Hero/Brand Section (60%) */}
            <div className="hidden lg:flex lg:w-4/7 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 m-4 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={whiteLogo} 
                        alt="Guitar Background" 
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                {/* Content Overlay */}
                

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
            </div>

            {/* Right side - Login Form (40%) */}
            <div className="w-full lg:w-3/7 flex items-center justify-center p-8 relative">
                {/* Logo positioned at top-left */}

                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="lg:hidden mx-auto flex items-center justify-center rounded-full mb-8">
                            <img src={whiteLogo} alt="logo" className='size-30'/>
                        </div>
                        <h2 className="text-left text-3xl font-bold text-gray-200 font-tiktok">
                            Đăng nhập
                        </h2>
                        <p className="mt-2 text-left text-sm text-gray-400 font-tiktok">
                            Hoặc{' '}
                            <Link
                                to="/register"
                                className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                tạo tài khoản mới
                            </Link>
                        </p>
                    </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* General Error Message */}
                    {errors.general && (
                        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {errors.general}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <IoMdMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-600'
                                        } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm`}
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Mật khẩu
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IoLockClosed className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-600'
                                        } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm`}
                                    placeholder="Nhập mật khẩu"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                                <IoIosEyeOff className="h-5 w-5" />
                                        ) : (
                                            <IoIosEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-700 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition duration-150 ease-in-out shadow-lg ${
                                isLoading 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import whiteLogo from '../assets/2.png';
import { useAuth } from '../contexts/AuthContext'; // 1. Import hook useAuth

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 2. Lấy trạng thái và hàm từ AuthContext
    // - isLoggedIn: boolean (true nếu đã đăng nhập, false nếu chưa)
    // - user: object chứa thông tin người dùng (ví dụ: { name, email }) hoặc null
    // - logout: hàm để thực hiện đăng xuất
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    // 3. Hàm xử lý khi người dùng nhấn nút Đăng xuất
    const handleLogout = () => {
        logout(); // Gọi hàm logout từ context để xóa token và thông tin user
        navigate('/login'); // Điều hướng người dùng về trang đăng nhập
    };

    const navLinks = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Sản phẩm', href: '/products' },
        { name: 'Giới thiệu', href: '/about' },
        { name: 'Liên hệ', href: '/contact' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img className="h-16 w-auto" src={whiteLogo} alt="GrabTheGuitar Logo" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Search, Cart, Auth */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-indigo-600">
                            <Search className="h-6 w-6" />
                        </button>
                        <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </Link>

                        {/* 4. Hiển thị có điều kiện dựa trên trạng thái đăng nhập */}
                        {isLoggedIn ? (
                            // Nếu đã đăng nhập
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-800">
                                    Chào, {user?.name || user?.username || 'bạn'}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-gray-700 hover:text-indigo-600 p-2 rounded-full"
                                    title="Đăng xuất"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            // Nếu chưa đăng nhập
                            <Link
                                to="/login"
                                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                            >
                                <User className="h-5 w-5" />
                                <span>Đăng nhập</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            {isLoggedIn ? (
                                <div className="flex items-center px-3">
                                    <div className="flex-shrink-0">
                                        {/* Placeholder for user avatar */}
                                        <User className="h-8 w-8 text-gray-500" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user?.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user?.username}</div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Đăng nhập
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

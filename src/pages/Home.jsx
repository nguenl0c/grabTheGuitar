import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Star, 
  Heart,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Banner data - 9 banners total
  const banners = [
    {
      id: 1,
      title: 'Guitar Acoustic Premium',
      subtitle: 'Âm thanh trong trẻo, chất lượng vượt trội',
      image: '/api/placeholder/400/200',
      buttonText: 'Khám phá ngay',
      bgColor: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'Guitar Electric Pro',
      subtitle: 'Sức mạnh âm thanh điện tử',
      image: '/api/placeholder/400/200',
      buttonText: 'Xem collection',
      bgColor: 'from-red-600 to-orange-600'
    },
    {
      id: 3,
      title: 'Guitar Classical Deluxe',
      subtitle: 'Nghệ thuật cổ điển tinh tế',
      image: '/api/placeholder/400/200',
      buttonText: 'Tìm hiểu thêm',
      bgColor: 'from-green-600 to-teal-600'
    },
    {
      id: 4,
      title: 'Bass Guitar Master',
      subtitle: 'Nhịp điệu mạnh mẽ, bass sâu lắng',
      image: '/api/placeholder/400/200',
      buttonText: 'Mua ngay',
      bgColor: 'from-purple-600 to-pink-600'
    },
    {
      id: 5,
      title: 'Amplifier Series',
      subtitle: 'Khuếch đại âm thanh hoàn hảo',
      image: '/api/placeholder/400/200',
      buttonText: 'Xem chi tiết',
      bgColor: 'from-indigo-600 to-blue-600'
    },
    {
      id: 6,
      title: 'Accessories Pro',
      subtitle: 'Phụ kiện chuyên nghiệp cho guitarist',
      image: '/api/placeholder/400/200',
      buttonText: 'Mua sắm',
      bgColor: 'from-yellow-600 to-orange-600'
    },
    {
      id: 7,
      title: 'Vintage Collection',
      subtitle: 'Bộ sưu tập guitar cổ điển',
      image: '/api/placeholder/400/200',
      buttonText: 'Khám phá',
      bgColor: 'from-gray-600 to-gray-800'
    },
    {
      id: 8,
      title: 'Limited Edition',
      subtitle: 'Phiên bản giới hạn độc quyền',
      image: '/api/placeholder/400/200',
      buttonText: 'Đặt trước',
      bgColor: 'from-rose-600 to-pink-600'
    },
    {
      id: 9,
      title: 'Student Series',
      subtitle: 'Lựa chọn hoàn hảo cho người mới bắt đầu',
      image: '/api/placeholder/400/200',
      buttonText: 'Bắt đầu',
      bgColor: 'from-emerald-600 to-green-600'
    }
  ];

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 3) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 3 + banners.length) % banners.length);
  };

  const getCurrentBanners = () => {
    const current = [];
    for (let i = 0; i < 3; i++) {
      current.push(banners[(currentBannerIndex + i) % banners.length]);
    }
    return current;
  };

  // Sample data - trong thực tế sẽ fetch từ API
  const featuredProducts = [
    {
      id: 1,
      name: 'Guitar Acoustic Yamaha F310',
      price: 2500000,
      originalPrice: 3000000,
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 128,
      isNew: true,
      discount: 17
    },
    {
      id: 2,
      name: 'Guitar Electric Fender Stratocaster',
      price: 15000000,
      originalPrice: null,
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviews: 89,
      isNew: false,
      discount: 0
    },
    {
      id: 3,
      name: 'Guitar Classical Cordoba C7',
      price: 8500000,
      originalPrice: 9500000,
      image: '/api/placeholder/300/300',
      rating: 4.6,
      reviews: 156,
      isNew: false,
      discount: 11
    },
    {
      id: 4,
      name: 'Guitar Bass Ibanez SR300E',
      price: 12000000,
      originalPrice: null,
      image: '/api/placeholder/300/300',
      rating: 4.7,
      reviews: 203,
      isNew: true,
      discount: 0
    }
  ];

  const categories = [
    { name: 'Guitar Acoustic', count: 45, image: '/api/placeholder/150/150' },
    { name: 'Guitar Electric', count: 32, image: '/api/placeholder/150/150' },
    { name: 'Guitar Classical', count: 28, image: '/api/placeholder/150/150' },
    { name: 'Guitar Bass', count: 19, image: '/api/placeholder/150/150' },
    { name: 'Phụ kiện', count: 87, image: '/api/placeholder/150/150' },
    { name: 'Ampli & Effects', count: 34, image: '/api/placeholder/150/150' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Banner Carousel */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevBanner}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Banner Grid - 3 banners visible */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getCurrentBanners().map((banner) => (
                <div
                  key={banner.id}
                  className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${banner.bgColor} p-8 text-white min-h-[300px] flex flex-col justify-between`}
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-white/90 mb-6">{banner.subtitle}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <button className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg hover:bg-white/30 transition-colors">
                      {banner.buttonText}
                    </button>
                    <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="absolute bottom-4 right-20 w-4 h-4 bg-white/20 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Banner indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(banners.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index * 3)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentBannerIndex / 3) === index
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Danh mục sản phẩm
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="group text-center hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg p-4"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.count} sản phẩm</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Sản phẩm nổi bật
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
              >
                <List className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-2">
                <Filter className="h-4 w-4" />
                <span>Lọc</span>
              </button>
            </div>
          </div>

          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Mới
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

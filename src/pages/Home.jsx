import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Star, 
  Heart,
  Filter,
  Grid,
  List
} from 'lucide-react';

const Home = () => {
  const [viewMode, setViewMode] = useState('grid');

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Cửa hàng Guitar hàng đầu
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Khám phá bộ sưu tập guitar chất lượng cao từ các thương hiệu nổi tiếng thế giới
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10">
                Khám phá ngay
              </button>
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

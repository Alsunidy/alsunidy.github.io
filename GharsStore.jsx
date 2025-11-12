import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Leaf, Droplet, Calendar, Phone, Mail, MapPin, Search } from 'lucide-react';

export default function GharsStore() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'صبار الألوفيرا', category: 'indoor', price: 45, image: '🌵', description: 'نبات منزلي سهل العناية' },
    { id: 2, name: 'نخلة الأريكا', category: 'indoor', price: 120, image: '🌴', description: 'مثالي للمساحات الواسعة' },
    { id: 3, name: 'نبات الزينة', category: 'indoor', price: 65, image: '🪴', description: 'يضيف جمالاً لمنزلك' },
    { id: 4, name: 'شجيرة الورد', category: 'outdoor', price: 85, image: '🌹', description: 'للحدائق الخارجية' },
    { id: 5, name: 'نبات اللافندر', category: 'outdoor', price: 55, image: '🌿', description: 'عطر طبيعي رائع' },
    { id: 6, name: 'شجرة الزيتون', category: 'outdoor', price: 200, image: '🌳', description: 'شجرة مباركة وجميلة' },
  ];

  const subscriptionPlans = [
    { id: 1, name: 'العناية الأسبوعية', price: 150, period: 'أسبوعياً', features: ['زيارة أسبوعية', 'سقي النباتات', 'فحص الصحة', 'تقليم خفيف'] },
    { id: 2, name: 'العناية الشهرية', price: 400, period: 'شهرياً', features: ['زيارتان شهرياً', 'سقي وتسميد', 'فحص شامل', 'تقليم وتنظيف', 'استشارة مجانية'] },
    { id: 3, name: 'العناية الموسمية', price: 1000, period: 'كل 3 شهور', features: ['4 زيارات في الموسم', 'عناية شاملة', 'تسميد متخصص', 'تجديد التربة', 'ضمان الصحة'] },
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="text-green-600 w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold text-green-800">غرس</h1>
                <p className="text-xs text-green-600">نزرع الجمال في حياتك</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition font-medium">الرئيسية</a>
              <a href="#products" className="text-gray-700 hover:text-green-600 transition font-medium">المتجر</a>
              <a href="#garden-design" className="text-gray-700 hover:text-green-600 transition font-medium">تصميم الحدائق</a>
              <a href="#subscription" className="text-gray-700 hover:text-green-600 transition font-medium">خدمات الصيانة</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition font-medium">تواصل معنا</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-green-50 rounded-full transition">
                <ShoppingCart className="text-green-600 w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <a href="#home" className="text-gray-700 hover:text-green-600 py-2">الرئيسية</a>
              <a href="#products" className="text-gray-700 hover:text-green-600 py-2">المتجر</a>
              <a href="#garden-design" className="text-gray-700 hover:text-green-600 py-2">تصميم الحدائق</a>
              <a href="#subscription" className="text-gray-700 hover:text-green-600 py-2">خدمات الصيانة</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 py-2">تواصل معنا</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
            نزرع الجمال في كل زاوية
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            نوفر لك أفضل النباتات المنزلية والخارجية، مع خدمات تصميم الحدائق والعناية الدورية
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#products" className="bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition shadow-lg">
              تصفح المتجر
            </a>
            <a href="#garden-design" className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition shadow-lg border-2 border-green-600">
              صمم حديقتك
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-green-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">نباتات عالية الجودة</h3>
              <p className="text-gray-600">نختار لك أفضل أنواع النباتات الصحية والقوية</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="text-blue-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تصميم حدائق احترافي</h3>
              <p className="text-gray-600">فريق متخصص في تصميم الحدائق بأسلوب عصري</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-amber-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">خدمة صيانة دورية</h3>
              <p className="text-gray-600">نعتني بحديقتك ونباتاتك بشكل منتظم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">متجر النباتات</h2>
          
          {/* Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-green-50'}`}
            >
              الكل
            </button>
            <button 
              onClick={() => setSelectedCategory('indoor')}
              className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === 'indoor' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-green-50'}`}
            >
              نباتات منزلية
            </button>
            <button 
              onClick={() => setSelectedCategory('outdoor')}
              className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === 'outdoor' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-green-50'}`}
            >
              نباتات خارجية
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-8xl">
                  {product.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{product.price} ر.س</span>
                    <button 
                      onClick={addToCart}
                      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition font-medium"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garden Design Section */}
      <section id="garden-design" className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">خدمة تصميم الحدائق</h2>
            <p className="text-xl mb-8 text-green-50">
              فريقنا المتخصص يصمم لك حديقة أحلامك بأسلوب عصري يناسب ذوقك ومساحتك
            </p>
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-green-700">كيف نعمل؟</h3>
              <div className="space-y-4 text-right">
                <div className="flex gap-4">
                  <div className="bg-green-100 text-green-700 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold mb-1">أرسل لنا مساحة حديقتك</h4>
                    <p className="text-gray-600">قم بإرسال صور ومقاسات الحديقة</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-green-100 text-green-700 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold mb-1">نصمم لك الحديقة</h4>
                    <p className="text-gray-600">فريقنا يقدم لك تصميم ثلاثي الأبعاد</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-green-100 text-green-700 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold mb-1">التنفيذ والتركيب</h4>
                    <p className="text-gray-600">ننفذ التصميم ونزرع النباتات المناسبة</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition shadow-lg w-full">
                احجز استشارة مجانية
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="subscription" className="py-16 px-4 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-4">خطط الصيانة والعناية</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            اختر الخطة المناسبة لك ودع فريقنا يعتني بحديقتك ونباتاتك
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map(plan => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-green-800 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-green-600">{plan.price}</span>
                  <span className="text-gray-600 mr-2">ر.س / {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-green-600 text-white py-3 rounded-full font-bold hover:bg-green-700 transition">
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">تواصل معنا</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">الهاتف</h3>
                  <p className="text-gray-600" dir="ltr">+966 50 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Mail className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">البريد الإلكتروني</h3>
                  <p className="text-gray-600">info@ghars.sa</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">الموقع</h3>
                  <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-800 mb-4">أرسل لنا رسالة</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="الاسم" 
                  className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                />
                <input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                />
                <textarea 
                  placeholder="رسالتك" 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                ></textarea>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8" />
            <h3 className="text-2xl font-bold">غرس</h3>
          </div>
          <p className="text-green-200 mb-4">نزرع الجمال في حياتك 🌿</p>
          <p className="text-green-300 text-sm">© 2024 غرس. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import MenuCard from './components/MenuCard';
import QuickViewModal from './components/QuickViewModal';
import LocationModal from './components/LocationModal';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import CartPage from './components/CartPage';

import { PRODUCTS, MENU_CATEGORIES } from './data/menuData';
import { toggleAudio, getAudioState } from './audio/summerSounds';

export default function App() {
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'cart' | 'admin'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(getAudioState());

  const [orderType, setOrderType] = useState('pickup');
  const [selectedBranch, setSelectedBranch] = useState({
    id: 'westridge',
    name: 'The Sip Spot — Westridge 1',
    address: 'Lane 5 Near Nisar Hospital, Main Peshawar Road, Rawalpindi',
    city: 'Rawalpindi'
  });
  const [userDeliveryAddress, setUserDeliveryAddress] = useState('');

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sip_spot_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sip_spot_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleToggleSound = () => {
    const newState = toggleAudio();
    setSoundEnabled(newState);
  };

  const handleAddToCart = (productToAdd) => {
    const cartId = productToAdd.cartId || productToAdd.id;
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => (item.cartId || item.id) === cartId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += productToAdd.quantity || 1;
        return updated;
      }
      return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
    });
  };

  const handleUpdateQuantity = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => (item.cartId || item.id) === cartId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity = newQty;
        return updated;
      } else {
        const product = PRODUCTS.find((p) => p.id === cartId);
        if (product) {
          return [...prevCart, { ...product, quantity: newQty }];
        }
        return prevCart;
      }
    });
  };

  const handleRemoveItem = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => (item.cartId || item.id) !== cartId));
  };

  const handleOrderSuccess = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#EA580C', '#FACC15', '#16A34A', '#E11D48']
    });
  };

  const handleSaveLocation = ({ orderType: newType, branch: newBranch, deliveryAddress: newAddress }) => {
    setOrderType(newType);
    setSelectedBranch(newBranch);
    if (newAddress) setUserDeliveryAddress(newAddress);
  };

  // Filter products by search query first
  const searchFilteredProducts = PRODUCTS.filter((product) => {
    if (searchQuery.trim() === '') return true;
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Get categories to display: if 'all', show all specific categories grouped
  const categoriesToDisplay = activeCategory === 'all'
    ? MENU_CATEGORIES.filter((c) => c.id !== 'all')
    : MENU_CATEGORIES.filter((c) => c.id === activeCategory);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantityInCart = (productId) => {
    const item = cart.find((i) => (i.cartId || i.id) === productId);
    return item ? item.quantity : 0;
  };

  const getCategorySubtitle = (id) => {
    switch (id) {
      case 'shakes': return 'Fresh Milk & Real Fruit Shakes';
      case 'fresh_juices': return '100% Organic Cold-Pressed Juices';
      case 'hot_drinks': return 'Brewed Teas & Espresso Coffees';
      case 'cold_drinks': return 'Chilled Sodas & Iced Drinks';
      case 'food': return 'Freshly Grilled Sandwiches & Paninis';
      default: return 'Pure Taste, Pure Health';
    }
  };

  // Render Staff Admin Dashboard View
  if (viewMode === 'admin') {
    return <AdminDashboard onBackToStore={() => setViewMode('store')} />;
  }

  // Render Standalone Full Cart & Checkout Page View
  if (viewMode === 'cart') {
    return (
      <CartPage
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
        onOrderSuccess={handleOrderSuccess}
        onBackToStore={() => setViewMode('store')}
        selectedOrderType={orderType}
        selectedBranch={selectedBranch}
        savedDeliveryAddress={userDeliveryAddress}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div
      className={`min-h-screen font-body selection:bg-orange-500 selection:text-white relative transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FFFDF9] text-slate-900'
      }`}
    >
      
      {/* Floating Staff Admin Switcher Button */}
      <button
        onClick={() => setViewMode('admin')}
        className="fixed bottom-4 right-4 z-40 px-4 py-2.5 rounded-full bg-slate-900 text-white font-extrabold text-xs tracking-wider uppercase shadow-2xl hover:bg-slate-800 transition-all border border-slate-700 flex items-center gap-2 hover:scale-105"
        title="Open Staff Admin Dashboard"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Staff Admin Portal</span>
      </button>

      {/* Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setViewMode('cart')}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        selectedOrderType={orderType}
        selectedBranch={selectedBranch}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      <main>
        {/* Top Hero Carousel Banner */}
        <HeroSection
          isDarkMode={isDarkMode}
          onExploreMenu={() => {
            const menuEl = document.getElementById('menu');
            if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Summer Arch Category Navigation Bar */}
        <MarqueeBanner
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          isDarkMode={isDarkMode}
        />

        {/* Product Menu Section Grouped by Category */}
        <section id="menu" className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {categoriesToDisplay.map((catObj) => {
            const categoryProducts = searchFilteredProducts.filter(
              (p) => p.category === catObj.id
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div key={catObj.id} id={catObj.id} className="space-y-6">
                
                {/* Big Giant Category Title Banner */}
                <div className="relative w-full py-8 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
                  
                  {/* Left Drink Cutout */}
                  <div className="hidden sm:block absolute left-8 top-1/2 -translate-y-1/2 w-24 h-32 z-10 rotate-[-12deg] drop-shadow-xl">
                    <img
                      src={catObj.image}
                      alt={catObj.label}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>

                  {/* Center Giant Category Title */}
                  <h2 className={`text-3xl sm:text-6xl font-black font-heading tracking-tight uppercase drop-shadow-xs z-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {catObj.label}
                  </h2>

                  {/* Summer Orange Slogan Badge */}
                  <div className="mt-2.5 px-5 py-1.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md z-10">
                    {getCategorySubtitle(catObj.id)}
                  </div>

                  {/* Right Drink Cutout */}
                  <div className="hidden sm:block absolute right-8 top-1/2 -translate-y-1/2 w-24 h-32 z-10 rotate-[12deg] drop-shadow-xl">
                    <img
                      src={catObj.image}
                      alt={catObj.label}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>

                </div>

                {/* Product Cards Grid for this category */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {categoryProducts.map((product) => (
                    <MenuCard
                      key={product.id}
                      product={product}
                      isDarkMode={isDarkMode}
                      itemQuantity={getItemQuantityInCart(product.id)}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onAddToCart={(p) => handleAddToCart(p)}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </div>

              </div>
            );
          })}

        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedOrderType={orderType}
        selectedBranch={selectedBranch.id}
        onSaveLocation={handleSaveLocation}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

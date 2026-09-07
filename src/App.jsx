import React, { useState, useEffect } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import MenuGrid from './components/MenuGrid';
import ItemModal from './components/ItemModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import BadgesBanner from './components/BadgesBanner';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { toggleAudio, getAudioState, playIceClink } from './audio/summerSounds';
import { STORE_INFO } from './data/menuData';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Audio Toggle state
  const [soundEnabled, setSoundEnabled] = useState(getAudioState());

  // Track page scroll progress for 3D camera lerping
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === product.id && JSON.stringify(i.customization) === JSON.stringify(product.customization));
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleSound = () => {
    const newState = toggleAudio();
    setSoundEnabled(newState);
  };

  const handleOrderWhatsApp = () => {
    window.open(`https://wa.me/${STORE_INFO.phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  // Determine current 3D Cup Color based on active category
  const getCupColor = () => {
    switch (activeCategory) {
      case 'shakes': return '#FFA500'; // Mango Orange
      case 'fresh_juices': return '#00FF7F'; // Mint Green
      case 'hot_drinks': return '#CD853F'; // Caramel Tea
      case 'cold_drinks': return '#8B4513'; // Chocolate Coffee
      case 'food': return '#FF4500'; // Tikka Spice
      default: return '#FF9900';
    }
  };

  return (
    <div className="min-h-screen bg-[#06090E] text-slate-100 relative selection:bg-amber-500 selection:text-slate-950">
      
      {/* Dynamic Cursor */}
      <CustomCursor />

      {/* 3D WebGL Background Canvas */}
      <ThreeCanvas scrollProgress={scrollProgress} activeColor={getCupColor()} />

      {/* Main Glass Header */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreMenu={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOrderWhatsApp={handleOrderWhatsApp}
      />

      {/* Kinetic Scrolling Marquee Banner */}
      <MarqueeBanner />

      {/* Store Menu Grid Section */}
      <MenuGrid
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickView={(product) => setQuickViewProduct(product)}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      {/* Store Badges & Guarantees */}
      <BadgesBanner />

      {/* Customer Reviews Section */}
      <ReviewsSection />

      {/* Footer & Location Map Card */}
      <Footer />

      {/* Modals & Drawers */}
      <ItemModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

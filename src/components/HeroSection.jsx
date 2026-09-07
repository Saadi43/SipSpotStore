import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playIceClink } from '../audio/summerSounds';

export default function HeroSection({ onExploreMenu, isDarkMode }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "The Sip Spot Special",
      image: "/images/banner_sip_spot_special.png"
    },
    {
      id: 2,
      title: "Coffee Special",
      image: "/images/banner_coffee_special.png"
    },
    {
      id: 3,
      title: "Fresh Water Soda",
      image: "/images/banner_fresh_soda.png"
    },
    {
      id: 4,
      title: "Milk Soda & Floats",
      image: "/images/banner_milk_soda.png"
    },
    {
      id: 5,
      title: "Toasted Paninis & Snacks",
      image: "/images/banner_food_special.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    playIceClink();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    playIceClink();
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[activeSlide];

  return (
    <section id="top" className="pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Motion Carousel Container */}
        <div
          className={`relative w-full rounded-3xl p-2 sm:p-3 shadow-sm overflow-hidden flex flex-col justify-between group border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
          }`}
        >
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-stone-800 flex items-center justify-center hover:bg-white transition-all active:scale-95 border border-stone-200"
            title="Previous Banner"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-stone-800 flex items-center justify-center hover:bg-white transition-all active:scale-95 border border-stone-200"
            title="Next Banner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Scale Motion Display */}
          <div
            className="relative w-full h-[200px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center"
            onClick={onExploreMenu}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Framer Motion Animated Pill-Style Dot Pagination */}
          <div className="flex items-center justify-center gap-2 pt-3 pb-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playIceClink();
                  setActiveSlide(idx);
                }}
                className="relative py-1 px-1 focus:outline-none"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                {activeSlide === idx && (
                  <motion.div
                    layoutId="activePillDot"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

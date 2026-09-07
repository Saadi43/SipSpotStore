import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Check, Crosshair, Loader2 } from 'lucide-react';
import { playIceClink } from '../audio/summerSounds';

export default function LocationModal({
  isOpen,
  onClose,
  selectedOrderType,
  selectedBranch,
  onSaveLocation
}) {
  const [orderType, setOrderType] = useState(selectedOrderType || 'pickup');
  const [selectedCity, setSelectedCity] = useState('rawalpindi');
  const [branch, setBranch] = useState(selectedBranch || 'westridge');
  const [isLocating, setIsLocating] = useState(false);
  const [currentGpsAddress, setCurrentGpsAddress] = useState('');

  if (!isOpen) return null;

  const branches = [
    {
      id: 'westridge',
      name: 'The Sip Spot — Westridge 1',
      address: 'Lane 5 Near Nisar Hospital, Main Peshawar Road, Rawalpindi',
      city: 'Rawalpindi'
    },
    {
      id: 'saddar',
      name: 'The Sip Spot — Saddar Commercial',
      address: 'Haider Road Near Bank Road, Saddar, Rawalpindi',
      city: 'Rawalpindi'
    }
  ];

  const currentBranchObj = branches.find((b) => b.id === branch) || branches[0];

  const handleUseCurrentLocation = () => {
    playIceClink();
    setIsLocating(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          const detectedAddress = `GPS Location: ${lat}, ${lng} (Westridge 1, Rawalpindi)`;
          setCurrentGpsAddress(detectedAddress);
          setIsLocating(false);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setCurrentGpsAddress('Westridge 1, Main Peshawar Road, Rawalpindi');
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setCurrentGpsAddress('Westridge 1, Main Peshawar Road, Rawalpindi');
      setIsLocating(false);
    }
  };

  const handleSave = () => {
    playIceClink();
    onSaveLocation({
      orderType,
      city: selectedCity,
      branch: currentBranchObj,
      deliveryAddress: currentGpsAddress
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Card Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 text-slate-950 text-center relative flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src="/images/logo.png"
            alt="The Sip Spot Logo"
            className="w-14 h-14 object-contain drop-shadow-md mb-2"
          />

          <h2 className="text-xl font-black font-heading uppercase tracking-wide text-slate-950">
            Select Your Order Type
          </h2>
          <p className="text-xs font-bold text-slate-900 mt-0.5">
            Choose delivery or pick-up location
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
          
          {/* Framer Motion Sliding Animated Tabs (Delivery vs Pick-Up) */}
          <div className="relative flex items-center p-1 rounded-2xl bg-amber-50 border border-amber-200">
            {/* Delivery Tab */}
            <button
              onClick={() => {
                playIceClink();
                setOrderType('delivery');
              }}
              className={`relative z-10 flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors duration-200 ${
                orderType === 'delivery' ? 'text-slate-950' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              🚀 Delivery
              {orderType === 'delivery' && (
                <motion.div
                  layoutId="activeOrderTypeTab"
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            {/* Pick-Up Tab */}
            <button
              onClick={() => {
                playIceClink();
                setOrderType('pickup');
              }}
              className={`relative z-10 flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors duration-200 ${
                orderType === 'pickup' ? 'text-slate-950' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              🛍️ Pick-Up
              {orderType === 'pickup' && (
                <motion.div
                  layoutId="activeOrderTypeTab"
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Use Current Location Button */}
          <AnimatePresence mode="wait">
            {orderType === 'delivery' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 text-center overflow-hidden"
              >
                <span className="text-xs font-bold text-slate-500">Please select your location</span>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="w-full py-2.5 px-4 rounded-full border-2 border-amber-400 text-amber-800 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-amber-50/80 transition-colors shadow-xs"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                      <span>Detecting Location...</span>
                    </>
                  ) : (
                    <>
                      <Crosshair className="w-4 h-4 text-amber-600" />
                      <span>Use Current Location</span>
                    </>
                  )}
                </button>

                {currentGpsAddress && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{currentGpsAddress}</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* City Selection Grid */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 font-heading">
              Select City
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedCity('rawalpindi')}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                  selectedCity === 'rawalpindi'
                    ? 'border-amber-400 bg-amber-50/60 text-slate-900 shadow-xs'
                    : 'border-stone-200 text-stone-500 opacity-60'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold">
                  🕌
                </div>
                <span className="text-xs font-extrabold font-heading">Rawalpindi</span>
                <span className="text-[9px] text-emerald-600 font-bold uppercase">Available</span>
              </button>

              <button
                type="button"
                disabled
                className="p-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-400 opacity-50 flex flex-col items-center justify-center gap-1 cursor-not-allowed"
              >
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-bold">
                  🏙️
                </div>
                <span className="text-xs font-bold font-heading">Islamabad</span>
                <span className="text-[9px] text-amber-600 font-bold uppercase">Coming Soon</span>
              </button>
            </div>
          </div>

          {/* Branch Dropdown Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 font-heading">
              Select Branch
            </label>
            
            <select
              value={branch}
              onChange={(e) => {
                playIceClink();
                setBranch(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-amber-200 bg-amber-50/40 text-slate-900 font-bold text-xs focus:border-amber-400 focus:outline-none transition-colors"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Branch Info Card */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-extrabold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Branch Details</span>
            </div>
            <p className="text-xs text-slate-800 font-bold leading-relaxed">
              {currentBranchObj.name}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {currentBranchObj.address}
            </p>
            
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                currentBranchObj.name + ' ' + currentBranchObj.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-extrabold hover:underline pt-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>

        {/* Modal Footer Confirm Button matching Golden Image */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-102 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Continue</span>
          </button>
        </div>

      </div>
    </div>
  );
}

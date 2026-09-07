import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  RefreshCw,
  Phone,
  MapPin,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Search
} from 'lucide-react';
import { PRODUCTS } from '../data/menuData';
import { playIceClink, playLiquidSplash } from '../audio/summerSounds';

export default function AdminDashboard({ onBackToStore }) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
  const [stock, setStock] = useState({});
  const [activeTab, setActiveTab] = useState('orders');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [ordersRes, statsRes, stockRes] = await Promise.all([
        fetch('http://localhost:5000/api/orders'),
        fetch('http://localhost:5000/api/stats'),
        fetch('http://localhost:5000/api/stock')
      ]);

      const ordersData = await ordersRes.json();
      const statsData = await statsRes.json();
      const stockData = await stockRes.json();

      if (ordersData.success) setOrders(ordersData.orders);
      if (statsData.success) setStats(statsData);
      if (stockData.success) setStock(stockData.stock);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // Auto refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    playIceClink();
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleToggleStock = async (productId, currentStatus) => {
    playLiquidSplash();
    const newStatus = currentStatus === false ? true : false;
    try {
      const res = await fetch('http://localhost:5000/api/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, isAvailable: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setStock(data.stock);
      }
    } catch (err) {
      console.error('Error toggling stock:', err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Preparing':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Out for Delivery':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-slate-800 border-stone-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 font-body">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black font-heading tracking-wide">
                  THE SIP SPOT — Staff Admin Portal
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase border border-emerald-500/30">
                  Live DB
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Westridge 1 Branch Staff Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-extrabold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Revenue Card */}
          <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-amber-700 tracking-wider font-heading">
                Today's Sales Revenue
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
                Rs. {stats.totalRevenue || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          {/* Orders Count Card */}
          <div className="bg-white p-5 rounded-3xl border border-orange-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-orange-700 tracking-wider font-heading">
                Total Orders Placed
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
                {stats.totalOrders || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          {/* Pending Orders Alert Card */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-emerald-700 tracking-wider font-heading">
                Pending Active Orders
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
                {stats.pendingOrders || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                activeTab === 'orders'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              📋 Live Orders Feed ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('stock')}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                activeTab === 'stock'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              🍹 Item Stock Manager
            </button>
          </div>

          {activeTab === 'orders' && (
            <div className="flex items-center gap-2">
              {['all', 'pending', 'preparing', 'completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] uppercase tracking-wider transition-colors ${
                    filterStatus === st
                      ? 'bg-orange-500 text-white'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: Live Orders Board */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  No orders found
                </h3>
                <p className="text-xs text-slate-500">
                  New incoming customer orders will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <span className="text-base font-black text-slate-900 font-mono">
                          {order.orderNumber}
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <span className={`px-3 py-1 rounded-full font-black text-[10px] uppercase border ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-1.5 text-xs">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {order.customerName}
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600 font-mono">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{order.customerPhone || 'N/A'}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-semibold">{order.orderType?.toUpperCase()} — {order.branchName}</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-1 text-xs">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Ordered Items
                      </span>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between font-medium text-slate-800">
                          <span>{item.name} <strong className="text-orange-600">x{item.quantity}</strong></span>
                          <span className="font-mono">Rs. {item.price * item.quantity}</span>
                        </div>
                      ))}
                      
                      <div className="pt-2 border-t border-stone-200 flex justify-between font-black text-slate-900 text-sm">
                        <span>Total</span>
                        <span className="font-mono text-orange-600">Rs. {order.grandTotal}</span>
                      </div>
                    </div>

                    {/* Action Workflow Buttons */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Preparing')}
                          className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase"
                        >
                          Start Preparing
                        </button>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Out for Delivery')}
                          className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs uppercase"
                        >
                          Out for Delivery
                        </button>
                      )}

                      {(order.status === 'Preparing' || order.status === 'Out for Delivery') && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Completed')}
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase"
                        >
                          Complete
                        </button>
                      )}

                      {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Cancelled')}
                          className="px-3 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Item Stock Manager */}
        {activeTab === 'stock' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Menu Item Availability Toggle
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Mark items as "Out of Stock" to disable them live on the customer storefront.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((product) => {
                const isAvailable = stock[product.id] !== false; // Default available

                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3 bg-stone-50/50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-slate-900 font-heading truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-slate-500 font-mono">
                          Rs. {product.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleStock(product.id, isAvailable)}
                      className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] uppercase tracking-wider transition-colors shrink-0 ${
                        isAvailable
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-rose-500 text-white shadow-xs'
                      }`}
                    >
                      {isAvailable ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

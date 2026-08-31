'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  LogOut, 
  ShieldCheck, 
  User, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Loader2,
  Bell,
  Search
} from 'lucide-react';

interface ShopDashboardProps {
  user: {
    id: string;
    email: string;
    isSuperAdmin: boolean;
  };
}

export default function ShopDashboard({ user }: ShopDashboardProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/shop/logout', {
        method: 'POST',
      });
      router.push('/shop/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBF9] text-[#1E2922] font-nunito flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#E2EAE1] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#80C34A] flex items-center justify-center text-white shadow-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="font-quicksand font-bold text-xl text-[#2D5A27] tracking-tight">
                  Grace Fresh
                </span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAF2EA] text-[#2D5A27]">
                  Shop Portal
                </span>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-4">
              {/* User Email & Role Badge */}
              <div className="hidden md:flex items-center gap-3 bg-[#F2F7F2] border border-[#E2EAE1] px-3.5 py-1.5 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#2D5A27] text-white flex items-center justify-center text-xs font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    {user.email}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    {user.isSuperAdmin ? 'Super Administrator' : 'Shop Staff'}
                  </div>
                </div>

                {user.isSuperAdmin && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    Super Admin
                  </span>
                )}
              </div>

              {/* Notification Icon */}
              <button className="p-2 rounded-xl text-gray-500 hover:text-[#2D5A27] hover:bg-[#EAF2EA] transition">
                <Bell className="w-5 h-5" />
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-quicksand font-bold text-sm flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#2D5A27] via-[#21431d] to-[#1E3F1B] text-white p-6 sm:p-8 overflow-hidden shadow-lg">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-[#80C34A] mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Authenticated Session Active
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold font-quicksand tracking-tight text-white">
              Welcome back, <span className="text-[#80C34A]">{user.email}</span>!
            </h1>
            <p className="mt-2 text-sm text-[#D1E6CE] font-nunito leading-relaxed">
              Manage your fresh organic produce inventory, monitor customer orders, and streamline daily shop operations from your central dashboard.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-medium bg-black/20 px-3 py-1.5 rounded-lg text-gray-200">
                <User className="w-4 h-4 text-[#80C34A]" />
                User ID: <span className="font-mono text-white">{user.id}</span>
              </div>
              
              {user.isSuperAdmin ? (
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Super Admin Privileges Granted
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 text-gray-300">
                  Standard Admin Privileges
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2EAE1] shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Store Status</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Store className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-quicksand text-gray-900">Online</div>
              <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Accepting Orders
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2EAE1] shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Produce Inventory</span>
              <div className="p-2.5 rounded-xl bg-lime-50 text-[#2D5A27]">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-quicksand text-gray-900">128 Items</div>
              <div className="text-xs text-gray-500 font-medium mt-1">
                100% Certified Organic
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2EAE1] shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Daily Orders</span>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-quicksand text-gray-900">42 Delivery Tasks</div>
              <div className="text-xs text-blue-600 font-medium mt-1">
                Avg. Delivery: 24 mins
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2EAE1] shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Shop Health</span>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-quicksand text-gray-900">99.4%</div>
              <div className="text-xs text-purple-600 font-medium mt-1">
                Customer Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* System & Access Info */}
        <div className="bg-white rounded-2xl border border-[#E2EAE1] p-6 shadow-xs">
          <h2 className="text-lg font-bold font-quicksand text-[#2D5A27] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#80C34A]" />
            Session Security & Account Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-nunito">
            <div className="p-4 rounded-xl bg-[#F9FBF9] border border-[#E2EAE1]">
              <div className="text-xs font-semibold text-gray-500">Authentication Strategy</div>
              <div className="font-bold text-gray-800 mt-1">JWT in HTTP-Only Cookie</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F9FBF9] border border-[#E2EAE1]">
              <div className="text-xs font-semibold text-gray-500">Database Table</div>
              <div className="font-bold text-gray-800 mt-1 font-mono text-xs bg-gray-200 px-2 py-0.5 rounded inline-block">
                shop_user (MySQL)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F9FBF9] border border-[#E2EAE1]">
              <div className="text-xs font-semibold text-gray-500">Role Status</div>
              <div className="font-bold text-[#2D5A27] mt-1 flex items-center gap-1.5">
                {user.isSuperAdmin ? (
                  <span className="text-amber-700 font-bold">Super Admin (Full Access)</span>
                ) : (
                  <span>Shop Manager</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

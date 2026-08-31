"use client";

import React from "react";
import { Smartphone, ShieldCheck, MapPin, RefreshCw, Star, Download, QrCode } from "lucide-react";

export default function AppShowcase() {
  const appFeatures = [
    {
      icon: MapPin,
      title: "Real-Time Farm-to-Door GPS",
      desc: "Track your delivery driver from the local organic farm directly to your doorstep in real-time.",
    },
    {
      icon: RefreshCw,
      title: "1-Click Subscription Baskets",
      desc: "Customize your weekly fruit & veggie basket once, and receive automatic fresh delivery on your chosen days.",
    },
    {
      icon: ShieldCheck,
      title: "Batch Quality Certificate",
      desc: "Scan your delivery QR to view farm origin, harvest time, and pesticide-free purity report.",
    },
    {
      icon: Star,
      title: "No-Questions-Asked Instant Credit",
      desc: "If any item doesn't meet your freshness expectations, get 100% instant credit with a single tap.",
    },
  ];

  return (
    <section id="mobile-app" className="py-16 md:py-24 bg-gradient-to-b from-[#2D5A27] to-[#1E3E1A] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#80C34A]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left App Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#80C34A]/20 border border-[#80C34A]/40 text-[#80C34A] text-xs font-bold uppercase tracking-wider mb-4">
                <Smartphone className="w-4 h-4" />
                <span>Grace Fresh Mobile App</span>
              </div>
              <h2 className="font-quicksand font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Shopping Fresh Produce Has Never Been This Simple
              </h2>
              <p className="font-nunito text-emerald-100/90 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
                Designed for health-conscious families. Order farm-fresh organic produce in under 60 seconds with our top-rated iOS and Android application.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {appFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#80C34A] text-[#1E2922] flex items-center justify-center font-bold mb-3 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-quicksand font-bold text-lg text-white">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 font-nunito mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* App Store Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="bg-black text-white hover:bg-black/80 px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3 transition-all cursor-pointer"
              >
                <div className="text-2xl"></div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">Download on the</div>
                  <div className="text-sm font-bold font-quicksand leading-none">App Store</div>
                </div>
              </button>

              <button
                type="button"
                className="bg-black text-white hover:bg-black/80 px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3 transition-all cursor-pointer"
              >
                <div className="text-xl">▶</div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">GET IT ON</div>
                  <div className="text-sm font-bold font-quicksand leading-none">Google Play</div>
                </div>
              </button>

              <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/15">
                <QrCode className="w-7 h-7 text-[#80C34A]" />
                <div className="text-xs text-emerald-100">
                  <div className="font-bold text-white">Scan QR Code</div>
                  <div>To Download</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Mobile Phone UI Mockup Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] bg-black rounded-[45px] p-4 shadow-2xl border-4 border-emerald-950/80 ring-1 ring-white/20">
              
              {/* Phone Speaker Notch */}
              <div className="w-32 h-5 bg-black rounded-b-2xl mx-auto mb-3 flex items-center justify-center">
                <div className="w-10 h-1 bg-gray-800 rounded-full" />
              </div>

              {/* Phone Screen Mockup */}
              <div className="bg-[#F9FBF9] text-[#1E2922] rounded-[32px] overflow-hidden p-4 space-y-4">
                
                {/* Header App Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Deliver to Home</div>
                    <div className="text-xs font-bold text-[#2D5A27] flex items-center gap-1">
                      <span>📍 Green Park, Block B</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#80C34A]/30 text-[#2D5A27] flex items-center justify-center font-bold text-xs">
                    🌱
                  </div>
                </div>

                {/* App Promo Banner */}
                <div className="bg-gradient-to-r from-[#2D5A27] to-[#80C34A] text-white p-3 rounded-2xl shadow-xs">
                  <span className="bg-white/20 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    First Order 20% OFF
                  </span>
                  <div className="font-quicksand font-bold text-sm mt-1">
                    Organic Strawberry Festival 🍓
                  </div>
                  <div className="text-[10px] text-emerald-100">Use code: FRESH20</div>
                </div>

                {/* Mini Categories Row */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-base">🍎</div>
                    <div className="truncate">Fruits</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-base">🥦</div>
                    <div className="truncate">Veggies</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-base">🍹</div>
                    <div className="truncate">Juices</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-base">📦</div>
                    <div className="truncate">Boxes</div>
                  </div>
                </div>

                {/* Simulated Product Items */}
                <div className="space-y-2">
                  <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=100&q=80"
                        alt="Avocado"
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-gray-800">Organic Avocado</div>
                        <div className="text-[10px] text-emerald-700 font-bold">$3.99 / 2pcs</div>
                      </div>
                    </div>
                    <div className="bg-[#2D5A27] text-white text-xs px-2.5 py-1 rounded-full font-bold">
                      + Add
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=100&q=80"
                        alt="Apple"
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-gray-800">Honeycrisp Apples</div>
                        <div className="text-[10px] text-emerald-700 font-bold">$4.49 / lb</div>
                      </div>
                    </div>
                    <div className="bg-[#2D5A27] text-white text-xs px-2.5 py-1 rounded-full font-bold">
                      + Add
                    </div>
                  </div>
                </div>

                {/* Bottom App Nav */}
                <div className="pt-2 flex justify-around text-gray-400 text-[10px] border-t border-gray-100">
                  <div className="text-[#2D5A27] font-bold flex flex-col items-center">
                    <span>🏠</span>
                    <span>Home</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>🔍</span>
                    <span>Search</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>🛍️</span>
                    <span>Basket</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>👤</span>
                    <span>Account</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

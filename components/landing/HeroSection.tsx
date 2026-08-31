"use client";

import React from "react";
import { Sparkles, ShieldCheck, Clock, Star, Download, ArrowRight, Apple, HeartHandshake, Truck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#F9FBF9] via-[#F3F8F2] to-[#F9FBF9]">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#80C34A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#2D5A27]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#80C34A]/15 border border-[#80C34A]/30 text-[#2D5A27] text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#80C34A]" />
              <span>🌱 100% Certified Organic & Farm Fresh Daily</span>
            </div>

            {/* Headline in Quicksand font */}
            <h1 className="font-quicksand font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1E2922] leading-[1.15] tracking-tight">
              Farm-Fresh <span className="text-[#2D5A27] underline decoration-[#80C34A] decoration-wavy decoration-2">Fruits & Veggies</span> Delivered in 30 Minutes
            </h1>

            {/* Subtitle in Nunito Sans font */}
            <p className="font-nunito text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Order crisp apples, organic leafy greens, exotic berries, and cold-pressed juices directly from verified local farms to your kitchen counter with zero compromise on quality.
            </p>

            {/* CTA Buttons matching design button styles */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#mobile-app"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#2D5A27] text-white px-8 py-4 rounded-full font-quicksand font-bold text-base hover:bg-[#21431d] shadow-lg shadow-[#2D5A27]/25 transition-all hover:scale-[1.02]"
              >
                <Download className="w-5 h-5 text-[#80C34A]" />
                <span>Download App Now</span>
              </a>

              <a
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#2D5A27] border-2 border-[#2D5A27] px-7 py-3.5 rounded-full font-quicksand font-semibold text-base hover:bg-[#2D5A27]/5 transition-all"
              >
                <span>Browse Categories</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Metrics Pill Bar */}
            <div className="pt-6 border-t border-[#E2EAE1] grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-[#2D5A27] font-bold text-xl sm:text-2xl font-quicksand">
                  <span>30</span>
                  <span className="text-[#80C34A]">Mins</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">Express Delivery</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-[#2D5A27] font-bold text-xl sm:text-2xl font-quicksand">
                  <span>500+</span>
                  <span className="text-[#80C34A]">Items</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">Organic Products</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card & Floating Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Card Wrapper */}
              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E2EAE1] shadow-xl shadow-[#2D5A27]/10">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#2D5A27]/10 to-[#80C34A]/20 p-2">
                  <img
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh organic fruits and vegetables"
                    className="w-full h-[340px] sm:h-[400px] object-cover rounded-xl shadow-inner"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-[#80C34A] text-[#1E2922] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Daily Harvest
                    </span>
                    <h3 className="font-quicksand font-bold text-lg text-white mt-1">
                      Crisp, Farm-Fresh Basket
                    </h3>
                  </div>
                </div>

                {/* Sub Features Grid in Card */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-[#F9FBF9] p-3 rounded-xl border border-[#E2EAE1] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E2922]">Zero Chemicals</div>
                      <div className="text-[11px] text-gray-500">100% Organic</div>
                    </div>
                  </div>

                  <div className="bg-[#F9FBF9] p-3 rounded-xl border border-[#E2EAE1] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#6D4C41]/10 flex items-center justify-center text-[#6D4C41]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E2922]">Cold Chain</div>
                      <div className="text-[11px] text-gray-500">Fresh Lock Tech</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Pill Badge 1 Top Left */}
              <div className="absolute -top-4 -left-4 bg-white border border-[#E2EAE1] p-3 rounded-2xl shadow-lg flex items-center gap-3 hidden sm:flex animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-[#80C34A] flex items-center justify-center text-[#1E2922] font-bold">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E2922]">Express Delivery</div>
                  <div className="text-[11px] text-[#2D5A27] font-semibold">Under 30 Minutes</div>
                </div>
              </div>

              {/* Floating Pill Badge 2 Bottom Right */}
              <div className="absolute -bottom-5 -right-4 bg-[#2D5A27] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex">
                <div className="w-9 h-9 rounded-full bg-[#80C34A] flex items-center justify-center text-[#2D5A27]">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold font-quicksand">Direct Farm Order</div>
                  <div className="text-[11px] text-[#80C34A]">No Middlemen</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

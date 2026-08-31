"use client";

import React from "react";
import { Leaf, Search, ShoppingBag, Smartphone, ArrowRight, Store } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F9FBF9]/90 backdrop-blur-md border-b border-[#E2EAE1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md shadow-[#2D5A27]/20 overflow-hidden border border-[#E2EAE1]">
              <img src="/logo.png" alt="Grace Fresh Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <span className="font-quicksand font-bold text-2xl text-[#2D5A27] tracking-tight block leading-none">
                Grace Fresh
              </span>
              <span className="text-[11px] font-semibold text-[#6D4C41] tracking-wider uppercase">
                Organic Market
              </span>
            </div>
          </div>

          {/* Search bar mockup matching the design UI in Stitch */}
          <div className="hidden md:flex items-center flex-1 max-w-[240px] xl:max-w-[280px] mx-4 xl:mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                readOnly
                placeholder="Search fresh fruits, vegetables..."
                className="w-full bg-white border border-[#E2EAE1] rounded-full py-2 pl-10 pr-4 text-xs xl:text-sm text-gray-700 focus:outline-none shadow-xs cursor-default placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 font-medium text-sm text-[#1E2922] mr-6 xl:mr-8">
            <a href="#features" className="hover:text-[#2D5A27] transition-colors whitespace-nowrap">
              Why Us
            </a>
            <a href="#categories" className="hover:text-[#2D5A27] transition-colors whitespace-nowrap">
              Categories
            </a>
            <a href="#mobile-app" className="hover:text-[#2D5A27] transition-colors whitespace-nowrap">
              Mobile App
            </a>
            <a href="#how-it-works" className="hover:text-[#2D5A27] transition-colors whitespace-nowrap">
              How It Works
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#80C34A] hover:bg-[#72B041] text-[#1E2922] px-4 py-2 rounded-full text-sm font-bold font-quicksand transition-all shadow-sm hover:shadow-md group whitespace-nowrap"
            >
              <Store className="w-4 h-4 text-[#1E2922]" />
              <span>Go to Shop</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="#mobile-app"
              className="hidden sm:inline-flex items-center gap-2 bg-[#2D5A27] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#21431d] transition-all shadow-md shadow-[#2D5A27]/20 group whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4 text-[#80C34A]" />
              <span>Get App</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}

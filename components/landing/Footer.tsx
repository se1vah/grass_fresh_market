"use client";

import React from "react";
import { Leaf, Mail, Send, Heart, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E2922] text-white pt-16 pb-8 border-t-4 border-[#80C34A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-white/20 p-1">
                <img src="/logo.png" alt="Grace Fresh Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-quicksand font-bold text-2xl text-white tracking-tight">
                Grace Fresh Market
              </span>
            </div>

            <p className="font-nunito text-gray-300 text-sm leading-relaxed max-w-sm">
              Delivering 100% certified organic fruits, crisp vegetables, and cold-pressed juices from local pesticide-free farms directly to your doorstep in 30 minutes.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5 text-[#80C34A]">
                <Shield className="w-4 h-4" />
                <span>100% Certified Organic</span>
              </div>
              <span>•</span>
              <div>24/7 Freshness Guarantee</div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-quicksand font-bold text-base text-[#80C34A] mb-4 uppercase tracking-wider">
              Explore Market
            </h4>
            <ul className="space-y-2.5 font-nunito text-sm text-gray-300">
              <li><a href="#features" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Product Categories</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#mobile-app" className="hover:text-white transition-colors">Download App</a></li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div>
            <h4 className="font-quicksand font-bold text-base text-[#80C34A] mb-4 uppercase tracking-wider">
              Fresh Categories
            </h4>
            <ul className="space-y-2.5 font-nunito text-sm text-gray-300">
              <li><a href="#categories" className="hover:text-white transition-colors">Organic Fruits</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Crisp Veggies</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Microgreens & Herbs</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Cold-Pressed Juices</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Weekly Boxes</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-nunito">
          <div>
            © {new Date().getFullYear()} Grace Fresh Market App. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Harvested with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for healthy living</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

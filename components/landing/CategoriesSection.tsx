"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Organic Fruits",
      count: "85+ Items",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
      tag: "Fresh Harvest",
      color: "border-[#80C34A]",
    },
    {
      name: "Crisp Farm Veggies",
      count: "120+ Items",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      tag: "Zero Pesticide",
      color: "border-[#2D5A27]",
    },
    {
      name: "Microgreens & Herbs",
      count: "40+ Items",
      image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80",
      tag: "Hydroponic",
      color: "border-[#6D4C41]",
    },
    {
      name: "Cold-Pressed Juices",
      count: "25+ Varieties",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
      tag: "100% Raw Juice",
      color: "border-[#80C34A]",
    },
    {
      name: "Organic Weekly Boxes",
      count: "Custom Subscription",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      tag: "Best Value",
      color: "border-[#2D5A27]",
    },
    {
      name: "Farm Eggs & Dairy",
      count: "30+ Fresh Items",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
      tag: "Grass-Fed",
      color: "border-[#6D4C41]",
    },
  ];

  return (
    <section id="categories" className="py-16 md:py-24 bg-[#F9FBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] font-semibold text-xs uppercase tracking-widest mb-3">
            Pure & Natural Selection
          </div>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl text-[#1E2922]">
            Explore Fresh Categories
          </h2>
          <p className="font-nunito text-gray-600 mt-3 text-base">
            From daily kitchen essentials to rare organic superfoods, browse products directly sourced from verified organic growers.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden bg-white border border-[#E2EAE1] hover:border-[#80C34A] transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
            >
              <div className="h-56 relative overflow-hidden bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Tag Pill */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#2D5A27] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {cat.tag}
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#2D5A27] flex items-center justify-center group-hover:bg-[#80C34A] group-hover:text-[#1E2922] transition-colors shadow-xs">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-[#80C34A] uppercase tracking-wider block">
                    {cat.count}
                  </span>
                  <h3 className="font-quicksand font-bold text-xl text-white mt-0.5">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

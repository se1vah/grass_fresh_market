"use client";

import React from "react";
import { Search, PackageCheck, Bike, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Browse Daily Harvest",
      desc: "Choose from hundreds of 100% organic fruits, crisp veggies, and cold-pressed juices updated daily on our app.",
      badge: "Pick Your Favorites",
    },
    {
      number: "02",
      icon: PackageCheck,
      title: "Hand-Inspected & Sealed",
      desc: "Our certified agronomists inspect every piece of produce for ripeness, packing them in eco-friendly tote boxes.",
      badge: "Quality Guaranteed",
    },
    {
      number: "03",
      icon: Bike,
      title: "Superfast 30-Min Express",
      desc: "Our eco-friendly electric delivery team delivers your fresh box right to your doorstep, fresh and crisp.",
      badge: "Straight To Your Kitchen",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#F9FBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#80C34A]/20 text-[#2D5A27] font-semibold text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl text-[#1E2922]">
            How Grace Fresh Market Works
          </h2>
          <p className="font-nunito text-gray-600 mt-3 text-base">
            We bridge the gap between organic local farms and your kitchen table in 3 seamless steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-[#E2EAE1] hover:border-[#80C34A] transition-all hover:shadow-xl relative flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#2D5A27] text-[#80C34A] flex items-center justify-center font-quicksand font-bold text-xl shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-quicksand font-extrabold text-4xl text-[#E2EAE1] group-hover:text-[#80C34A]/40 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block bg-[#F9FBF9] text-[#6D4C41] text-xs font-bold px-3 py-1 rounded-full mb-3 border border-[#E2EAE1]">
                    {step.badge}
                  </span>

                  <h3 className="font-quicksand font-bold text-2xl text-[#1E2922] mb-3 group-hover:text-[#2D5A27] transition-colors">
                    {step.title}
                  </h3>

                  <p className="font-nunito text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2EAE1] flex items-center justify-between text-xs text-[#2D5A27] font-semibold">
                  <span>Farm to Table Journey</span>
                  <span>✓ Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

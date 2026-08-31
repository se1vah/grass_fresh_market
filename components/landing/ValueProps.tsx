"use client";

import React from "react";
import { Sprout, CheckCircle2, ThermometerSnowflake, DollarSign } from "lucide-react";

export default function ValueProps() {
  const valueProps = [
    {
      icon: Sprout,
      color: "bg-[#2D5A27]",
      iconColor: "text-[#80C34A]",
      title: "Direct Farm Sourcing",
      description: "Produce harvested at peak dawn freshness from verified local pesticide-free farms.",
    },
    {
      icon: CheckCircle2,
      color: "bg-[#80C34A]",
      iconColor: "text-[#2D5A27]",
      title: "Hand-Inspected Quality",
      description: "Every fruit and vegetable passes a strict 15-point freshness and purity check.",
    },
    {
      icon: ThermometerSnowflake,
      color: "bg-[#6D4C41]",
      iconColor: "text-[#F9FBF9]",
      title: "Eco Cold-Lock Pack",
      description: "Temperature-controlled eco-friendly totes preserve nutrient density during transit.",
    },
    {
      icon: DollarSign,
      color: "bg-[#2D5A27]",
      iconColor: "text-white",
      title: "Fair Farm Pricing",
      description: "Direct-from-farm pricing cuts middleman costs, delivering maximum savings to you.",
    },
  ];

  return (
    <section id="features" className="py-12 bg-white border-y border-[#E2EAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#F9FBF9] border border-[#E2EAE1] hover:border-[#80C34A] transition-all hover:shadow-md group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-quicksand font-bold text-lg text-[#1E2922] group-hover:text-[#2D5A27] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-nunito mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const brands = [
  { id: 1, name: "Walmart", logo: "/company/walmart.svg", bg: "/dev/p-1.jpeg" },
  { id: 2, name: "BOSS", logo: "/company/boss.svg", bg: "/dev/p-2.jpeg" },
  { id: 3, name: "Utah Jazz", logo: "/company/utah.svg", bg: "/dev/p-3.jpeg" },
  { id: 4, name: "Vogue", logo: "/company/vogue.svg", bg: "/dev/p-4.jpeg" },
  { id: 5, name: "McDonalds", logo: "/company/mcdonalds.svg", bg: "/dev/p-5.jpeg" },
  { id: 6, name: "Elle", logo: "/company/elle.svg", bg: "/imgs/img-1.png" },
  { id: 7, name: "GameStop", logo: "/company/gamestop.svg", bg: "/imgs/img-2.png" },
  { id: 8, name: "Givenchy", logo: "/company/givenchy.svg", bg: "/imgs/img-3.png" },
  { id: 9, name: "Hublot", logo: "/company/hublot.svg", bg: "/imgs/img-4.jpeg" },
];

const coltBrand = { id: 10, name: "COLT", logo: "", bg: "/dev/p-3.jpeg" };

const BrandShowcase = () => {
  const [activeBrand, setActiveBrand] = useState(brands[0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* Background Layer */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeBrand.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeBrand.bg}
            alt={activeBrand.name}
            fill
            className="object-cover opacity-40 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mb-12 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400"
          >
            Explore & play in games & immersive worlds
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold leading-tight md:text-7xl"
          >
            Discover Brands <br />
            Building On spatial.io
          </motion.h2>
        </div>

        {/* Brands Grid */}
        <div className="grid w-full max-w-6xl grid-cols-2 md:grid-cols-5 border-t border-l border-white/10">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              onMouseEnter={() => setActiveBrand(brand)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative flex aspect-[16/9] cursor-pointer items-center justify-center border-r border-b border-white/10 bg-black/20 backdrop-blur-sm transition-all hover:bg-white/10 ${
                activeBrand.id === brand.id ? "bg-white/20" : ""
              }`}
            >
              <span className="text-xl font-bold tracking-wider text-white/80 group-hover:text-white">
                {brand.name}
              </span>
              
              {/* Active Indicator */}
              {activeBrand.id === brand.id && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute bottom-4 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                />
              )}
            </motion.div>
          ))}
           {/* Empty/Placeholder Grid Item to complete the layout if needed, or mostly just leave it as dynamic */}
           <div 
             onMouseEnter={() => setActiveBrand(coltBrand)}
             className={`hidden md:flex aspect-[16/9] border-r border-b border-white/10 bg-black/20 backdrop-blur-sm items-center justify-center cursor-pointer transition-all hover:bg-white/10 ${
                activeBrand.id === coltBrand.id ? "bg-white/20" : ""
             }`}
           >
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center relative">
                    <span className="text-white font-bold text-sm z-10">COLT</span>
                </div>
                {activeBrand.id === coltBrand.id && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute bottom-4 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                    />
                )}
           </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

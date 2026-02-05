"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CoreValues = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const getCardStyle = (index: number) => {
    const total = services.length;
    // Calculate distance from active index, handling wrap-around
    let offset = (index - activeIndex + total) % total;
    if (offset > total / 2) offset -= total;

    // We want to emphasize the right side as per user request
    // "ek card front... uske ek right side mein ek background circle form mein"
    
    // Core parameters for the "Circle"
    const radius = 400; // Distance from center
    const rotationAngle = 45; // Degrees to rotate each step
    
    // Determine visibility and transform based on offset
    // 0 = Center
    // 1 = Immediate Right
    // 2 = Far Right
    // -1 = Immediate Left (keep it visible for balance/animation context, or hide if strictly "right side")
    
    // We'll show: Center, Right 1, Right 2. 
    // Maybe Left 1 just for smooth entry/exit.
    
    const isActive = offset === 0;
    const isRight = offset > 0;
    const isLeft = offset < 0;
    
    // Calculate 3D Transform
    // x: position horizontally
    // z: depth (negative moves back)
    // rotateY: facing angle
    
    const theta = offset * (Math.PI / 6); // 30 degrees per item in radians for position
    const x = Math.sin(theta) * radius * 1.2; // Spread out horizontally
    const z = (Math.cos(theta) * radius) - radius; // Circular arc depth
    const rotateY = -offset * 25; // Rotate to face somewhat towards center/viewer
    
    let opacity = 1;
    let scale = 1;
    let zIndex = 10 - Math.abs(offset);
    
    if (isActive) {
        scale = 1;
        opacity = 1;
    } else {
        scale = 0.8;
        opacity = Math.max(0, 1 - Math.abs(offset) * 0.3); // Fade out further items
    }

    // Hide items that are too far back to reduce clutter
    if (Math.abs(offset) > 2) opacity = 0;

    return {
        x,
        z,
        rotateY,
        scale,
        opacity,
        zIndex,
        isActive
    };
  };

  return (
    <section className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 relative perspective-1000">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black pointer-events-none" />

      <div className="relative z-10 text-center mb-16 px-4">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Our Services
        </h2>
        <p className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">
          Explore What We Offer
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center perspective-[1200px]">
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
            {services.map((service, index) => {
                const { x, z, rotateY, scale, opacity, zIndex, isActive } = getCardStyle(index);

                // Only render visible cards to keep DOM light? 
                // Or just use opacity. CSS transitions handle it better if present.
                
                return (
                    <motion.div
                        key={service.id}
                        className="absolute top-1/2 left-1/2 w-[350px] md:w-[450px] h-[550px] -ml-[175px] md:-ml-[225px] -mt-[275px]"
                        initial={false}
                        animate={{
                            x,
                            z,
                            rotateY,
                            scale,
                            opacity,
                            zIndex
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 20,
                            mass: 1
                        }}
                        style={{
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {/* Card Content */}
                        <div 
                            className={`w-full h-full rounded-[2rem] p-8 md:p-10 flex flex-col justify-between transition-all duration-500 border ${
                                isActive 
                                    ? "bg-neutral-900 border-white/20 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]" 
                                    : "bg-neutral-950 border-white/5 shadow-xl brightness-50 grayscale-[50%]"
                            }`}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <span className={`text-6xl font-black ${isActive ? "text-white/20" : "text-white/5"}`}>
                                    0{service.id}
                                </span>
                                {isActive && (
                                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center animate-pulse">
                                        <ArrowRight size={20} className="-rotate-45" />
                                    </div>
                                )}
                            </div>

                            {/* Body */}
                            <div>
                                <h3 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${isActive ? "text-white" : "text-gray-400"}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-sm md:text-base leading-relaxed ${isActive ? "text-gray-400" : "text-gray-600"}`}>
                                    {service.description}
                                </p>
                            </div>

                            {/* Action */}
                            {isActive ? (
                                <Button 
                                    href={`/services/${service.id}`} 
                                    variant="primary" 
                                    className="w-full justify-between rounded-xl"
                                >
                                    View Details
                                </Button>
                            ) : (
                                <div className="w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center bg-white/5 text-gray-500 cursor-not-allowed border border-transparent">
                                    Locked
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>

        {/* Navigation Buttons (Left/Right of Center Card) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[700px] flex justify-between z-50 pointer-events-none">
            <button
                onClick={prevSlide}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 group"
                aria-label="Previous Service"
            >
                <ChevronLeft size={32} className="mr-1" />
            </button>

            <button
                onClick={nextSlide}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 group"
                aria-label="Next Service"
            >
                <ChevronRight size={32} className="ml-1" />
            </button>
        </div>
      </div>

      <div className="mt-10 flex gap-2">
        {services.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "bg-white w-8" : "bg-white/20 hover:bg-white/50"
                }`}
            />
        ))}
      </div>
    </section>
  );
};

export default CoreValues;

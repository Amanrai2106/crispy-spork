"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const images = [
  "/imgs/img-1.png",
  "/imgs/img-2.png",
  "/imgs/img-3.png",
  "/imgs/img-4.jpeg",
  "/imgs/img-5.jpeg",
  "/imgs/img-6.jpeg",
  "/imgs/img-7.png",
];

const slides = [
  {
    title: "ARCHITECTURAL",
    subtitle: "From Experiential Design to wayfinding"
  },
  {
    title: "GRAPHIC",
    subtitle: "We design meaningful connections"
  },
  {
    title: "DESIGN",
    subtitle: "Bold Ideas. Clean Design."
  }
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageIndex = useRef(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // mouse trail effect
  useEffect(() => {
    if (!containerRef.current) return;

    let lastX = 0,
      lastY = 0;
    const threshold = 120;

    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      const offsetX = rect ? rect.left : 0;
      const offsetY = rect ? rect.top : 0;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance < threshold) return;

      const dirX = dx / distance || 0;
      const dirY = dy / distance || 0;

      lastX = e.clientX;
      lastY = e.clientY;

      const rotation = dirX > 0 ? 12 : -12;
      const src = images[imageIndex.current % images.length];
      imageIndex.current++;

      const img = document.createElement("img");
      img.src = src;

      Object.assign(img.style, {
        position: "absolute",
        left: `${e.clientX - offsetX}px`,
        top: `${e.clientY - offsetY}px`,
        width: "280px",
        height: "auto",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        opacity: "0",
        objectFit: "cover",
        willChange: "transform, opacity",
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
      });

      containerRef.current?.appendChild(img);

      gsap.fromTo(
        img,
        {
          scale: 0.6,
          opacity: 0,
          borderRadius: "50%",
          x: `-=${dirX * 80}`,
          y: `-=${dirY * 80}`,
        },
        {
          scale: 1,
          opacity: 1,
          borderRadius: 0,
          duration: 1.4,
          rotate: rotation,
          ease: "power3.out",
          x: `+=${dirX * 180}`,
          y: `+=${dirY * 180}`,
        }
      );

      gsap.to(img, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        onComplete: () => img.remove(),
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative z-10 h-screen text-white overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Rotating Content - Bottom Left */}
      <div className="absolute bottom-20 left-8 md:left-20 z-20 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-aboreto font-bold leading-none tracking-tighter">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light max-w-2xl">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-8">
          <Button href="/selected-projects" variant="outline" className="px-8 py-3">
            View Project
          </Button>
          <Button href="/contact" variant="primary" className="px-8 py-3">
            Have a Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

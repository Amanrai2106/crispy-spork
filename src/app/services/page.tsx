'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-3xl bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between group cursor-pointer hover:border-orange-500/50 transition-colors duration-500"
      >
        {/* Hover Gradient Effect */}
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 165, 0, 0.1),
                transparent 80%
              )
            `,
          }}
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm font-mono text-orange-500/80 border border-orange-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
              0{service.id}
            </span>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500 transition-colors duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          <h3 
            className="text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            {service.title}
          </h3>
          
          <p 
            className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base"
            style={{ transform: "translateZ(10px)" }}
          >
            {service.description}
          </p>

          <div 
            className="space-y-3 pt-6 border-t border-white/5"
            style={{ transform: "translateZ(5px)" }}
          >
            {service.details.map((detail: string, i: number) => (
              <div key={i} className="flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3" />
                {detail}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-orange-500/30">
      <Nav />
      
      <main className="pt-32 pb-20 px-6 md:px-12 w-full">
        <div className="mb-20 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-3xl">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">SERVICES</span>
              </motion.h1>
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                We craft immersive physical and digital experiences that elevate brands and connect with people in meaningful ways.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block"
            >
              <div className="w-32 h-32 rounded-full border border-orange-500/30 flex items-center justify-center animate-spin-slow">
                <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                  <ArrowUpRight className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={`/services/${service.id}`} key={service.id} className="block h-full">
              <ServiceCard service={service} index={index} />
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { use, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    notFound();
  }

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-white selection:bg-orange-500/30 overflow-x-hidden">
      <Nav />
      
      {/* Abstract Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-orange-500/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        <div className="w-full mx-auto px-6 md:px-12">
          
          {/* Hero Section */}
          <motion.div 
            className="min-h-[60vh] flex flex-col justify-center mb-20 border-b border-white/10 pb-20 relative"
            style={{ opacity }}
          >
            <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
                <div className="max-w-5xl">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
                        {service.title}
                      </h1>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed font-light"
                    >
                      {service.description}
                    </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                  className="hidden md:flex flex-col items-center gap-4"
                >
                    <div className="w-32 h-32 rounded-full border border-orange-500/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-t border-orange-500 animate-spin-slow" />
                        <span className="text-4xl font-bold font-mono text-orange-500">0{service.id}</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gray-500">Service ID</span>
                </motion.div>
            </div>
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Offerings */}
            <div className="lg:col-span-7">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold mb-12 text-orange-500 uppercase tracking-widest flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-orange-500"></span>
                Scope of Work
              </motion.h2>

              <div className="grid grid-cols-1 gap-4">
                {service.details.map((detail, index) => (
                  <DetailItem key={index} text={detail} index={index} />
                ))}
              </div>
            </div>

            {/* Right Column: Sticky CTA */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-neutral-900 to-black rounded-[2rem] p-10 border border-white/10 relative overflow-hidden group hover:border-orange-500/30 transition-colors duration-500"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-600/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-6">Ready to transform your space?</h3>
                        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                            Let&apos;s collaborate to bring the vision of {service.title.toLowerCase()} to life with precision and creativity.
                        </p>
                        
                        <div className="space-y-4">
                            <Button href={`/contact?category=Services&subcategory=${encodeURIComponent(service.title)}`} variant="primary" className="w-full justify-between group h-14 text-lg">
                                Start Project
                                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                            <p className="text-xs text-center text-gray-600 mt-4">
                                Free consultation • Custom solutions • Global delivery
                            </p>
                        </div>
                    </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function DetailItem({ text, index }: { text: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            className="group flex items-center justify-between p-6 border-b border-white/5 hover:border-orange-500/30 transition-all duration-300 rounded-lg cursor-default"
        >
            <div className="flex items-center gap-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
                    <CheckCircle2 size={16} />
                </span>
                <span className="text-xl md:text-2xl text-gray-300 group-hover:text-white transition-colors font-light">
                    {text}
                </span>
            </div>
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 text-orange-500 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0" />
        </motion.div>
    )
}

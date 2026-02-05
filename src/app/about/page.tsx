"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Target, Lightbulb } from "lucide-react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-black min-h-screen text-white overflow-hidden">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-50" />
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
          >
            We Craft Digital Experiences.
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-400 leading-relaxed"
          >
            A team of passionate creators, developers, and strategists dedicated to transforming ideas into impactful reality.
          </motion.p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between aesthetics and functionality, we started as a small collective of designers and developers. Over the years, we've grown into a full-service agency, but our core philosophy remains the same: <span className="text-white font-semibold">Quality over Quantity.</span>
              </p>
              <p>
                We believe that every brand has a unique story to tell. Our job is to tell that story through immersive design, cutting-edge technology, and strategic thinking. We don't just build websites; we build digital legacies.
              </p>
            </div>
            
            <div className="mt-10 flex gap-8">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white">50+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider mt-2">Projects Delivered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white">10+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider mt-2">Years Experience</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-900 relative border border-white/10 group">
               {/* Abstract visual representation instead of image if no image available */}
               <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-24 h-24 border border-white/40 rounded-full" />
                  </div>
               </div>
            </div>
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-10 -left-10 bg-neutral-900/90 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-2xl max-w-xs hidden md:block"
            >
              <p className="text-sm text-gray-300 italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
              <p className="text-xs text-gray-500 mt-2">— Steve Jobs</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide every decision we make.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-purple-500" />,
                title: "Precision",
                desc: "We pay attention to the smallest details because that's where excellence lives."
              },
              {
                icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
                title: "Innovation",
                desc: "We constantly explore new technologies to keep our clients ahead of the curve."
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Collaboration",
                desc: "We work with you, not just for you. Your success is our success."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-black border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-colors duration-300 group"
              >
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-8">Ready to start?</h2>
          <p className="text-xl text-gray-400 mb-10">Let's build something amazing together.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors group">
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;

'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
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

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
      }}
      className="h-[500px] w-full"
    >
      <Link href={`/projects/${project.id}`} className="block h-full w-full">
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 group cursor-pointer"
        >
          {/* Background Image with Parallax-like feel */}
          <div className="absolute inset-0 z-0">
             <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          </div>

          {/* Hover Glare Effect */}
          <motion.div
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  800px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.1),
                  transparent 80%
                )
              `,
            }}
            className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Content */}
          <div className="relative z-20 h-full p-8 flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
            <div className="flex justify-between items-start">
              <span className="text-sm font-mono text-white/60 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                0{index + 1}
              </span>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors duration-300"
              >
                <ArrowUpRight className="w-6 h-6" />
              </motion.div>
            </div>

            <div style={{ transform: "translateZ(30px)" }}>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {project.title}
              </h3>
              <p className="text-gray-300 text-lg max-w-md line-clamp-3 group-hover:text-white transition-colors duration-300">
                {project.description}
              </p>
              
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                View Project <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-orange-500/30">
      <Nav />
      
      <main className="pt-32 pb-20 px-6 md:px-12 w-full">
        <div className="mb-24 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-4xl">
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                SELECTED <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">WORKS</span>
              </motion.h1>
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed border-l-2 border-orange-500 pl-6">
                A showcase of our finest signage and branding projects, demonstrating our commitment to excellence and innovation.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-orange-500/30 animate-spin-reverse-slow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/5">06</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className={index % 2 === 1 ? "md:translate-y-24" : ""}>
               <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

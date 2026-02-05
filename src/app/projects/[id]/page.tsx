"use client";
import React, { use, useRef } from "react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="bg-black min-h-screen text-white selection:bg-white/30">
      <Nav />
      
      {/* Hero Section with Parallax */}
      <section className="relative w-full h-screen flex items-end pb-20 px-6 md:px-12 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-[0.9]">
                {project.title}
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed"
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Meta Data */}
      <section className="py-20 px-6 md:px-12 w-full mx-auto border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Client", value: "Confidential" },
            { label: "Location", value: "Mumbai, India" },
            { label: "Year", value: "2024" },
            { label: "Services", value: "Wayfinding, Design" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{item.label}</h3>
              <p className="text-xl md:text-2xl font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 md:px-12 w-full mx-auto">
        <div className="space-y-32">
            {/* Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">The Challenge</h2>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                        Every space tells a story, but sometimes that story gets lost in translation. 
                        The challenge for {project.title} was to create a cohesive visual language that 
                        respected the architectural integrity while providing clear, intuitive guidance for users.
                    </p>
                    <div className="h-px w-20 bg-white/30" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] rounded-2xl overflow-hidden"
                >
                     <Image
                        src={project.src}
                        alt="Challenge details"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-[1.5s] ease-out"
                      />
                </motion.div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] rounded-2xl overflow-hidden order-2 md:order-1"
                >
                     <Image
                        src={project.src}
                        alt="Solution details"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-[1.5s] ease-out"
                      />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">The Solution</h2>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                        Our approach focused on material integration and high-contrast legibility. 
                        We utilized materials that complemented the existing environment—brushed metals, 
                        matte finishes, and illuminated elements where necessary.
                    </p>
                    <div className="h-px w-20 bg-white/30" />
                </motion.div>
            </div>
        </div>
      </section>

      {/* Full Width Image Parallax */}
      <section className="relative w-full h-[80vh] overflow-hidden my-20">
         <motion.div 
            style={{ scale: useTransform(scrollYProgress, [0.4, 1], [1, 1.2]) }}
            className="absolute inset-0"
         >
             <Image
                src={project.src}
                alt="Full width view"
                fill
                className="object-cover brightness-75"
             />
         </motion.div>
         <div className="absolute inset-0 flex items-center justify-center">
             <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-bold text-center mix-blend-overlay"
             >
                 {project.title}
             </motion.h3>
         </div>
      </section>

      {/* Next/Prev Navigation */}
      <section className="py-20 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <Link href={`/projects/${prevProject.id}`} className="group flex items-center gap-4 text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
                <div className="text-right md:text-left">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">Previous Project</p>
                    <h4 className="text-2xl font-bold">{prevProject.title}</h4>
                </div>
            </Link>
            
            <div className="h-12 w-px bg-white/20 hidden md:block"></div>

            <Link href={`/projects/${nextProject.id}`} className="group flex items-center gap-4 text-gray-500 hover:text-white transition-colors text-right">
                <div className="text-left md:text-right">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">Next Project</p>
                    <h4 className="text-2xl font-bold">{nextProject.title}</h4>
                </div>
                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-[#0a0a0a]">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to start your project?</h2>
            <Button href={`/contact?category=Project&subcategory=${encodeURIComponent(project.title)}`} variant="primary" className="text-lg px-12 py-6">
                Get in Touch
            </Button>
        </motion.div>
      </section>
      
      <Footer hideContactCta={true} />
    </main>
  );
}

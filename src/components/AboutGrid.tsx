"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollRotateCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div style={{ perspective: "1000px" }} className="w-full">
      <motion.div
        ref={ref}
        style={{ rotateX, scale, opacity }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const TimeDisplay = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  return (
    <span suppressHydrationWarning>
      {time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </span>
  );
};

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time ? time.getSeconds() : 0;
  const minutes = time ? time.getMinutes() : 0;
  const hours = time ? time.getHours() : 0;

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gray-800 bg-[#0a0a0a] shadow-2xl overflow-hidden">
      {/* Clock Face Markers - Responsive */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
          >
             <div className="w-1 h-3 bg-gray-600 mx-auto mt-2" />
          </div>
        ))}
      </div>
      
      {/* Center Dot */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-md" />

      {/* Hands Container - ensures centering */}
      <div className="absolute inset-0 z-10" style={{ opacity: time ? 1 : 0, transition: 'opacity 0.2s' }}>
          {/* Hour Hand */}
          <div
            className="absolute w-1.5 bg-white rounded-full"
            style={{
              height: "25%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${(hours % 12) * 30 + minutes * 0.5}deg)`,
            }}
          />
          
          {/* Minute Hand */}
          <div
            className="absolute w-1 bg-gray-400 rounded-full"
            style={{
              height: "35%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${minutes * 6}deg)`,
            }}
          />
          
          {/* Second Hand */}
          <div
            className="absolute w-0.5 bg-orange-500 rounded-full"
            style={{
              height: "40%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${seconds * 6}deg)`,
            }}
          />
      </div>
    </div>
  );
};

const MapVisualization = React.memo(() => {
  // Optimized grid resolution for performance
  const rows = 45;
  const cols = 90;
  const width = 800;
  const height = 400;
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  // Memoize the dot generation to prevent recalculation on re-renders
  const dots = React.useMemo(() => {
    // Detailed world map approximation
    const continents = [
      // North America
      { x: 150, y: 100, r: 60 }, { x: 100, y: 80, r: 35 }, { x: 200, y: 60, r: 30 },
      { x: 80, y: 70, r: 25 }, { x: 180, y: 160, r: 20 },
      // South America
      { x: 240, y: 280, r: 50 }, { x: 220, y: 220, r: 40 }, { x: 250, y: 340, r: 20 },
      // Europe
      { x: 420, y: 90, r: 30 }, { x: 450, y: 70, r: 25 }, { x: 400, y: 70, r: 15 },
      { x: 430, y: 50, r: 15 }, { x: 390, y: 110, r: 10 },
      // Africa
      { x: 430, y: 200, r: 55 }, { x: 460, y: 260, r: 40 }, { x: 480, y: 180, r: 30 },
      { x: 390, y: 190, r: 25 }, { x: 500, y: 190, r: 20 },
      // Asia
      { x: 580, y: 100, r: 70 }, { x: 650, y: 90, r: 60 }, { x: 620, y: 160, r: 45 }, 
      { x: 700, y: 120, r: 35 }, { x: 520, y: 140, r: 25 }, { x: 660, y: 200, r: 30 },
      // Australia & NZ
      { x: 680, y: 300, r: 35 }, { x: 750, y: 320, r: 10 },
      // Greenland
      { x: 280, y: 40, r: 25 },
      // Japan
      { x: 740, y: 110, r: 12 },
      // UK
      { x: 390, y: 75, r: 10 },
      // Indonesia/Islands
      { x: 630, y: 240, r: 15 }, { x: 660, y: 240, r: 10 },
      // Antarctica (Abstract strip)
      { x: 400, y: 390, r: 100 }, { x: 200, y: 390, r: 60 }, { x: 600, y: 390, r: 80 }
    ];

    const isInLand = (x: number, y: number) => {
      return continents.some(land => {
        const dx = x - land.x;
        const dy = y - land.y;
        return dx * dx + dy * dy <= land.r * land.r;
      });
    };

    const generatedDots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellWidth + cellWidth / 2;
        const y = r * cellHeight + cellHeight / 2;
        
        // Use integer-based deterministic hashing for consistent cross-platform rendering
        // This prevents hydration mismatches caused by floating point differences
        const hash = (r * 53 + c * 101) * 137;
        const pseudoRandom = (hash % 1000) / 1000;
        
        // Less random dropout for a fuller map
        if (isInLand(x, y) && pseudoRandom > 0.15) {
          // Deterministic animation properties
          const animHash = (r * 127 + c * 31) * 73;
          const animationRandom = (animHash % 1000) / 1000;
          
          // Only animate 20% of dots to reduce layout thrashing
          const isAnimated = animationRandom > 0.8;
          
          generatedDots.push({ 
            x, 
            y, 
            isAnimated,
            delay: animationRandom * 3,
            duration: 2 + (animationRandom * 3)
          });
        }
      }
    }
    return generatedDots;
  }, []); // Empty dependency array means this only runs once

  return (
    <div className="relative w-full h-48 md:h-full opacity-60">
        <svg viewBox="0 0 800 400" className="w-full h-full">
            {dots.map((dot, i) => (
              <circle 
                key={i} 
                cx={dot.x} 
                cy={dot.y} 
                r={1.5} 
                className={`fill-orange-500/80 ${dot.isAnimated ? 'animate-pulse' : ''}`}
                style={dot.isAnimated ? { 
                  animationDelay: `${dot.delay.toFixed(2)}s`, 
                  animationDuration: `${dot.duration.toFixed(2)}s` 
                } : undefined}
                suppressHydrationWarning
              />
            ))}
            {/* Gradient Line connecting continents */}
             <path 
               d="M 150 100 Q 300 50 420 90 T 580 100 T 680 300" 
               fill="none" 
               stroke="url(#gradient-line)" 
               strokeWidth="1.5" 
               className="opacity-40"
             />
             <defs>
               <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="transparent" />
                 <stop offset="20%" stopColor="#f97316" />
                 <stop offset="80%" stopColor="#f97316" />
                 <stop offset="100%" stopColor="transparent" />
               </linearGradient>
             </defs>
        </svg>
    </div>
  );
});

const AboutGrid = () => {
  return (
    <section id="about-grid" className="bg-black text-white font-inter">
      <div className="w-full flex flex-col">
        <div className="flex flex-col w-full">
          {/* Card 2: About Us (Merged with Profile) */}
          <ScrollRotateCard
            className="w-full min-h-screen flex flex-col bg-[#0a0a0a] p-8 md:p-20 border-b border-white/5"
          >
            {/* Merged Profile Header */}
             <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-20 border-b border-white/5 pb-10">
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 font-aboreto text-white">Signsol Design</h2>
                  <p className="text-gray-400 text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    THANE, IN • <TimeDisplay />
                  </p>
                </div>
                <div className="flex gap-6 mt-8 md:mt-0">
                  <div className="p-4 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                    <MailIcon />
                  </div>
                  <div className="p-4 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                    <GithubIcon />
                  </div>
                  <div className="p-4 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                    <XIcon />
                  </div>
                </div>
             </div>

            <div className="w-full flex flex-col justify-center flex-grow">
              <h3 className="text-5xl md:text-8xl font-bold mb-12">
                About <span className="text-gray-500 italic font-serif">Us.</span>
              </h3>
              <p className="text-gray-400 mb-12 leading-relaxed text-xl md:text-3xl max-w-none">
                Welcome to <strong className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Signsol Design</strong>, your premier destination for highly creative and professional signage design solutions. We collaborate with top <span className="text-white italic font-serif">architectural companies</span> pan India and specialize in providing turn-key solutions for all your exterior and interior signage strategy and designing needs.
              </p>
              <p className="text-gray-400 mb-16 leading-relaxed text-xl md:text-3xl max-w-none">
                 Our highly qualified and experienced team of visualizers, designers, and craftsmen are dedicated to creating <strong className="text-orange-400 font-serif italic">artistic yet functional designs</strong>. We excel in adapting our sign systems to perfectly match the &apos;look and feel&apos; of our client&apos;s brands.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Wayfinding", "Signage Strategy", "Experiential Design", "Turn-key Solutions", "Pan India", "Brand Adaptation"].map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="px-8 py-3 bg-white/5 rounded-full text-lg text-gray-300 border border-white/5 hover:border-white/20 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </ScrollRotateCard>
        </div>

        {/* Card 3: Design Philosophy */}
        <ScrollRotateCard
          className="w-full min-h-screen bg-[#0f0f0f] p-8 md:p-20 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden"
        >
          <div className="flex-1 z-10 w-full">
            <p className="text-base font-bold text-gray-500 mb-6 uppercase tracking-widest">
              Our Approach
            </p>
            <h3 className="text-6xl md:text-9xl font-bold mb-12 leading-tight">
              Meaningful <span className="text-orange-500 italic font-serif">connections.</span>
            </h3>
            <p className="text-gray-400 mb-12 w-full text-xl md:text-3xl">
              From Experiential Design to wayfinding, we design meaningful connections between people and places.
            </p>
            <ul className="space-y-6 text-gray-400 text-xl md:text-2xl">
              <li className="flex items-center gap-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                Turn-key Solutions
              </li>
              <li className="flex items-center gap-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                System Production Efficiency
              </li>
              <li className="flex items-center gap-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                Brand-Aligned Aesthetics
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center items-center scale-150 md:scale-[2.5]">
             <Clock />
          </div>
        </ScrollRotateCard>

        {/* Card 4: Pan India Presence */}
        <ScrollRotateCard
          className="w-full min-h-screen bg-[#0a0a0a] p-8 md:p-20 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden"
        >
          <div className="flex-1 z-10 w-full">
             <p className="text-base font-bold text-gray-500 mb-6 uppercase tracking-widest">
              Service Reach
            </p>
            <h3 className="text-6xl md:text-9xl font-bold mb-10 leading-tight">
              Collaborating with <br />
              <span className="text-gray-500">top architects</span>
            </h3>
            <p className="text-gray-400 mb-12 w-full text-xl md:text-3xl">
              We provide turn-key signage solutions for projects <u className="text-white decoration-gray-600">pan India</u>. From strategy to installation, we ensure your vision is executed flawlessly across any location.
            </p>
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-orange-900/20 text-orange-400 rounded-full border border-orange-900/50 text-lg font-medium">
               <span className="w-6 h-6 rounded-full border border-orange-400/50 flex items-center justify-center">
                   <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
               </span>
               Nationwide Service
            </div>
          </div>
          <div className="flex-1 w-full h-full absolute right-0 top-0 md:relative md:w-auto md:h-auto opacity-20 md:opacity-100 pointer-events-none scale-125 md:scale-150 origin-right">
             <MapVisualization />
          </div>
        </ScrollRotateCard>
      </div>
    </section>
  );
};

export default AboutGrid;

"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

import { Button } from "@/components/ui/Button";

const Card = ({
  i,
  title,
  description,
  src,
  color,
  progress,
  range,
  targetScale,
  id,
}: {
  i: number;
  title: string;
  description: string;
  src: string;
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  id: string;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-[25px] p-12 origin-top border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="flex h-full gap-12">
          <div className="w-[40%] flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4 text-white">{title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
            <div className="mt-8">
              <Button 
                href={`/projects/${id}`}
                variant="outline"
                className="text-xs px-6 py-3"
              >
                VIEW PROJECTS
              </Button>
            </div>
          </div>

          <div className="relative w-[60%] h-full rounded-[20px] overflow-hidden bg-black/50">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <Image fill src={src} alt={title} className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectStack = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="project-stack" ref={container} className="bg-black relative px-4">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

export default ProjectStack;

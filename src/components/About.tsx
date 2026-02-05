"use client"
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import  { useEffect, useRef } from "react";
import Slider from "./Slider";



const About = () => {
  const bioText = `Signs & Design is a full-service signage company delivering custom indoor and outdoor signs, brand environments, and architectural graphics. From concept to installation, we help businesses stand out with precision, durability, and visual clarity.`;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate the title
    gsap.from(".title span", {
      y: "100%",
      duration: 0.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 20%",
       
        toggleActions: "play reverse play reverse",
      },
    });

    // Animate the bio (word by word)
    gsap.from(".bio p span", {
      y:"100%",
  
      duration: 0.6,

      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 35%",
    
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div id="about" ref={containerRef} className="min-h-screen p-4 lg:p-10">
      {/* heading */}
      <h2 className="text-3xl lg:text-4xl max-w-[950px] mt-10">
        <span className="inline-block text-xl font-medium -translate-y-5 mr-20 lg:mr-[400px] overflow-hidden title">
          <span className="block">About Signs & Design</span>
        </span>

        <span className="bio ">
          {bioText.split(" ").map((word, idx) => (
            <p key={idx} className="inline-block mr-2 overflow-hidden">
              <span  className="block">
                {word}
              </span>
            </p>
          ))}
        </span>
      </h2>
      {/* img-slider  */}
       
      <Slider/>
    </div>
  );
};

export default About;

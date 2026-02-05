"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useEffect, useRef } from "react";

// Define the Service interface locally if not available globally
interface Service {
  id: number;
  title: string;
  description: string;
  media: {
    type: string;
    url: string;
  };
  services: string[][];
}

const services: Service[] = [
  {
    id: 1,
    title: "Indoor Signs",
    description:
      "Custom indoor signage that enhances your interior space and guides your visitors.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dA0VGEbbw4g",
    },
    services: [
      ["Lobby Signs", "Directional Signs", "ADA Signs", "Room ID"],
      ["Wall Murals", "Window Graphics", "Floor Graphics", "Safety Signs"],
      ["Menu Boards", "Digital Displays", "Banners", "Posters"],
    ],
  },
  {
    id: 2,
    title: "Outdoor Signs",
    description:
      "Durable and high-impact outdoor signs to make your business stand out.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/lJIrF4YjHfQ", // ✅ embed format
    },
    services: [
      ["Channel Letters", "Monument Signs", "Pylon Signs", "Illuminated Signs"],
      ["Awning Signs", "Real Estate Signs", "Construction Signs", "Yard Signs"],
    ],
  },
  {
    id: 3,
    title: "Brand Environments",
    description:
      "Immersive brand experiences that tell your story through physical space.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/9No-FiEInLA", // ✅ embed format
    },
    services: [
      ["Office Branding", "Retail Displays",  "Trade Show Booths"],
      ["Event Signage", "Experiential Graphics", "Wayfinding Systems", "Collateral"],
    ],
  },
  {
    id: 4,
    title: "Architectural Graphics",
    description:
      "Integrating graphics into architecture to create unique and memorable environments.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ✅ embed format
    },
    services: [
      ["Glass Finishes", "Privacy Films", "Textured Surfaces", ],
      ["Dimensional Lettering", "Custom Wallcoverings"],
    ],
  },
];


const Work = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".title span", {
      y: "100%",
      duration: 0.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div id="services" ref={containerRef} className="relative z-[400] h-fit p-4">
      {/* heading */}
      <h2 className="text-3xl max-w-[950px] overflow-hidden title">
        <span className="block">Our Services</span>
      </h2>

      {/* card-container */}
      <div className="min-h-screen ">
        {services.map((service) => (
          <div key={service.id} className="mb-10">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p>{service.description}</p>
              {/* Simplified Card rendering as I don't have the Card component code fully */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, children, ...props }, ref) => {
    const baseStyles = "group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]";
    
    const variants = {
      primary: "bg-white text-black hover:bg-orange-500 hover:text-white border border-transparent hover:border-orange-500 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]",
      outline: "bg-transparent text-white border border-white/30 hover:bg-white hover:text-black hover:border-transparent",
    };

    const content = (
      <>
        <span className="relative z-10">{children}</span>
        <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cn(baseStyles, variants[variant], className)}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

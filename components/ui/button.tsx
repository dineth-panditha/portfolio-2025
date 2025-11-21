"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  // FIXED: Updated to allow the MouseEvent argument
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  icon?: ReactNode;
}

export default function Button({ children, onClick, variant = "primary", className, icon }: ButtonProps) {
  const baseStyles = "relative px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-wider flex items-center gap-2 overflow-hidden transition-all duration-300 group";
  
  const variants = {
    primary: "bg-primary text-obsidian hover:shadow-[0_0_20px_rgba(45,212,191,0.5)]",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary bg-transparent",
    ghost: "text-muted hover:text-white bg-transparent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {/* Scanline effect for primary buttons */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="text-lg">{icon}</span>}
      </span>
    </motion.button>
  );
}
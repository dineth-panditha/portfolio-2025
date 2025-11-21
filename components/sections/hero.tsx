"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Download, Mail, AlertCircle, X } from "lucide-react"; 
import Button from "@/components/ui/button";
import HeroRing from "@/components/3d/hero-ring";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/lib/constants";

export default function Hero() {
  const [showError, setShowError] = useState(false);

  // Function to check if CV exists before downloading
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Check if the file exists
      const response = await fetch("/resume.pdf", { method: "HEAD" });
      
      if (response.ok) {
        // If found, trigger download manually
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Dineth_Panditha_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // If 404 (Not Found), show the error popup
        setShowError(true);
        // Auto-hide after 3 seconds
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Copy */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary"
          >
            <Sparkles size={12} />
            <span>Available for New Projects</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-[1.1]"
          >
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              {PROFILE.name}.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted max-w-md font-light leading-relaxed"
          >
            {PROFILE.role}. <br/>
            {PROFILE.bio}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 relative"
          >
            <Link href="#works">
              <Button icon={<ArrowRight size={16} />}>View Work</Button>
            </Link>

            <Link href="#contact">
              <Button variant="outline" icon={<Mail size={16} />}>Contact</Button>
            </Link>

            {/* Download CV Button with Check */}
            <div className="relative">
                <Button 
                    variant="ghost" 
                    icon={<Download size={16} />} 
                    onClick={handleDownload}
                >
                    CV
                </Button>

                {/* THE POPUP WINDOW (Error Message) */}
                <AnimatePresence>
                    {showError && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute top-full left-0 mt-4 w-max p-3 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl flex items-center gap-3 shadow-xl z-50"
                        >
                            <AlertCircle size={18} className="text-red-400" />
                            <span className="text-xs font-mono text-red-200">CV is not provided</span>
                            <button onClick={() => setShowError(false)} className="text-red-400 hover:text-white">
                                <X size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right: Avatar Portal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative h-[500px] flex items-center justify-center group"
        >
          <div className="absolute inset-0 scale-125 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <HeroRing />
          </div>

          <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 shadow-2xl z-10 backdrop-blur-sm">
             <Image 
                src="/images/avatar.png" 
                fill 
                alt={PROFILE.name}
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-80" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

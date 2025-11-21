"use client";

import { motion } from "framer-motion";
import { MapPin, Zap, Code2 } from "lucide-react";
import { useTime } from "@/hooks/use-time";
import TechCube from "@/components/3d/tech-cube";

export default function About() {
  const time = useTime();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // UPDATED: Your specific Tech Stack
  const skills = ["NextJS", "SpringBoot", "Python", "NodeJS", "MySQL", "MongoDB", "AWS"];

  return (
    <section id="about" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
                <span className="text-primary">01.</span> Interface
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent" />
        </div>

        {/* The Bento Grid */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px]"
        >
            
            {/* 1. The Bio (Span 2x2) */}
            <motion.div variants={item} className="md:col-span-2 md:row-span-2 glass-panel p-8 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                    <Code2 size={48} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Full Stack Engineer</h3>
                    <p className="text-muted leading-relaxed">
                        I specialize in building scalable, high-performance web applications. 
                        My focus bridges the gap between distinct design systems and robust backend architecture.
                        Currently experimenting with WebGL and AI-driven interfaces.
                    </p>
                </div>
                
                {/* UPDATED SKILLS LIST */}
                <div className="flex flex-wrap gap-2 mt-6">
                    {skills.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary hover:bg-primary/10 transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* 2. The 3D Tech Cube (Span 1x2) */}
            <motion.div variants={item} className="md:col-span-1 md:row-span-2 glass-panel relative overflow-hidden flex flex-col">
                <div className="absolute top-4 left-4 z-10 text-xs font-mono text-muted">Interactive_Stack.obj</div>
                <div className="flex-1 relative">
                    <TechCube />
                </div>
                <div className="p-4 border-t border-white/10 bg-white/5 text-center">
                    <span className="text-xs text-muted">Drag to Rotate</span>
                </div>
            </motion.div>

            {/* 3. Location & Time (Span 1x1) */}
            <motion.div variants={item} className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Fake Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2DD4BF_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <MapPin size={20} />
                    </div>
                    <div className="text-xs font-mono animate-pulse text-primary">● LIVE</div>
                </div>
                <div className="relative z-10">
                    <div className="text-3xl font-heading font-bold">{time}</div>
                    <div className="text-sm text-muted">Hikkaduwa, LK</div>
                </div>
            </motion.div>

            {/* 4. Status (Span 1x1) */}
            <motion.div variants={item} className="glass-panel p-6 flex flex-col justify-center items-center text-center gap-4 group">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                        <Zap size={24} className="text-yellow-400" />
                    </div>
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-full border border-yellow-400/30 animate-ping" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white">Open to Work</div>
                    <div className="text-xs text-muted">Remote / Hybrid</div>
                </div>
            </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { EXPERIENCE, EDUCATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  // Helper to determine which data to show
  const data = activeTab === "work" ? EXPERIENCE : EDUCATION;
  const isWork = activeTab === "work";

  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* 1. Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
                <h2 className="text-4xl font-heading font-bold mb-4">
                    <span className="text-primary">01.5</span> Professional_Log
                </h2>
                <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent" />
            </div>

            {/* 2. THE TOGGLE SWITCHER (Matches your Screenshot) */}
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                {/* Tab 1: Experience */}
                <button
                    onClick={() => setActiveTab("work")}
                    className={cn(
                        "relative px-8 py-2.5 rounded-full text-sm font-mono transition-colors duration-300 z-10",
                        activeTab === "work" ? "text-obsidian font-bold" : "text-muted hover:text-white"
                    )}
                >
                    {activeTab === "work" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    Experience
                </button>

                {/* Tab 2: Education */}
                <button
                    onClick={() => setActiveTab("education")}
                    className={cn(
                        "relative px-8 py-2.5 rounded-full text-sm font-mono transition-colors duration-300 z-10",
                        activeTab === "education" ? "text-obsidian font-bold" : "text-muted hover:text-white"
                    )}
                >
                    {activeTab === "education" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    Education
                </button>
            </div>
        </div>

        {/* 3. The Content List */}
        <div className="relative border-l border-white/10 ml-3 md:ml-6 min-h-[400px]">
            {/* Animated Content Switch */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-12"
                >
                    {data.map((item: any, index: number) => (
                        <div key={item.id} className="relative pl-8 md:pl-12">
                            
                            {/* Glowing Node (Teal for Work, Purple for Edu) */}
                            <div className={cn(
                                "absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-obsidian border shadow-[0_0_10px_currentColor]",
                                isWork ? "border-primary text-primary" : "border-secondary text-secondary"
                            )} />
                            
                            {/* Card */}
                            <div className={cn(
                                "glass-panel p-6 md:p-8 rounded-2xl group border hover:bg-white/5 transition-all duration-300",
                                isWork ? "hover:border-primary/30" : "hover:border-secondary/30"
                            )}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                    <div>
                                        <h3 className={cn(
                                            "text-xl font-bold text-white transition-colors",
                                            isWork ? "group-hover:text-primary" : "group-hover:text-secondary"
                                        )}>
                                            {isWork ? item.role : item.degree}
                                        </h3>
                                        <div className="text-sm font-mono text-muted flex items-center gap-2 mt-1">
                                            {isWork ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                                            <span>{isWork ? item.company : item.institution}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs font-mono text-zinc-500 py-1 px-2 rounded bg-white/5 border border-white/5 self-start md:self-center flex items-center gap-2">
                                        {isWork ? <Calendar size={12} /> : <BookOpen size={12} />}
                                        {item.date}
                                    </div>
                                </div>

                                <p className="text-muted leading-relaxed mb-6 max-w-2xl">
                                    {item.description}
                                </p>

                                {/* Conditional Footer: Skills for Work / Status for Edu */}
                                {isWork ? (
                                    <div className="flex flex-wrap gap-2">
                                        {item.skills?.map((skill: string) => (
                                            <span key={skill} className="text-xs font-mono text-primary/80 bg-primary/5 px-2 py-1 rounded border border-primary/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-xs font-mono text-secondary">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                        Status: {item.status}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Connecting Line Gradient */}
            <div className={cn(
                "absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b to-transparent opacity-50 transition-colors duration-500",
                isWork ? "from-primary via-primary/50" : "from-secondary via-secondary/50"
            )} />
        </div>

      </div>
    </section>
  );
}
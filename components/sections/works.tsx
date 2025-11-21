"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ProjectModal from "@/components/ui/project-modal";
import Image from "next/image";

// CONFIG: How many items to show per page
const ITEMS_PER_PAGE = 2; 

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filter the projects based on category
  const filteredProjects = PROJECTS.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  // 2. Reset to Page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // 3. Calculate Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Optional: Scroll back to top of section nicely
      document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="works" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-4">
              <span className="text-primary">02.</span> Selected Works
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent" />
          </div>

          <div className="flex items-center gap-2 p-2 rounded-full bg-white/5 border border-white/10 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative px-6 py-2 rounded-full text-sm font-mono transition-colors duration-300",
                  activeCategory === category ? "text-obsidian" : "text-muted hover:text-white"
                )}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* The Project Grid (Rendering 'currentProjects' only) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)} 
              >
                <div className="glass-panel p-4 rounded-2xl hover:border-primary/50 transition-colors duration-500 h-full flex flex-col">
                  
                  {/* Image Area */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-zinc-800">
                    {project.image.startsWith("http") ? (
                       <Image 
                         src={project.image}
                         alt={project.title}
                         fill
                         className="object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                    ) : (
                       <div className={cn("w-full h-full bg-gradient-to-br", project.image)} />
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                            <ArrowUpRight size={24} className="text-obsidian" />
                        </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex justify-between items-start flex-1">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-mono text-primary px-2 py-1 rounded border border-primary/20 bg-primary/10">
                                {project.category}
                            </span>
                            <h3 className="text-2xl font-bold font-heading text-white group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                        </div>
                        <p className="text-muted text-sm mb-6 line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tech.map((t) => (
                        <span key={t} className="text-xs text-zinc-500 font-mono">
                            #{t}
                        </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-6">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-primary hover:text-obsidian hover:border-primary transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Indicator */}
            <div className="text-sm font-mono text-muted">
              Page <span className="text-primary font-bold">{currentPage}</span> of {totalPages}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-primary hover:text-obsidian hover:border-primary transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <ProjectModal 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
            project={selectedProject} 
        />

      </div>
    </section>
  );
}
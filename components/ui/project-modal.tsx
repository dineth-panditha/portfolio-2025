"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Layers } from "lucide-react";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  // 1. Ensure we only render portals on the client side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 2. Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted) return null;

  // Check if image is a gradient string
  const isGradient = project?.image?.startsWith("from-");

  // 3. Use createPortal to render outside the current DOM hierarchy
  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl outline-none scrollbar-hide"
            onClick={(e) => e.stopPropagation()} 
          >
            
            {/* Close Button - Now explicitly strictly on top */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering any other clicks
                onClose();
              }}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {/* Hero Image / Header */}
            <div className={`w-full h-64 md:h-96 relative ${isGradient ? `bg-gradient-to-br ${project.image}` : ''}`}>
                {!isGradient && (
                    // Ensure this path matches your image location
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                )}
                
                {/* Overlay Title */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                         <span className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full">
                            {project.category}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">{project.title}</h2>
                </div>
            </div>

            {/* Body Content */}
            <div className="p-8 grid md:grid-cols-3 gap-8 bg-zinc-900">
                
                {/* Main Description */}
                <div className="md:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Layers size={20} className="text-primary" /> 
                        Project Details
                    </h3>
                    <p className="text-muted leading-relaxed text-lg">
                        {project.longDescription || project.description}
                    </p>
                    
                    <div className="pt-4">
                        <h4 className="text-sm font-mono text-muted mb-3 uppercase tracking-wider">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string) => (
                                <span key={t} className="px-3 py-1 text-sm text-zinc-300 bg-white/5 border border-white/10 rounded-md font-mono">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Actions */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        <h3 className="text-sm font-mono text-muted uppercase tracking-wider">Deployment</h3>
                        
                        <a href={project.links?.demo || "#"} target="_blank" rel="noreferrer" className="block">
                            <Button className="w-full justify-center" icon={<ExternalLink size={16} />}>
                                Live Demo
                            </Button>
                        </a>
                        
                        <a href={project.links?.repo || "#"} target="_blank" rel="noreferrer" className="block">
                            <Button variant="outline" className="w-full justify-center" icon={<Github size={16} />}>
                                Source Code
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
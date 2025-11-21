"use client";

import { PROFILE } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-obsidian relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Copyright */}
        <div className="text-xs font-mono text-muted">
          &copy; {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.
        </div>

        {/* Right: Social Links (Replaces the old text) */}
        <div className="flex items-center gap-6">
            <a 
                href={PROFILE.links.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted hover:text-primary transition-colors"
            >
                <Linkedin size={16} />
            </a>
            <a 
                href={PROFILE.links.github} 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted hover:text-primary transition-colors"
            >
                <Github size={16} />
            </a>
            <a 
                href={PROFILE.links.email} 
                className="text-muted hover:text-primary transition-colors"
            >
                <Mail size={16} />
            </a>
        </div>

      </div>
    </footer>
  );
}
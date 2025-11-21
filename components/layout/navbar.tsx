"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Works", href: "#works" },
    { name: "Contact", href: "#contact" },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 flex justify-between items-center backdrop-blur-sm"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-50">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
            <Terminal size={20} className="text-primary" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">
            Ethereal<span className="text-muted">.Horizon</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 glass-panel px-8 py-3 rounded-full">
          {links.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="relative text-sm font-mono text-muted hover:text-white transition-colors"
            >
              <span className="hover:text-primary transition-colors">0{index + 1}. </span>
              {link.name}
            </Link>
          ))}
          {/* Command Palette Hint */}
           <button 
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden md:flex items-center gap-2 px-3 py-1 text-[10px] font-mono text-muted bg-white/5 rounded border border-white/10 hover:border-primary/50 transition-colors ml-4"
          >
            <span>CMD+K</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
            >
                <div className="flex flex-col items-center gap-8">
                    {links.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-heading font-bold text-white hover:text-primary transition-colors"
                        >
                            <span className="text-sm font-mono text-primary block mb-1 text-center">0{index + 1}.</span>
                            {link.name}
                        </Link>
                    ))}
                    
                    {/* Mobile Command Palette Button */}
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            setTimeout(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true })), 100);
                        }}
                        className="mt-8 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-muted hover:text-white hover:border-primary/50"
                    >
                        Open Command Palette
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
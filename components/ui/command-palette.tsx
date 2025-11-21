"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  User, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Terminal 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // 1. Keyboard Shortcut Listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Close on Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // 2. Define Commands
  const commands = [
    {
      id: "home",
      label: "System_Home",
      icon: <Terminal size={16} />,
      action: () => router.push("/"),
      group: "Navigation"
    },
    {
      id: "about",
      label: "View_Profile (About)",
      icon: <User size={16} />,
      action: () => router.push("#about"),
      group: "Navigation"
    },
    {
      id: "works",
      label: "Open_Gallery (Works)",
      icon: <Briefcase size={16} />,
      action: () => router.push("#works"),
      group: "Navigation"
    },
    {
      id: "contact",
      label: "Execute_Comms (Contact)",
      icon: <Mail size={16} />,
      action: () => router.push("#contact"),
      group: "Navigation"
    },
    {
      id: "email",
      label: "Copy_Email_Address",
      icon: <Copy size={16} />,
      action: () => {
        navigator.clipboard.writeText("your-email@example.com");
        alert("Email copied to clipboard");
      },
      group: "Utility"
    },
    {
      id: "github",
      label: "Connect_GitHub",
      icon: <Github size={16} />,
      action: () => window.open("https://github.com", "_blank"),
      group: "External"
    },
    {
      id: "linkedin",
      label: "Connect_LinkedIn",
      icon: <Linkedin size={16} />,
      action: () => window.open("https://linkedin.com", "_blank"),
      group: "External"
    },
  ];

  // 3. Filter Logic
  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
            className="fixed inset-0 z-[10000] flex items-start justify-center pt-[20vh] px-4"
            onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Palette Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-4 border-b border-white/10">
                <Search className="text-muted mr-3" size={20} />
                <input 
                    autoFocus
                    type="text"
                    placeholder="> Type a command..."
                    className="flex-1 bg-transparent text-lg text-white placeholder-zinc-600 focus:outline-none font-mono"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="px-2 py-1 rounded bg-white/10 text-xs text-muted font-mono border border-white/5">
                    ESC
                </div>
            </div>

            {/* Command List */}
            <div className="py-2 max-h-[300px] overflow-y-auto">
                {filteredCommands.length === 0 ? (
                    <div className="px-4 py-8 text-center text-muted font-mono text-sm">
                        {/* FIXED: Escaped the > symbol here */}
                        &gt; Error: Command_Not_Found
                    </div>
                ) : (
                    filteredCommands.map((cmd) => (
                        <button
                            key={cmd.id}
                            onClick={() => handleSelect(cmd.action)}
                            className="w-full px-4 py-3 flex items-center justify-between group hover:bg-white/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3 text-muted group-hover:text-white transition-colors">
                                {cmd.icon}
                                <span className="font-mono text-sm">{cmd.label}</span>
                            </div>
                            <ArrowRight size={14} className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </button>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-zinc-600 font-mono">Ethereal_OS v4.0</span>
                <span className="text-[10px] text-zinc-600 font-mono">Use ↑↓ to navigate</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
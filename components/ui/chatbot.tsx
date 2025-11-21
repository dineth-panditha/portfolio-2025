"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/lib/constants"; 

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: string[];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Initial State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `System online. I am the Ethereal Assistant. How can I help you navigate this portfolio?`,
      sender: "bot",
      options: ["Who is Dineth?", "What are your skills?", "Contact Info", "View Projects"]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    // 1. User Message
    const userMsg: Message = { id: Date.now().toString(), text: option, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Bot Response Logic
    setTimeout(() => {
      let botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm not sure about that.",
        sender: "bot"
      };

      switch (option) {
        case "Who is Dineth?":
          botResponse.text = `${PROFILE.name} is a ${PROFILE.role} based in ${PROFILE.location}. He specializes in full-stack development (MERN, Spring Boot) and Blockchain DApps.`;
          botResponse.options = ["What are your skills?", "Contact Info"];
          break;
        case "What are your skills?":
          botResponse.text = "Primary capabilities include: Java (Spring Boot), MERN Stack (React, Node.js), Blockchain (Solidity), and AI/ML integration (Python).";
          botResponse.options = ["View Projects", "Who is Dineth?"];
          break;
        case "Contact Info":
          botResponse.text = `You can reach Dineth via the terminal form on this page, or email directly at ${PROFILE.email}.`;
          break;
        case "View Projects":
          botResponse.text = "Accessing database... You can view the 'Selected Works' section for details on the Voting DApp, AI Surveillance System, and more.";
          break;
        default:
            botResponse.text = "Command not recognized. Please select an option.";
            botResponse.options = ["Who is Dineth?", "What are your skills?"];
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
            "fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/10",
            isOpen ? "scale-0 opacity-0 pointer-events-none" : "bg-primary text-obsidian scale-100 opacity-100"
        )}
      >
        <MessageSquare size={24} fill="currentColor" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            // FIXED: Responsive Width & Max Height
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-32px)] md:w-[350px] h-[500px] max-h-[80vh] bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-sm text-white">System_Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.sender === "bot" ? "bg-white/10 text-primary" : "bg-primary text-obsidian"
                  )}>
                    {msg.sender === "bot" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  
                  <div className="space-y-2">
                    <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.sender === "bot" ? "bg-white/5 text-zinc-300 rounded-tl-none" : "bg-primary text-obsidian rounded-tr-none font-medium"
                    )}>
                        {msg.text}
                    </div>
                    
                    {/* Options */}
                    {msg.options && (
                        <div className="flex flex-wrap gap-2">
                            {msg.options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleOptionClick(opt)}
                                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors bg-obsidian/50"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                 <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-primary">
                        <Bot size={16} />
                     </div>
                     <div className="p-3 rounded-2xl bg-white/5 rounded-tl-none flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms"}} />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms"}} />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms"}} />
                     </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="text-[10px] text-center text-muted font-mono">
                    AI_Model: Ethereal_v1.0 // Restricted Mode
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, CheckCircle2, Github, Linkedin, Mail, AlertCircle } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { PROFILE } from "@/lib/constants";

export default function Contact() {
 
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");

    const formData = new FormData(e.currentTarget);

    try {
      // 1. Send Data to Formspree
      const response = await fetch("https://formspree.io/f/manvgbpe", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 2. Handle Response
      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      
      }
    } catch (error) {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        
        {/* Left: Context & Socials */}
        <div>
          <div className="mb-8">
            <h2 className="text-4xl font-heading font-bold mb-4">
              <span className="text-primary">03.</span> Initialize_Link
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent" />
          </div>

          <p className="text-muted text-lg leading-relaxed mb-8">
            Ready to engineer the future? Whether you have a game-changing idea, need a blockchain architect, or just want to discuss the latest in AI, my terminal is open.
          </p>

          <div className="mb-12">
             <div className="text-sm font-mono text-primary mb-2">Current Status:</div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for work
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-white uppercase tracking-widest">Connect_Nodes</h3>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a 
                href={PROFILE.links.linkedin} 
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>

              {/* GitHub */}
              <a 
                href={PROFILE.links.github} 
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Github size={20} />
              </a>

              {/* Email */}
              <a 
                href={PROFILE.links.email} 
                className="p-3 rounded-full bg-white/5 border border-white/10 text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: The Terminal Form */}
        <div className="relative">
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-primary relative overflow-hidden">
            
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-8 opacity-50 border-b border-white/10 pb-4">
              <Terminal size={16} className="text-primary" />
              <span className="text-xs font-mono text-primary">
                guest@ethereal-horizon:~/send-message
              </span>
            </div>

            {/* Success State */}
            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[300px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-mono font-bold text-green-400 mb-2">
                  &gt; Transmission_Received
                </h3>
                <p className="text-muted text-sm font-mono">
                  I will decrypt your message and respond shortly.
                </p>
                <button 
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-xs font-mono text-primary hover:underline"
                >
                  [Send_New_Packet]
                </button>
              </motion.div>
            ) : (
              /* Form State */
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-2"
              >
               
                <Input 
                  label="Identity_String (Name)" 
                  type="text" 
                  name="name" 
                  required 
                />
                <Input 
                  label="Return_Address (Email)" 
                  type="email" 
                  name="email" 
                  required 
                />
                <Input 
                  label="Payload_Data (Message)" 
                  multiline 
                  name="message" 
                  required 
                />

                {/* Error Message Display */}
                {formState === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-500/10 p-3 rounded border border-red-500/20">
                    <AlertCircle size={14} />
                    <span>Error: Connection_Refused. Please try again later.</span>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <Button 
                    className={formState === "loading" ? "opacity-80 pointer-events-none" : ""}
                    icon={formState === "loading" ? <span className="animate-spin">⟳</span> : <Send size={16} />}
                  >
                    {formState === "loading" ? "Executing..." : "Execute"}
                  </Button>
                </div>
              </motion.form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
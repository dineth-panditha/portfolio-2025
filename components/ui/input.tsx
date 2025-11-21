"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
}

export default function Input({ label, multiline, className, ...props }: InputProps) {
  const BaseComponent = multiline ? "textarea" : "input";

  return (
    <div className="relative group mb-6">
      <BaseComponent
        placeholder=" " // Required for peer-placeholder-shown to work
        className={cn(
          "peer block py-4 w-full bg-transparent border-b border-white/20 text-white placeholder-transparent focus:border-primary focus:outline-none transition-colors duration-300 font-mono text-sm",
          multiline ? "h-32 resize-none" : "h-14",
          className
        )}
        {...props}
      />
      <label
        className={cn(
          "absolute left-0 top-4 text-muted text-sm transition-all duration-300 pointer-events-none",
          "peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary",
          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted",
          "peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
        )}
      >
        {label}
      </label>
      
      {/* Animated Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 peer-focus:w-full" />
    </div>
  );
}
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/components/ui/command-palette"; 
import Chatbot from "@/components/ui/chatbot"; 
import SmoothScroll from "@/components/ui/smooth-scroll"; 

// 1. Font Configuration
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains-mono" 
});

// 2. Metadata (Updated Title & Favicon)
export const metadata: Metadata = {
  title: "Dineth Panditha | Full Stack Engineer", 
  description: "Building scalable AI-driven web, mobile, and blockchain solutions.",
  icons: {
    icon: "/images/avatar.png",
    shortcut: "/images/avatar.png",
    apple: "/images/avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-obsidian antialiased selection:bg-primary/20`}
      >
        <SmoothScroll>
          
          {/* Global System Tools */}
          <CommandPalette />
          <Chatbot />
          
          {/* Fixed Atmosphere Layers */}
          <div className="noise-overlay" />
          
          {/* Main Content Wrapper */}
          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>

          {/* Ambient Background Glows */}
          <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        </SmoothScroll>
      </body>
    </html>
  );
}
"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <motion.nav 
      className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 overflow-hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
              <Zap className="size-6 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">VeloAI</h1>
          </motion.div>
          {children}
        </div>
      </div>
    </motion.nav>
  )
}

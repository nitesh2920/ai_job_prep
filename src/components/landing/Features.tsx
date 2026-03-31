"use client"

import { motion } from "framer-motion"
import { Zap, SpeechIcon, FileSlidersIcon, BookOpenCheckIcon } from "lucide-react"

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Real-time Feedback",
      description: "AI-driven scoring on clarity, confidence, and content.",
      icon: <Zap className="size-6 text-primary" />,
    },
    {
      title: "Voice Analysis",
      description: "Tone and emotion detection with Hume Empathic AI.",
      icon: <SpeechIcon className="size-6 text-primary" />,
    },
    {
      title: "Resume Optimizer",
      description: "Target job descriptions with surgical precision.",
      icon: <FileSlidersIcon className="size-6 text-primary" />,
    },
    {
      title: "Mock Simulator",
      description: "Realistic technical and behavioral practice sessions.",
      icon: <BookOpenCheckIcon className="size-6 text-primary" />,
    },
  ]

  return (
    <section className="py-24 bg-card/40">
      <div className="container">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

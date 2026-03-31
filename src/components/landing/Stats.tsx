"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Stats() {
  const stats = [
    {
      value: "10,000+",
      label: "Interviews Conducted",
      description: "Proven high-velocity practice across 15 industries.",
    },
    {
      value: "2.3x",
      label: "Faster Offers",
      description: "Users land jobs in record time with focused AI prep.",
    },
    {
      value: "95%",
      label: "Confidence Boost",
      description: "Reported significant reduction in interview anxiety.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-24 bg-card/60 relative">
      <div className="container">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center p-8 rounded-3xl bg-background/50 border border-border/50"
              variants={itemVariants}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xl font-bold text-foreground mb-3">
                {stat.label}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-8 font-medium">
            * Based on internal data from 2,500+ successful job placements in
            2024
          </p>
          <Button size="lg" className="h-14 px-10 rounded-full transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/app">Join thousands of job seekers</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

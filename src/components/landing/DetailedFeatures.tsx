"use client"

import { motion } from "framer-motion"
import { SpeechIcon } from "lucide-react"

export function DetailedFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const leftItem = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const rightItem = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="space-y-8" variants={leftItem}>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                Simulate <span className="text-primary italic">reality</span>,
                not just questions
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our empathic AI doesn't just listen to your words—it understands
                your tone, pace, and confidence. Get the same vibe as a real
                Fortune 500 interview.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Context-aware behavioral questions",
                "Advanced technical deep-dives",
                "Empathic voice interaction",
                "Instant post-session analytics",
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-3 text-foreground font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="size-2 rounded-full bg-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="relative"
            variants={rightItem}
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-[2.5rem] blur-2xl -z-10" />
            <div className="relative bg-card border border-border rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <SpeechIcon className="size-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">AI Mock Session</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Analysis
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="h-4 w-1/2 bg-muted rounded-full overflow-hidden">
                   <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "45%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
                <div className="h-4 w-5/6 bg-muted rounded-full overflow-hidden">
                   <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">84%</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="text-2xl font-bold text-emerald-500">92</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Clarity Score</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

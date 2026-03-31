"use client"

import { Search, Settings2, Mic2, BarChart3, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function WorkflowSection() {
  const steps = [
    {
      title: "Analyze Resume",
      description:
        "AI syncs with your background to identify your unique technical strengths.",
      icon: <Search className="size-6" />,
      color: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Custom Prep",
      description:
        "Generate targeted questions based on the job you're actually applying for.",
      icon: <Settings2 className="size-6" />,
      color: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Voice Practice",
      description:
        "Practice out loud with our Hume AI interviewer to build real confidence.",
      icon: <Mic2 className="size-6" />,
      color: "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    },
    {
      title: "Score Insight",
      description:
        "Get a detailed breakdown of your performance and areas for improvement.",
      icon: <BarChart3 className="size-6" />,
      color: "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-4">
            How It Works
          </div>
          <h3 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Your Path to the <span className="text-primary italic">Offer</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our automated workflow guides you from resume optimization to a winning interview in days, not months.
          </p>
        </motion.div>

        <div className="relative px-4">
          {/* Static Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[40px] left-0 right-0 h-0.5 bg-border/50 -z-10" />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center group relative cursor-default"
                variants={itemVariants}
              >
                <motion.div 
                  className={`
                    size-20 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300
                    ${step.color} border-current/10 shadow-lg shadow-current/5
                  `}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: -2,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                  }}
                >
                  {step.icon}
                </motion.div>
                
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-[200px]">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-12 bg-border/50 my-6" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all group" asChild>
            <Link href="/app" className="flex items-center gap-2">
              Start Your Journey
              <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

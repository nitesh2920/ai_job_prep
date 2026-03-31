"use client"

import { PricingTable } from "@/services/clerk/components/PricingTable"

export function Pricing() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-pretty">
            Choose your <span className="text-primary italic">career acceleration</span> plan
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Invest in your future with flexible pricing options designed to fit
            your career goals and budget.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <PricingTable />
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            All plans include a 7-day refund period. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

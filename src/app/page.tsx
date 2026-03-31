import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"

// Client Components
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { DetailedFeatures } from "@/components/landing/DetailedFeatures"
import { Stats } from "@/components/landing/Stats"
import { WorkflowSection } from "@/components/landing/WorkflowSection"
import { Pricing } from "@/components/landing/Pricing"
import { Footer } from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      <Navbar>
        <Suspense
          fallback={
            <SignInButton forceRedirectUrl="/app">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          }
        >
          <NavButton />
        </Suspense>
      </Navbar>
      
      <Hero />
      <Features />
      <DetailedFeatures />
      <Stats />
      <WorkflowSection />
      <Pricing />
      <Footer />
    </div>
  )
}

async function NavButton() {
  const { userId } = await getCurrentUser()

  if (userId == null) {
    return (
      <SignInButton forceRedirectUrl="/app">
        <Button variant="outline">Sign In</Button>
      </SignInButton>
    )
  }

  return (
    <Button asChild>
      <Link href="/app">Dashboard</Link>
    </Button>
  )
}

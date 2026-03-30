import type { Metadata } from "next"
import { Montserrat, Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@/services/clerk/components/ClerkProvider"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "VeloAI - Intelligent Job Prep",
  description: "Advanced AI interview preparation and resume analysis platform.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.variable} ${inter.variable} antialiased font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

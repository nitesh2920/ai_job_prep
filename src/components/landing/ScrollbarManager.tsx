"use client"

import { useEffect } from "react"

export function ScrollbarManager() {
  useEffect(() => {
    // Add the no-scroar class to hide the visual scrollbar bar without disabling scroll
    document.documentElement.classList.add("no-scrollbar")
    
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("no-scrollbar")
    }, 1500)

    return () => {
      clearTimeout(timer)
      document.documentElement.classList.remove("no-scrollbar")
    }
  }, [])

  return null
}

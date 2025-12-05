"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hand, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Hand className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">SignSpeak AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/recognize" className="text-muted-foreground hover:text-foreground transition-colors">
              Live Recognition
            </Link>
            <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
              Learn ASL
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/recognize">Start Recognizing</Link>
            </Button>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/recognize" className="block text-muted-foreground hover:text-foreground">
              Live Recognition
            </Link>
            <Link href="/learn" className="block text-muted-foreground hover:text-foreground">
              Learn ASL
            </Link>
            <Link href="/about" className="block text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Button asChild className="w-full bg-primary text-primary-foreground">
              <Link href="/recognize">Start Recognizing</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

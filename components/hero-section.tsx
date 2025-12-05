import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Sparkles, Users } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Sign Language Recognition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Breaking Communication Barriers with <span className="text-primary">AI Technology</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty">
            Real-time American Sign Language recognition using advanced CNN-LSTM deep learning. Translate signs to text
            and speech instantly, promoting inclusion for the Deaf community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
              <Link href="/recognize">
                Start Recognition
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <Link href="/learn">
                <Video className="w-5 h-5" />
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Video className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Detection</h3>
            <p className="text-muted-foreground text-sm">
              Process video at 30 FPS with instant sign recognition feedback
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">CNN-LSTM Model</h3>
            <p className="text-muted-foreground text-sm">
              Hybrid neural network for spatial and temporal feature analysis
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-chart-3/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-chart-3" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Inclusive Design</h3>
            <p className="text-muted-foreground text-sm">
              Accessible interface with text-to-speech and high contrast modes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Camera, Cpu, MessageSquare, Volume2 } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Camera,
    title: "Capture",
    description: "Real-time video capture from your webcam with automatic hand detection and tracking.",
  },
  {
    step: 2,
    icon: Cpu,
    title: "Process",
    description: "CNN extracts spatial features while LSTM analyzes temporal patterns across frame sequences.",
  },
  {
    step: 3,
    icon: MessageSquare,
    title: "Recognize",
    description: "Neural network classifies gestures against trained ASL vocabulary with confidence scoring.",
  },
  {
    step: 4,
    icon: Volume2,
    title: "Translate",
    description: "Recognized signs are converted to text display and optional speech output.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From gesture to text in milliseconds using our advanced recognition pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

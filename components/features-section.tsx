import { Brain, Eye, Zap, Volume2, Shield, Globe } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Deep Learning Architecture",
    description:
      "Hybrid CNN-LSTM model with 3D convolutional layers for spatial feature extraction and bidirectional LSTM for temporal sequence modeling.",
    color: "text-primary",
  },
  {
    icon: Eye,
    title: "Computer Vision Pipeline",
    description:
      "OpenCV-powered preprocessing with hand segmentation, background removal, and data augmentation for robust gesture recognition.",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Low Latency Inference",
    description: "Optimized model inference achieving real-time performance at 30 FPS for seamless communication flow.",
    color: "text-chart-3",
  },
  {
    icon: Volume2,
    title: "Text-to-Speech Output",
    description:
      "Automatic translation of recognized signs to natural speech using Web Speech API for complete accessibility.",
    color: "text-chart-4",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens locally. No video data is stored or transmitted without explicit consent.",
    color: "text-chart-5",
  },
  {
    icon: Globe,
    title: "ASL Focus",
    description:
      "Comprehensive support for American Sign Language with extensible architecture for multiple sign languages.",
    color: "text-primary",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Powered by Advanced AI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our recognition system combines state-of-the-art deep learning with computer vision to accurately interpret
            sign language gestures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

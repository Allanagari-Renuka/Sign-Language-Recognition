"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  Cpu,
  Network,
  Target,
  AlertTriangle,
  Users,
  Lightbulb,
  CheckCircle2,
} from "lucide-react"

interface Slide {
  id: number
  title: string
  icon: React.ElementType
  content: React.ReactNode
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Introduction to Sign Language Recognition",
    icon: BookOpen,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Sign Language Recognition (SLR) is a technology that enables computers to understand and interpret sign
          language gestures, bridging communication gaps for the Deaf and hard-of-hearing community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-secondary rounded-xl">
            <h4 className="font-semibold text-foreground mb-2">Why It Matters</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Enables real-time communication
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Promotes inclusion in society
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Assists in education and employment
              </li>
            </ul>
          </div>
          <div className="p-4 bg-secondary rounded-xl">
            <h4 className="font-semibold text-foreground mb-2">Key Applications</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                Video conferencing translation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                Educational tools for learning
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                Assistive devices and apps
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "The Challenges of SLR",
    icon: AlertTriangle,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Building accurate sign language recognition systems presents unique technical and linguistic challenges that
          require sophisticated AI solutions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Spatial Complexity", desc: "Hand shapes, positions, and orientations vary greatly" },
            { title: "Temporal Dynamics", desc: "Signs involve motion sequences over time" },
            { title: "Linguistic Diversity", desc: "Over 300 sign languages with unique grammar" },
            { title: "Occlusion", desc: "Hands may block each other or face" },
            { title: "Viewpoint Variation", desc: "Different camera angles affect recognition" },
            { title: "Real-time Processing", desc: "Low latency required for natural communication" },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-secondary rounded-xl">
              <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "CNN: Spatial Feature Extraction",
    icon: Layers,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Convolutional Neural Networks (CNNs) excel at extracting spatial features from images, learning to recognize
          edges, shapes, and patterns that define hand gestures.
        </p>
        <div className="bg-secondary rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-4">CNN Architecture Layers</h4>
          <div className="space-y-3">
            {[
              { layer: "Input Layer", desc: "RGB frames (224×224×3)", color: "bg-primary/20 text-primary" },
              { layer: "Conv2D + ReLU", desc: "32 filters, 3×3 kernel", color: "bg-accent/20 text-accent" },
              { layer: "MaxPooling", desc: "2×2 pooling", color: "bg-chart-3/20 text-chart-3" },
              { layer: "Conv2D + ReLU", desc: "64 filters, 3×3 kernel", color: "bg-accent/20 text-accent" },
              { layer: "Conv2D + ReLU", desc: "128 filters, 3×3 kernel", color: "bg-accent/20 text-accent" },
              { layer: "Global Avg Pool", desc: "Spatial feature vector", color: "bg-chart-4/20 text-chart-4" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-lg text-sm font-mono ${item.color}`}>{item.layer}</div>
                <span className="text-muted-foreground text-sm">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "LSTM: Temporal Sequence Modeling",
    icon: Network,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Long Short-Term Memory (LSTM) networks capture temporal dependencies in video sequences, understanding how
          gestures evolve over time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">LSTM Advantages</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Remembers long-term dependencies
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Handles variable-length sequences
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Captures gesture dynamics
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                Bidirectional processing
              </li>
            </ul>
          </div>
          <div className="bg-secondary rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">Architecture</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="px-3 py-2 bg-background rounded-lg text-muted-foreground">
                Bidirectional(LSTM(128, return_sequences=True))
              </div>
              <div className="px-3 py-2 bg-background rounded-lg text-muted-foreground">Bidirectional(LSTM(64))</div>
              <div className="px-3 py-2 bg-background rounded-lg text-muted-foreground">Dropout(0.5)</div>
              <div className="px-3 py-2 bg-background rounded-lg text-muted-foreground">
                Dense(num_classes, activation='softmax')
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Data Preprocessing Pipeline",
    icon: Cpu,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Effective preprocessing is crucial for robust SLR. OpenCV powers our computer vision pipeline for hand
          detection and feature extraction.
        </p>
        <div className="bg-secondary rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-4">Pipeline Steps</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: "1. Frame Capture", desc: "Extract frames at 30 FPS from video" },
              { step: "2. Hand Detection", desc: "MediaPipe or OpenCV hand tracking" },
              { step: "3. Background Removal", desc: "Isolate hand regions from scene" },
              { step: "4. Normalization", desc: "Resize to 224×224, scale pixels 0-1" },
              { step: "5. Data Augmentation", desc: "Rotate, flip, scale for robustness" },
              { step: "6. Sequence Batching", desc: "Group 16 frames per prediction" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <Badge variant="outline" className="shrink-0 border-primary text-primary">
                  {item.step.split(".")[0]}
                </Badge>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.step.split(". ")[1]}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Model Training Process",
    icon: Target,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Training the CNN-LSTM model requires careful optimization to achieve high accuracy while preventing
          overfitting.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3">Hyperparameters</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Optimizer: Adam</li>
              <li>Learning Rate: 0.001</li>
              <li>Batch Size: 32</li>
              <li>Epochs: 50-100</li>
              <li>Dropout: 0.5</li>
            </ul>
          </div>
          <div className="bg-secondary rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3">Data Split</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Training: 70%</li>
              <li>Validation: 15%</li>
              <li>Testing: 15%</li>
              <li>Cross-validation: 5-fold</li>
            </ul>
          </div>
          <div className="bg-secondary rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3">Performance</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Target Accuracy: 85%+</li>
              <li>F1 Score: 0.85</li>
              <li>Inference: {"<"}100ms</li>
              <li>Real-time: 30 FPS</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Promoting Inclusion",
    icon: Users,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Beyond technology, SLR represents a commitment to inclusion, accessibility, and empowering the Deaf community
          through better communication tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary rounded-xl p-6">
            <Lightbulb className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Ethical Considerations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Privacy-first design - no data stored without consent</li>
              <li>• Community involvement in dataset creation</li>
              <li>• Respect for Deaf culture and identity</li>
              <li>• Transparency in model limitations</li>
            </ul>
          </div>
          <div className="bg-secondary rounded-xl p-6">
            <Users className="w-8 h-8 text-accent mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Future Directions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Support for more sign languages worldwide</li>
              <li>• Continuous sentence recognition</li>
              <li>• Mobile-first deployment</li>
              <li>• Integration with video platforms</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export default function LearnContent() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
    }
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learn About SLR Technology</h1>
        <p className="text-muted-foreground">Explore the science and technology behind sign language recognition</p>
      </div>

      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1 border-border">
                  Slide {currentSlide + 1} of {slides.length}
                </Badge>
                <CardTitle className="text-xl">{slide.title}</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>{slide.content}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          className="gap-2 border-border text-foreground hover:bg-secondary disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-primary" : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

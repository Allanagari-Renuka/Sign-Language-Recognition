import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, Shield, Code2, Users, Sparkles, Brain, Eye, Cpu } from "lucide-react"
import { modelInfo } from "@/lib/ml-model"

export default function AboutContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-primary/20 text-primary border-0">About SignSpeak AI</Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
          Bridging Communication Through Technology
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          SignSpeak AI is dedicated to breaking down communication barriers for the Deaf community using cutting-edge
          artificial intelligence and computer vision.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              To make sign language recognition technology accessible to everyone, enabling seamless communication
              between the Deaf and hearing communities.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-lg">Inclusion First</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              We believe technology should empower everyone. Our tools are designed with accessibility at the core, not
              as an afterthought.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-chart-3" />
            </div>
            <CardTitle className="text-lg">Privacy & Ethics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              All processing happens locally. We never store video data without consent and actively involve the Deaf
              community in our development.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Architecture */}
      <Card className="bg-card border-border mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Technical Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">Computer Vision</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• OpenCV for video capture</li>
                <li>• Hand detection & tracking</li>
                <li>• Real-time preprocessing</li>
                <li>• Background subtraction</li>
              </ul>
            </div>

            <div className="p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">Deep Learning</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• CNN for spatial features</li>
                <li>• LSTM for temporal patterns</li>
                <li>• TensorFlow/Keras backend</li>
                <li>• Attention mechanisms</li>
              </ul>
            </div>

            <div className="p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-chart-3" />
                <h4 className="font-semibold text-foreground">Deployment</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time 30 FPS inference</li>
                <li>• WebGL acceleration</li>
                <li>• Mobile responsive</li>
                <li>• Text-to-speech output</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Details */}
      <Card className="bg-card border-border mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Model Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">CNN Layers</h4>
              <div className="flex flex-wrap gap-2">
                {modelInfo.architecture.cnn.layers.map((layer, i) => (
                  <Badge key={i} variant="outline" className="font-mono text-xs border-border">
                    {layer.type}
                    {layer.filters && ` (${layer.filters})`}
                    {layer.kernel && ` ${layer.kernel}`}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">LSTM Layers</h4>
              <div className="flex flex-wrap gap-2">
                {modelInfo.architecture.lstm.layers.map((layer, i) => (
                  <Badge key={i} variant="outline" className="font-mono text-xs border-border">
                    {layer.type}
                    {layer.units && ` (${layer.units})`}
                    {layer.rate && ` ${layer.rate}`}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="text-center p-4 bg-secondary rounded-xl">
                <p className="text-2xl font-bold text-primary">{(modelInfo.performance.accuracy * 100).toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <p className="text-2xl font-bold text-accent">{modelInfo.performance.f1Score}</p>
                <p className="text-sm text-muted-foreground">F1 Score</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <p className="text-2xl font-bold text-chart-3">{modelInfo.performance.inferenceTime}</p>
                <p className="text-sm text-muted-foreground">Inference</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <p className="text-2xl font-bold text-chart-4">25+</p>
                <p className="text-sm text-muted-foreground">Signs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Built for the Community
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            SignSpeak AI is an open initiative to make sign language recognition technology accessible. We work closely
            with the Deaf community to ensure our tools are accurate, respectful, and genuinely useful.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-xl">
              <h4 className="font-semibold text-foreground mb-2">Community Involvement</h4>
              <p className="text-sm text-muted-foreground">
                Native ASL users contribute to our dataset and validate recognition accuracy to ensure cultural and
                linguistic authenticity.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-xl">
              <h4 className="font-semibold text-foreground mb-2">Open Source</h4>
              <p className="text-sm text-muted-foreground">
                Our codebase and models are available for research and development, fostering innovation in assistive
                technology.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

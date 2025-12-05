import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    name: "SignSpeak CNN-LSTM",
    version: "1.0.0",
    architecture: {
      type: "Hybrid CNN-LSTM",
      cnn: {
        backbone: "Custom",
        layers: 4,
        filters: [32, 64, 128, 256],
        kernelSize: "3x3",
      },
      lstm: {
        type: "Bidirectional",
        layers: 2,
        units: [128, 64],
        dropout: 0.5,
      },
      output: {
        classes: 25,
        activation: "softmax",
      },
    },
    training: {
      dataset: "ASL Custom Dataset",
      samples: "10,000+",
      epochs: 50,
      optimizer: "Adam",
      learningRate: 0.001,
      batchSize: 32,
    },
    performance: {
      accuracy: 0.87,
      f1Score: 0.85,
      precision: 0.86,
      recall: 0.84,
      inferenceTime: "45ms",
    },
    supported: {
      languages: ["ASL"],
      signs: 25,
      categories: ["Alphabet", "Numbers", "Common Words", "Greetings"],
    },
  })
}

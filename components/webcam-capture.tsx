"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Hand,
  Activity,
  Zap,
  Type,
  MessageSquare,
  Trash2,
  CornerDownLeft,
} from "lucide-react"
import { predictSign, type PredictionResult } from "@/lib/ml-model"

const FRAME_CAPTURE_INTERVAL = 200 // ms - capture frame every 200ms
const DEBOUNCE_DELAY = 400 // ms - prevent repeated detection
const WORD_TIMEOUT = 2500 // ms - finalize word after no gesture
const MIN_CONFIDENCE = 0.65 // minimum confidence threshold

export default function WebcamCapture() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Camera state
  const [isStreaming, setIsStreaming] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fps, setFps] = useState(0)

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [currentLetter, setCurrentLetter] = useState<string>("")
  const [currentWord, setCurrentWord] = useState<string>("")
  const [sentence, setSentence] = useState<string>("")
  const [lastDetectedLetter, setLastDetectedLetter] = useState<string>("")
  const [isGestureDetected, setIsGestureDetected] = useState(false)
  const [lastGestureTime, setLastGestureTime] = useState<number>(Date.now())

  const [letterCount, setLetterCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  // Refs for timing
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const processingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const wordTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const debounceTimeRef = useRef<number>(0)

  const speak = useCallback(
    (text: string, rate = 1.0) => {
      if (!speechEnabled || !("speechSynthesis" in window)) return

      // Cancel any ongoing speech for immediate feedback
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = rate
      utterance.pitch = 1.0
      utterance.volume = 1.0
      speechSynthesis.speak(utterance)
    },
    [speechEnabled],
  )

  const finalizeWord = useCallback(() => {
    if (currentWord.trim()) {
      const word = currentWord.trim()

      // Add word to sentence
      setSentence((prev) => {
        const newSentence = prev ? `${prev} ${word}` : word
        return newSentence
      })

      // Speak the complete word
      speak(word, 0.9)

      // Update stats
      setWordCount((prev) => prev + 1)

      // Clear current word
      setCurrentWord("")
      setCurrentLetter("")
      setLastDetectedLetter("")
    }
  }, [currentWord, speak])

  const handleLetterDetected = useCallback(
    (letter: string, confidence: number) => {
      const now = Date.now()

      // Check if gesture is detected (high enough confidence)
      if (confidence < MIN_CONFIDENCE) {
        setIsGestureDetected(false)
        return
      }

      setIsGestureDetected(true)
      setLastGestureTime(now)

      // Clear word timeout since gesture is active
      if (wordTimeoutRef.current) {
        clearTimeout(wordTimeoutRef.current)
      }

      // Debounce: only accept new letter if different from last AND enough time passed
      if (letter !== lastDetectedLetter && now - debounceTimeRef.current > DEBOUNCE_DELAY) {
        debounceTimeRef.current = now

        // Set current letter
        setCurrentLetter(letter)
        setLastDetectedLetter(letter)

        // Add letter to current word
        setCurrentWord((prev) => prev + letter)

        // Update letter count
        setLetterCount((prev) => prev + 1)

        // Speak the letter immediately
        speak(letter, 1.1)
      }

      // Set timeout to finalize word after no gesture
      wordTimeoutRef.current = setTimeout(() => {
        finalizeWord()
      }, WORD_TIMEOUT)
    },
    [lastDetectedLetter, speak, finalizeWord],
  )

  useEffect(() => {
    if (!isProcessing) return

    const checkInterval = setInterval(() => {
      const timeSinceLastGesture = Date.now() - lastGestureTime

      if (isGestureDetected && timeSinceLastGesture > WORD_TIMEOUT) {
        setIsGestureDetected(false)
        finalizeWord()
      }
    }, 500)

    return () => clearInterval(checkInterval)
  }, [isProcessing, lastGestureTime, isGestureDetected, finalizeWord])

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("[v0] Camera access error:", err)
      setError("Unable to access camera. Please ensure camera permissions are granted.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
    setIsProcessing(false)
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current)
    }
    if (wordTimeoutRef.current) {
      clearTimeout(wordTimeoutRef.current)
    }
  }, [])

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return null

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return null

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw mirrored frame
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(video, -canvas.width, 0)
    ctx.restore()

    return canvas.toDataURL("image/jpeg", 0.8)
  }, [isStreaming])

  const processFrame = useCallback(async () => {
    if (!isProcessing || !isStreaming) return

    const frameData = captureFrame()
    if (!frameData) return

    // Calculate FPS
    frameCountRef.current++
    const now = Date.now()
    if (now - lastTimeRef.current >= 1000) {
      setFps(frameCountRef.current)
      frameCountRef.current = 0
      lastTimeRef.current = now
    }

    try {
      const result = await predictSign(frameData)
      setPrediction(result)

      handleLetterDetected(result.sign, result.confidence)
    } catch (err) {
      console.error("[v0] Prediction error:", err)
    }
  }, [isProcessing, isStreaming, captureFrame, handleLetterDetected])

  const toggleProcessing = useCallback(() => {
    if (isProcessing) {
      setIsProcessing(false)
      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current)
      }
      // Finalize any pending word when stopping
      if (currentWord) {
        finalizeWord()
      }
    } else {
      setIsProcessing(true)
      setLastGestureTime(Date.now())
    }
  }, [isProcessing, currentWord, finalizeWord])

  // Process frames at configured interval
  useEffect(() => {
    if (isProcessing && isStreaming) {
      processingIntervalRef.current = setInterval(processFrame, FRAME_CAPTURE_INTERVAL)
    }

    return () => {
      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current)
      }
    }
  }, [isProcessing, isStreaming, processFrame])

  const addSpace = useCallback(() => {
    if (currentWord) {
      finalizeWord()
    }
  }, [currentWord, finalizeWord])

  const speakSentence = useCallback(() => {
    const fullText = sentence + (currentWord ? ` ${currentWord}` : "")
    if (fullText.trim()) {
      speak(fullText.trim(), 0.85)
    }
  }, [sentence, currentWord, speak])

  const clearAll = useCallback(() => {
    setCurrentLetter("")
    setCurrentWord("")
    setSentence("")
    setLastDetectedLetter("")
    setPrediction(null)
    setLetterCount(0)
    setWordCount(0)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }, [])

  const clearWord = useCallback(() => {
    setCurrentWord("")
    setCurrentLetter("")
    setLastDetectedLetter("")
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Feed */}
      <div className="lg:col-span-2">
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Live Video Feed
              </CardTitle>
              <div className="flex items-center gap-2">
                {isStreaming && (
                  <Badge variant="outline" className="gap-1 border-success text-success">
                    <Activity className="w-3 h-3" />
                    {fps} FPS
                  </Badge>
                )}
                {isProcessing && (
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Zap className="w-3 h-3" />
                    Processing
                  </Badge>
                )}
                {isGestureDetected && (
                  <Badge className="bg-success text-success-foreground gap-1">
                    <Hand className="w-3 h-3" />
                    Gesture
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-secondary rounded-xl overflow-hidden mb-4">
              {!isStreaming && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <CameraOff className="w-16 h-16 mb-4 opacity-50" />
                  <p>Camera not started</p>
                  <p className="text-sm">Click &quot;Start Camera&quot; to begin</p>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-destructive p-4">
                  <CameraOff className="w-16 h-16 mb-4" />
                  <p className="text-center">{error}</p>
                </div>
              )}

              <video ref={videoRef} className="w-full h-full object-cover webcam-mirror" playsInline muted />

              <canvas ref={canvasRef} className="hidden" />

              {isProcessing && prediction && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary-foreground">{currentLetter || "?"}</span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Current Letter</p>
                          <p className="text-lg font-semibold text-foreground">
                            {prediction.description?.split(" - ")[0] || "Detecting..."}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={prediction.confidence > 0.8 ? "default" : "secondary"}
                        className={prediction.confidence > 0.8 ? "bg-success text-success-foreground" : ""}
                      >
                        {(prediction.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={prediction.confidence * 100} className="h-2" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {!isStreaming ? (
                <Button onClick={startCamera} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Camera className="w-4 h-4" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
                  >
                    <CameraOff className="w-4 h-4" />
                    Stop
                  </Button>
                  <Button
                    onClick={toggleProcessing}
                    className={
                      isProcessing
                        ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
                        : "bg-success text-success-foreground hover:bg-success/90 gap-2"
                    }
                  >
                    {isProcessing ? (
                      <>
                        <Activity className="w-4 h-4" />
                        Stop Recognition
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Start Recognition
                      </>
                    )}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className="gap-2 border-border text-foreground hover:bg-secondary"
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {speechEnabled ? "Speech On" : "Speech Off"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel with Word Builder and Sentence Builder */}
      <div className="space-y-4">
        {/* Current Word Builder */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Word Builder
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearWord}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                  title="Clear word"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addSpace}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                  title="Add space (finalize word)"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[80px] bg-secondary rounded-lg p-4 flex items-center justify-center">
              {currentWord ? (
                <p className="text-3xl font-bold text-foreground tracking-wider">
                  {currentWord}
                  <span className="animate-pulse text-primary">|</span>
                </p>
              ) : (
                <p className="text-muted-foreground">Show signs to build a word...</p>
              )}
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Letters: {currentWord.length}</span>
              <span>Total detected: {letterCount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Sentence Builder */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Sentence Builder
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={speakSentence}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                  title="Speak sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[120px] bg-secondary rounded-lg p-4">
              {sentence || currentWord ? (
                <p className="text-xl text-foreground leading-relaxed">
                  {sentence}
                  {sentence && currentWord && " "}
                  {currentWord && <span className="text-primary font-semibold">{currentWord}</span>}
                </p>
              ) : (
                <p className="text-muted-foreground text-center py-4">Your sentence will appear here...</p>
              )}
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Words: {wordCount}</span>
              <span>Characters: {sentence.length + currentWord.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Prediction Details */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Hand className="w-5 h-5 text-primary" />
              Detection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prediction ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{prediction.sign}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{prediction.sign}</p>
                      <p className="text-xs text-muted-foreground">
                        {prediction.confidence > MIN_CONFIDENCE ? "Detected" : "Low confidence"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      prediction.confidence > 0.8
                        ? "default"
                        : prediction.confidence > MIN_CONFIDENCE
                          ? "secondary"
                          : "outline"
                    }
                    className={prediction.confidence > 0.8 ? "bg-success text-success-foreground" : ""}
                  >
                    {(prediction.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Alternatives:</p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.alternatives?.slice(0, 3).map((alt, i) => (
                      <Badge key={i} variant="outline" className="border-border text-foreground text-xs">
                        {alt.sign} {(alt.confidence * 100).toFixed(0)}%
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Hand className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Start recognition to detect signs</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={addSpace}
                variant="outline"
                className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
                disabled={!currentWord}
              >
                <CornerDownLeft className="w-4 h-4" />
                Add Space
              </Button>
              <Button
                onClick={speakSentence}
                variant="outline"
                className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
                disabled={!sentence && !currentWord}
              >
                <Volume2 className="w-4 h-4" />
                Speak All
              </Button>
              <Button
                onClick={clearWord}
                variant="outline"
                className="gap-2 border-border text-muted-foreground hover:bg-secondary hover:text-foreground bg-transparent"
                disabled={!currentWord}
              >
                <RotateCcw className="w-4 h-4" />
                Clear Word
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                disabled={!sentence && !currentWord}
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

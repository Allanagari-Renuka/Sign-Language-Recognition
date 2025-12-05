"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, Trash2, Clock, CheckCircle2 } from "lucide-react"

interface HistoryItem {
  id: string
  sign: string
  confidence: number
  timestamp: Date
  sentence?: string
}

// Simulated history data
const mockHistory: HistoryItem[] = [
  { id: "1", sign: "Hello", confidence: 0.95, timestamp: new Date(Date.now() - 60000), sentence: "Hello how are you" },
  {
    id: "2",
    sign: "Thank You",
    confidence: 0.88,
    timestamp: new Date(Date.now() - 120000),
    sentence: "Thank you very much",
  },
  { id: "3", sign: "Please", confidence: 0.92, timestamp: new Date(Date.now() - 180000) },
  { id: "4", sign: "Help", confidence: 0.85, timestamp: new Date(Date.now() - 240000), sentence: "I need help" },
  { id: "5", sign: "Yes", confidence: 0.97, timestamp: new Date(Date.now() - 300000) },
]

export default function RecognitionHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory)

  const clearHistory = () => {
    setHistory([])
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Recognition History
          </CardTitle>
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="gap-2 border-border text-muted-foreground hover:text-foreground bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{item.sign.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.sign}</p>
                    {item.sentence && <p className="text-sm text-muted-foreground">"{item.sentence}"</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={item.confidence > 0.9 ? "default" : "outline"}
                    className={item.confidence > 0.9 ? "bg-success text-success-foreground" : "border-border"}
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {(item.confidence * 100).toFixed(0)}%
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatTime(item.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No recognition history yet</p>
            <p className="text-sm">Start recognizing signs to see your history here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, History, BookOpen, Settings } from "lucide-react"
import WebcamCapture from "@/components/webcam-capture"
import RecognitionHistory from "@/components/recognition-history"
import ASLReference from "@/components/asl-reference"
import SettingsPanel from "@/components/settings-panel"

export default function RecognitionDashboard() {
  const [activeTab, setActiveTab] = useState("live")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Recognition Dashboard</h1>
        <p className="text-muted-foreground">Real-time ASL recognition with CNN-LSTM deep learning</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-4 mb-8 bg-card">
          <TabsTrigger
            value="live"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Live</span>
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger
            value="reference"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Reference</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <WebcamCapture />
        </TabsContent>

        <TabsContent value="history">
          <RecognitionHistory />
        </TabsContent>

        <TabsContent value="reference">
          <ASLReference />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}

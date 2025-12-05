"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Settings, Volume2, Eye, Zap, Save, RotateCcw } from "lucide-react"

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    speechEnabled: true,
    speechRate: 0.9,
    confidenceThreshold: 70,
    showOverlay: true,
    processingFps: 10,
    mirrorVideo: true,
    language: "asl",
    highContrast: false,
  })

  const updateSetting = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings({
      speechEnabled: true,
      speechRate: 0.9,
      confidenceThreshold: 70,
      showOverlay: true,
      processingFps: 10,
      mirrorVideo: true,
      language: "asl",
      highContrast: false,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Speech Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            Speech Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">Configure text-to-speech output</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Enable Speech Output</Label>
              <p className="text-sm text-muted-foreground">Speak recognized signs aloud</p>
            </div>
            <Switch
              checked={settings.speechEnabled}
              onCheckedChange={(checked) => updateSetting("speechEnabled", checked)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-foreground">Speech Rate</Label>
              <span className="text-sm text-muted-foreground">{settings.speechRate.toFixed(1)}x</span>
            </div>
            <Slider
              value={[settings.speechRate * 100]}
              onValueChange={([value]) => updateSetting("speechRate", value / 100)}
              min={50}
              max={150}
              step={10}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recognition Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Recognition Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">Configure model inference parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-foreground">Confidence Threshold</Label>
              <span className="text-sm text-muted-foreground">{settings.confidenceThreshold}%</span>
            </div>
            <Slider
              value={[settings.confidenceThreshold]}
              onValueChange={([value]) => updateSetting("confidenceThreshold", value)}
              min={50}
              max={95}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Only show predictions above this confidence level</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-foreground">Processing FPS</Label>
              <span className="text-sm text-muted-foreground">{settings.processingFps} FPS</span>
            </div>
            <Slider
              value={[settings.processingFps]}
              onValueChange={([value]) => updateSetting("processingFps", value)}
              min={5}
              max={30}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Higher FPS = more responsive, but uses more resources</p>
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Display Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">Customize the visual interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Show Recognition Overlay</Label>
              <p className="text-sm text-muted-foreground">Display predictions on video</p>
            </div>
            <Switch
              checked={settings.showOverlay}
              onCheckedChange={(checked) => updateSetting("showOverlay", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Mirror Video</Label>
              <p className="text-sm text-muted-foreground">Flip video horizontally</p>
            </div>
            <Switch
              checked={settings.mirrorVideo}
              onCheckedChange={(checked) => updateSetting("mirrorVideo", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">Enhanced visibility for accessibility</p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting("highContrast", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Language & Model
          </CardTitle>
          <CardDescription className="text-muted-foreground">Select sign language and model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-foreground">Sign Language</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
                <SelectItem value="bsl" disabled>
                  British Sign Language (BSL) - Coming Soon
                </SelectItem>
                <SelectItem value="isl" disabled>
                  Indian Sign Language (ISL) - Coming Soon
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={resetSettings}
              variant="outline"
              className="flex-1 gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

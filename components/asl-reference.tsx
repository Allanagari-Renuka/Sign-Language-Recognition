"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Hand, ImageIcon } from "lucide-react"
import Image from "next/image"

interface SignInfo {
  sign: string
  category: string
  description: string
  handShape: string
  movement: string
}

const aslSigns: SignInfo[] = [
  {
    sign: "A",
    category: "alphabet",
    description: "Fist with thumb on side",
    handShape: "Closed fist",
    movement: "Static",
  },
  {
    sign: "B",
    category: "alphabet",
    description: "Flat hand, fingers together, thumb tucked",
    handShape: "Flat palm",
    movement: "Static",
  },
  {
    sign: "C",
    category: "alphabet",
    description: "Curved hand like holding a ball",
    handShape: "C-shape",
    movement: "Static",
  },
  {
    sign: "D",
    category: "alphabet",
    description: "Index up, other fingers touch thumb in circle",
    handShape: "D-shape",
    movement: "Static",
  },
  {
    sign: "E",
    category: "alphabet",
    description: "Curved fingers touching thumb",
    handShape: "Claw",
    movement: "Static",
  },
  {
    sign: "F",
    category: "alphabet",
    description: "Thumb and index touch, other fingers up",
    handShape: "F-shape",
    movement: "Static",
  },
  {
    sign: "G",
    category: "alphabet",
    description: "Index and thumb pointing sideways",
    handShape: "G-shape",
    movement: "Static",
  },
  {
    sign: "H",
    category: "alphabet",
    description: "Index and middle finger pointing sideways",
    handShape: "H-shape",
    movement: "Static",
  },
  {
    sign: "I",
    category: "alphabet",
    description: "Pinky finger up, other fingers in fist",
    handShape: "Pinky up",
    movement: "Static",
  },
  {
    sign: "J",
    category: "alphabet",
    description: "Pinky traces J shape in the air",
    handShape: "Pinky up",
    movement: "J-motion",
  },
  {
    sign: "K",
    category: "alphabet",
    description: "Index and middle up, thumb between them",
    handShape: "K-shape",
    movement: "Static",
  },
  {
    sign: "L",
    category: "alphabet",
    description: "L shape with index and thumb",
    handShape: "L-shape",
    movement: "Static",
  },
  {
    sign: "M",
    category: "alphabet",
    description: "Three fingers over thumb",
    handShape: "M-shape",
    movement: "Static",
  },
  { sign: "N", category: "alphabet", description: "Two fingers over thumb", handShape: "N-shape", movement: "Static" },
  {
    sign: "O",
    category: "alphabet",
    description: "Fingers curved touching thumb in O",
    handShape: "O-shape",
    movement: "Static",
  },
  {
    sign: "P",
    category: "alphabet",
    description: "K handshape pointing down",
    handShape: "P-shape",
    movement: "Static",
  },
  {
    sign: "Q",
    category: "alphabet",
    description: "G handshape pointing down",
    handShape: "Q-shape",
    movement: "Static",
  },
  {
    sign: "R",
    category: "alphabet",
    description: "Crossed index and middle fingers",
    handShape: "R-shape",
    movement: "Static",
  },
  {
    sign: "S",
    category: "alphabet",
    description: "Fist with thumb over fingers",
    handShape: "Closed fist",
    movement: "Static",
  },
  {
    sign: "T",
    category: "alphabet",
    description: "Thumb between index and middle",
    handShape: "T-shape",
    movement: "Static",
  },
  {
    sign: "U",
    category: "alphabet",
    description: "Index and middle together, pointing up",
    handShape: "U-shape",
    movement: "Static",
  },
  {
    sign: "V",
    category: "alphabet",
    description: "Peace sign, index and middle spread",
    handShape: "V-shape",
    movement: "Static",
  },
  {
    sign: "W",
    category: "alphabet",
    description: "Three fingers up and spread",
    handShape: "W-shape",
    movement: "Static",
  },
  {
    sign: "X",
    category: "alphabet",
    description: "Index finger bent like hook",
    handShape: "X-shape",
    movement: "Static",
  },
  {
    sign: "Y",
    category: "alphabet",
    description: "Thumb and pinky extended",
    handShape: "Y-shape",
    movement: "Static",
  },
  {
    sign: "Z",
    category: "alphabet",
    description: "Index traces Z shape in the air",
    handShape: "Index up",
    movement: "Z-motion",
  },
  {
    sign: "Hello",
    category: "greetings",
    description: "Wave hand near forehead",
    handShape: "Open palm",
    movement: "Wave motion",
  },
  {
    sign: "Goodbye",
    category: "greetings",
    description: "Open palm, fingers wave",
    handShape: "Open palm",
    movement: "Wave down",
  },
  {
    sign: "Thank You",
    category: "common",
    description: "Flat hand from chin outward",
    handShape: "Flat palm",
    movement: "Forward from chin",
  },
  {
    sign: "Please",
    category: "common",
    description: "Flat hand circles on chest",
    handShape: "Flat palm",
    movement: "Circular on chest",
  },
  {
    sign: "Sorry",
    category: "common",
    description: "Fist circles on chest",
    handShape: "Closed fist",
    movement: "Circular on chest",
  },
  {
    sign: "Yes",
    category: "common",
    description: "Fist nods like head",
    handShape: "Closed fist",
    movement: "Nodding motion",
  },
  {
    sign: "No",
    category: "common",
    description: "Index and middle finger tap thumb",
    handShape: "Open hand",
    movement: "Pinching",
  },
  {
    sign: "Help",
    category: "common",
    description: "Thumbs up on flat palm, lift up",
    handShape: "Thumbs up",
    movement: "Upward",
  },
  {
    sign: "I Love You",
    category: "common",
    description: "Pinky, index, and thumb extended",
    handShape: "ILY hand",
    movement: "Static",
  },
  {
    sign: "Water",
    category: "common",
    description: "W handshape taps chin",
    handShape: "W-shape",
    movement: "Tap chin",
  },
  {
    sign: "1",
    category: "numbers",
    description: "Index finger pointing up",
    handShape: "Index up",
    movement: "Static",
  },
  { sign: "2", category: "numbers", description: "Peace sign", handShape: "V-shape", movement: "Static" },
  {
    sign: "3",
    category: "numbers",
    description: "Thumb, index, middle extended",
    handShape: "3-shape",
    movement: "Static",
  },
  {
    sign: "4",
    category: "numbers",
    description: "Four fingers extended, no thumb",
    handShape: "4-shape",
    movement: "Static",
  },
  { sign: "5", category: "numbers", description: "All fingers extended", handShape: "Open palm", movement: "Static" },
  { sign: "6", category: "numbers", description: "Thumb touches pinky", handShape: "6-shape", movement: "Static" },
  {
    sign: "7",
    category: "numbers",
    description: "Thumb touches ring finger",
    handShape: "7-shape",
    movement: "Static",
  },
  {
    sign: "8",
    category: "numbers",
    description: "Thumb touches middle finger",
    handShape: "8-shape",
    movement: "Static",
  },
  {
    sign: "9",
    category: "numbers",
    description: "Thumb touches index finger",
    handShape: "9-shape",
    movement: "Static",
  },
  { sign: "10", category: "numbers", description: "Thumb up, shake hand", handShape: "Thumbs up", movement: "Shake" },
]

export default function ASLReference() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAlphabetChart, setShowAlphabetChart] = useState(true)

  const categories = ["all", "alphabet", "numbers", "greetings", "common"]

  const filteredSigns = aslSigns.filter((sign) => {
    const matchesSearch =
      sign.sign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || sign.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              ASL Alphabet Chart
            </CardTitle>
            <button
              onClick={() => setShowAlphabetChart(!showAlphabetChart)}
              className="text-sm text-primary hover:underline"
            >
              {showAlphabetChart ? "Hide Chart" : "Show Chart"}
            </button>
          </div>
        </CardHeader>
        {showAlphabetChart && (
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-xl bg-secondary p-4">
              <Image
                src="/images/asl-alphabet.png"
                alt="Complete ASL Alphabet showing hand signs for letters A through Z"
                width={1200}
                height={400}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                American Sign Language (ASL) fingerspelling alphabet - Use these hand shapes to spell words letter by
                letter
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Existing Reference Guide */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            ASL Reference Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search signs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border text-foreground"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-5 bg-secondary">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Signs Count */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredSigns.length} of {aslSigns.length} signs
              </span>
              {activeCategory === "alphabet" && (
                <Badge variant="outline" className="border-primary text-primary">
                  A-Z Complete
                </Badge>
              )}
            </div>

            {/* Signs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSigns.map((sign, index) => (
                <div key={index} className="p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold text-primary">{sign.sign}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{sign.sign}</h3>
                        <Badge variant="outline" className="text-xs border-border capitalize">
                          {sign.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{sign.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-background rounded text-muted-foreground">
                          <Hand className="w-3 h-3 inline mr-1" />
                          {sign.handShape}
                        </span>
                        <span className="px-2 py-1 bg-background rounded text-muted-foreground">{sign.movement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSigns.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No signs found matching your search</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

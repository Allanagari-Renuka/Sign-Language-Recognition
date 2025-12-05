import Navigation from "@/components/navigation"
import RecognitionDashboard from "@/components/recognition-dashboard"

export default function RecognizePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <RecognitionDashboard />
      </div>
    </main>
  )
}

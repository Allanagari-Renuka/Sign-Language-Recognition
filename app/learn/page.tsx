import Navigation from "@/components/navigation"
import LearnContent from "@/components/learn-content"
import Footer from "@/components/footer"

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <LearnContent />
      </div>
      <Footer />
    </main>
  )
}

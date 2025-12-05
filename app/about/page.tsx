import Navigation from "@/components/navigation"
import AboutContent from "@/components/about-content"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <AboutContent />
      </div>
      <Footer />
    </main>
  )
}

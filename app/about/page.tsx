import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { ValuesSection } from "@/components/about/values-section"
import { TeamSection } from "@/components/about/team-section"
import { CTASection } from "@/components/home/cta-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <ValuesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  )
}

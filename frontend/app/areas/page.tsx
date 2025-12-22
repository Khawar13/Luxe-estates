import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AreasHero } from "@/components/areas/areas-hero"
import { AreasGrid } from "@/components/areas/areas-grid"
import { AreaStats } from "@/components/areas/area-stats"
import { ParticleBackground } from "@/components/ui/particle-background"

export default function AreasPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <AreasHero />
        <AreasGrid />
        <AreaStats />
        <Footer />
      </div>
    </main>
  )
}

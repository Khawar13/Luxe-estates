import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AreasHero } from "@/components/areas/areas-hero"
import { AreasGrid } from "@/components/areas/areas-grid"
import { AreaStats } from "@/components/areas/area-stats"

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AreasHero />
      <AreasGrid />
      <AreaStats />
      <Footer />
    </main>
  )
}

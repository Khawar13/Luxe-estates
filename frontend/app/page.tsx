import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { AreasSection } from "@/components/home/areas-section"
import { ServicesSection } from "@/components/home/services-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <AreasSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

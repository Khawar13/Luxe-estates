"use client"

import { use, useEffect, useRef } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { animate } from "animejs"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/property-detail/image-gallery"
import { PropertyInfo } from "@/components/property-detail/property-info"
import { ContactAgent } from "@/components/property-detail/contact-agent"
import { SimilarProperties } from "@/components/property-detail/similar-properties"
import { getPropertyById } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function PropertyDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const property = getPropertyById(id)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Page entrance animation
    if (pageRef.current) {
      animate(pageRef.current, {
        opacity: [0, 1],
        duration: 600,
        ease: "outExpo",
      })
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id])

  if (!property) {
    notFound()
  }

  return (
    <main ref={pageRef} className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Properties</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <ImageGallery images={property.images} title={property.title} />
              <PropertyInfo property={property} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ContactAgent propertyTitle={property.title} />
            </div>
          </div>

          {/* Similar Properties */}
          <SimilarProperties currentProperty={property} />
        </div>
      </div>

      <Footer />
    </main>
  )
}

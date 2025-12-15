"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { animate, stagger } from "animejs"
import { ArrowRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { getFeaturedProperties } from "@/lib/mock-data"
import { GoldShimmerText } from "@/components/ui/text-animations"
import { ShineLinkButton } from "@/components/ui/shine-button"

export function FeaturedProperties() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const featuredProperties = getFeaturedProperties()

  useEffect(() => {
    if (isInView && titleRef.current) {
      const words = titleRef.current.querySelectorAll(".word")
      animate(words, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: stagger(100),
        ease: "outExpo",
      })
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm tracking-widest uppercase text-accent mb-4 block"
            >
              Handpicked Selection
            </motion.span>
            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="word inline-block opacity-0">Featured</span>{" "}
              <GoldShimmerText className="word inline-block opacity-0">Properties</GoldShimmerText>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/properties">
              <ShineLinkButton variant="outline" size="lg">
                <span className="shine-text">View All Properties</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </ShineLinkButton>
            </Link>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.slice(0, 6).map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

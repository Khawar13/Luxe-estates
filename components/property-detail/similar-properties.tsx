"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { animate, stagger } from "animejs"
import { PropertyCard } from "@/components/property-card"
import { properties, type Property } from "@/lib/mock-data"

interface SimilarPropertiesProps {
  currentProperty: Property
}

export function SimilarProperties({ currentProperty }: SimilarPropertiesProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && titleRef.current) {
      animate(titleRef.current.querySelectorAll(".word"), {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: stagger(100),
        ease: "outExpo",
      })
    }
  }, [isInView])

  // Get similar properties (same area or type, excluding current)
  const similarProperties = properties
    .filter((p) => p.id !== currentProperty.id && (p.area === currentProperty.area || p.type === currentProperty.type))
    .slice(0, 3)

  if (similarProperties.length === 0) return null

  return (
    <section ref={sectionRef} className="py-16 border-t border-border">
      <div className="mb-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-widest uppercase text-accent mb-4 block"
        >
          You May Also Like
        </motion.span>
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-serif font-bold">
          <span className="word inline-block opacity-0">Similar</span>{" "}
          <span className="word inline-block opacity-0 text-accent">Properties</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {similarProperties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </section>
  )
}

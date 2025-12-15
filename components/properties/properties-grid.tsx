"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animate, stagger } from "animejs"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/lib/mock-data"
import { Home } from "lucide-react"

interface PropertiesGridProps {
  properties: Property[]
  isLoading?: boolean
}

export function PropertiesGrid({ properties, isLoading }: PropertiesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current && properties.length > 0) {
      animate(gridRef.current.querySelectorAll(".property-item"), {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.95, 1],
        duration: 700,
        delay: stagger(100, { grid: [3, Math.ceil(properties.length / 3)], from: "first" }),
        ease: "outExpo",
      })
    }
  }, [properties])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-secondary rounded-2xl aspect-[4/3]" />
            <div className="p-6">
              <div className="h-6 bg-secondary rounded w-1/2 mb-3" />
              <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
              <div className="h-4 bg-secondary rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Home className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-serif font-semibold mb-2">No Properties Found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any properties matching your criteria. Try adjusting your filters.
        </p>
      </motion.div>
    )
  }

  return (
    <div ref={gridRef}>
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              layout
              className="property-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyCard property={property} index={index} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

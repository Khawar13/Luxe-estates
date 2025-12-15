"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { animate, stagger } from "animejs"
import { MapPin, Bed, Bath, Square, Home, Calendar, Heart, Share2, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/mock-data"

interface PropertyInfoProps {
  property: Property
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  const statsRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statsRef.current) {
      animate(statsRef.current.querySelectorAll(".stat-item"), {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: stagger(80, { start: 300 }),
        ease: "outExpo",
      })
    }
  }, [])

  useEffect(() => {
    if (amenitiesRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && amenitiesRef.current) {
              animate(amenitiesRef.current.querySelectorAll(".amenity-item"), {
                opacity: [0, 1],
                translateX: [-20, 0],
                duration: 500,
                delay: stagger(60),
                ease: "outExpo",
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 },
      )
      observer.observe(amenitiesRef.current)
    }
  }, [])

  const formatPrice = (price: number, type: "sale" | "rent") => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/mo`
    }
    return `$${price.toLocaleString()}`
  }

  const stats = [
    { icon: Bed, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Square, label: "Square Feet", value: property.sqft.toLocaleString() },
    { icon: Home, label: "Type", value: property.type },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
            For {property.priceType === "sale" ? "Sale" : "Rent"}
          </span>
          {property.featured && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              Featured
            </span>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4"
        >
          {property.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 text-muted-foreground mb-6"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{property.location}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-baseline gap-4"
        >
          <span className="text-4xl md:text-5xl font-serif font-bold text-accent">
            {formatPrice(property.price, property.priceType)}
          </span>
        </motion.div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item p-4 bg-secondary/50 rounded-xl text-center"
            whileHover={{ y: -5, backgroundColor: "var(--secondary)" }}
            transition={{ duration: 0.2 }}
          >
            <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
            <div className="text-xl font-semibold capitalize">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Tour
        </Button>
        <Button size="lg" variant="outline" className="bg-transparent">
          <Heart className="w-5 h-5 mr-2" />
          Save
        </Button>
        <Button size="lg" variant="outline" className="bg-transparent">
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
        <Button size="lg" variant="outline" className="bg-transparent">
          <Printer className="w-5 h-5 mr-2" />
          Print
        </Button>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-serif font-bold mb-4">About This Property</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">{property.description}</p>
      </motion.div>

      {/* Amenities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-serif font-bold mb-6">Amenities & Features</h2>
        <div ref={amenitiesRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.amenities.map((amenity, index) => (
            <div
              key={index}
              className="amenity-item flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <span className="font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

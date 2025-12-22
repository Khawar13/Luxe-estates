"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react"
import type { Property } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isLiked, setIsLiked] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const formatPrice = (price: number, type: "sale" | "rent") => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/mo`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative overflow-visible rounded-2xl p-[2px]"
    >
      {/* Rotating beam border - always visible */}
      <span className="absolute inset-0 rounded-2xl overflow-hidden">
        <span className="absolute inset-0 opacity-100">
          <span className="absolute inset-[-100%] animate-beam-rotate">
            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_30deg,#c4a484_90deg,#f5e6d3_180deg,#d4a574_270deg,transparent_330deg,transparent_360deg)] blur-md" />
            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_40deg,#c4a484_100deg,#f5e6d3_180deg,#d4a574_260deg,transparent_320deg,transparent_360deg)] blur-sm" />
          </span>
        </span>
      </span>

      <Link href={`/properties/${property.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md",
                  property.priceType === "sale"
                    ? "bg-accent/90 text-accent-foreground"
                    : "bg-primary/90 text-primary-foreground",
                )}
              >
                For {property.priceType === "sale" ? "Sale" : "Rent"}
              </span>
              {property.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground backdrop-blur-md">
                  Featured
                </span>
              )}
            </div>

            {/* Like Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn("w-5 h-5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-foreground")}
              />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6" style={{ transform: "translateZ(50px)" }}>
            {/* Price */}
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-2xl font-serif font-bold text-foreground">
                {formatPrice(property.price, property.priceType)}
              </span>
              <span className="text-sm text-muted-foreground capitalize">{property.type}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors">
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm line-clamp-1">{property.location}</span>
            </div>

            {/* Features */}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Square className="w-4 h-4" />
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

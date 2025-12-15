"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Building, TrendingUp } from "lucide-react"
import type { Area } from "@/lib/mock-data"

interface AreaCardProps {
  area: Area
  index: number
  layout?: "large" | "normal"
}

export function AreaCard({ area, index, layout = "normal" }: AreaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 50 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 50 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])
  const brightness = useTransform(mouseXSpring, [-0.5, 0.5], [0.9, 1.1])

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

  const isLarge = layout === "large"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        filter: `brightness(${brightness.get()})`,
      }}
      className={`group relative overflow-visible rounded-3xl p-[2px] ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      {/* Rotating beam border - always visible */}
      <span className="absolute inset-0 rounded-3xl overflow-hidden">
        <span className="absolute inset-0 opacity-100">
          <span className="absolute inset-[-100%] animate-beam-rotate">
            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_30deg,#c4a484_90deg,#f5e6d3_180deg,#d4a574_270deg,transparent_330deg,transparent_360deg)] blur-md" />
            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_40deg,#c4a484_100deg,#f5e6d3_180deg,#d4a574_260deg,transparent_320deg,transparent_360deg)] blur-sm" />
          </span>
        </span>
      </span>

      <Link href={`/areas/${area.id}`}>
        <div
          className={`relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-shadow duration-500 ${isLarge ? "aspect-square md:aspect-[16/10]" : "aspect-[4/3]"}`}
        >
          {/* Image */}
          <Image
            src={area.image || "/placeholder.svg"}
            alt={area.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Floating Badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md flex items-center gap-2"
            style={{ transform: "translateZ(30px)" }}
          >
            <Building className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">{area.propertyCount} Properties</span>
          </motion.div>

          {/* Content */}
          <motion.div
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Trending Badge (for large cards) */}
            {isLarge && (
              <div className="flex items-center gap-2 text-accent mb-3">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Trending Area</span>
              </div>
            )}

            <h3
              className={`font-serif font-bold text-white mb-2 ${isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
            >
              {area.name}
            </h3>
            <p className={`text-white/70 mb-4 ${isLarge ? "text-base md:text-lg max-w-md" : "text-sm line-clamp-2"}`}>
              {area.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
              <span className="text-sm font-medium">Explore Properties</span>
              <motion.div
                className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-4 h-4 text-accent-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

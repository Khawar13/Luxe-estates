"use client"

import { use, useEffect, useRef } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { animate, stagger, utils } from "animejs"
import { ArrowLeft, MapPin, Building, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { areas, getPropertiesByArea } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function AreaDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const area = areas.find((a) => a.id === id)
  const properties = getPropertiesByArea(id)
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char")
      animate(chars, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        delay: stagger(30, { start: 500 }),
        ease: "outExpo",
      })
    }

    // Floating elements animation
    animate(".float-element", {
      translateY: () => utils.random(-20, 20),
      duration: () => utils.random(2000, 4000),
      alternate: true,
      loop: true,
      ease: "inOutSine",
    })
  }, [])

  if (!area) {
    notFound()
  }

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ opacity: 0 }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
          <Image src={area.image || "/placeholder.svg"} alt={area.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="float-element absolute w-3 h-3 rounded-full bg-accent/30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-16"
          style={{ opacity }}
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-24 left-6"
          >
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>All Areas</span>
            </Link>
          </motion.div>

          {/* Content */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Popular Area
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium flex items-center gap-2">
                <Building className="w-4 h-4" />
                {area.propertyCount} Properties
              </span>
            </motion.div>

            <div ref={textRef}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4">
                {splitText(area.name)}
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 text-white/80"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{area.description}</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Properties Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-sm tracking-widest uppercase text-accent mb-4 block">Available Properties</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Properties in <span className="text-accent">{area.name}</span>
            </h2>
          </motion.div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-secondary/30 rounded-3xl"
            >
              <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-serif font-semibold mb-2">No Properties Available</h3>
              <p className="text-muted-foreground">Check back soon for new listings in this area.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

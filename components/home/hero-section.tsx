"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { animate, stagger, utils } from "animejs"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { GoldShimmerText } from "@/components/ui/text-animations"
import { LiquidButton } from "@/components/ui/premium-buttons"
import { ShineLinkButton } from "@/components/ui/shine-button"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    // Animate text characters
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char")
      animate(chars, {
        opacity: [0, 1],
        translateY: [50, 0],
        rotateX: [90, 0],
        duration: 1200,
        delay: stagger(30, { start: 500 }),
        ease: "outExpo",
      })
    }

    // Floating particles animation
    animate(".particle", {
      translateY: () => utils.random(-30, 30),
      translateX: () => utils.random(-30, 30),
      scale: () => utils.random(0.8, 1.2),
      opacity: [0.3, 0.8, 0.3],
      duration: () => utils.random(3000, 5000),
      delay: () => utils.random(0, 2000),
      alternate: true,
      loop: true,
      ease: "inOutSine",
    })
  }, [])

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ opacity: 0 }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/home-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </motion.div>

      {/* Floating Particles - using deterministic positions to avoid SSR hydration mismatch */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-accent/30"
            style={{
              top: `${((i * 17 + 7) % 100)}%`,
              left: `${((i * 23 + 13) % 100)}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="relative z-20 container mx-auto px-6 pt-32 md:pt-0 text-center" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-foreground/80">Premium Real Estate Collection</span>
        </motion.div>

        <div ref={textRef} className="overflow-hidden">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6">
            <span className="block">{splitText("Your Dream")}</span>
            <span className="block">
              <GoldShimmerText>Home Awaits</GoldShimmerText>
            </span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed"
        >
          Curating the finest properties in the most prestigious locations. Your journey to exceptional living begins
          here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/properties">
            <ShineLinkButton variant="primary" size="lg">
              <span className="shine-text">Explore Properties</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </ShineLinkButton>
          </Link>
          <ShineLinkButton variant="outline" size="lg">
            <Play className="mr-2 w-5 h-5" />
            <span className="shine-text">Watch Tour</span>
          </ShineLinkButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "500+", label: "Properties" },
            { value: "50+", label: "Locations" },
            { value: "98%", label: "Happy Clients" },
            { value: "15+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter
                value={stat.value}
                className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-1 block"
                duration={2.5}
              />
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

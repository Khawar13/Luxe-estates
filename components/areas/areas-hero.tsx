"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { animate, stagger } from "animejs"

export function AreasHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".word")
      animate(words, {
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [45, 0],
        duration: 1000,
        delay: stagger(100, { start: 400 }),
        ease: "outExpo",
      })
    }

    // Background grid animation
    animate(".grid-line", {
      opacity: [0, 0.1],
      duration: 1500,
      delay: stagger(50),
      ease: "outExpo",
    })
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={`${i * 5}%`}
              y1="0"
              x2={`${i * 5}%`}
              y2="100%"
              className="grid-line stroke-accent/10"
              strokeWidth="1"
              style={{ opacity: 0 }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={`${i * 10}%`}
              x2="100%"
              y2={`${i * 10}%`}
              className="grid-line stroke-accent/10"
              strokeWidth="1"
              style={{ opacity: 0 }}
            />
          ))}
        </svg>
      </div>

      <motion.div className="relative z-10 container mx-auto px-6 text-center pt-32" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-foreground/80">Explore Our Neighborhoods</span>
        </motion.div>

        <div ref={textRef} className="perspective-1000">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
            <span className="word inline-block" style={{ opacity: 0 }}>
              Discover
            </span>{" "}
            <span className="word inline-block text-accent" style={{ opacity: 0 }}>
              Premium
            </span>
            <br />
            <span className="word inline-block" style={{ opacity: 0 }}>
              Locations
            </span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Each neighborhood offers its own unique character, lifestyle, and collection of exceptional properties.
        </motion.p>
      </motion.div>
    </section>
  )
}

"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { animate, stagger } from "animejs"
import { GoldShimmerText, BlurRevealText } from "@/components/ui/text-animations"

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGSVGElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    // Animate letters
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll(".letter")
      animate(letters, {
        opacity: [0, 1],
        translateY: [80, 0],
        rotateZ: [10, 0],
        duration: 1200,
        delay: stagger(40, { start: 300 }),
        ease: "outExpo",
      })
    }

    // Animate decorative line (simplified from v3 setDashoffset)
    if (lineRef.current) {
      const path = lineRef.current.querySelector("path")
      if (path) {
        const length = (path as SVGPathElement).getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
        animate(path, {
          strokeDashoffset: [length, 0],
          duration: 2000,
          delay: 800,
          ease: "inOutQuad",
        })
      }
    }

    // Floating circles
    animate(".about-circle", {
      scale: [0.8, 1.2],
      opacity: [0.3, 0.6],
      duration: 3000,
      alternate: true,
      loop: true,
      delay: stagger(500),
      ease: "inOutSine",
    })
  }, [])

  const splitWord = (word: string, className?: string) => {
    return word.split("").map((letter, i) => (
      <span
        key={i}
        className={`letter inline-block ${className || ""}`}
        style={{ opacity: 0, display: letter === " " ? "inline" : "inline-block" }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ))
  }

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />

        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl about-circle" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl about-circle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl about-circle" />
      </div>

      {/* Decorative SVG Line */}
      <svg
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 opacity-20"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 Q300,20 600,100 T1200,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent"
        />
      </svg>

      <motion.div className="relative z-10 container mx-auto px-6 text-center pt-32" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-foreground/80">Our Story</span>
        </motion.div>

        <div ref={textRef} className="mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold leading-tight">
            <span className="block">{splitWord("Redefining")}</span>
            <span className="block">
              <GoldShimmerText>{splitWord("Luxury")}</GoldShimmerText>
            </span>
            <span className="block">{splitWord("Living")}</span>
          </h1>
        </div>

        <BlurRevealText delay={1.5}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            For over 15 years, we've been curating extraordinary living experiences for discerning clients who expect
            nothing but the finest.
          </p>
        </BlurRevealText>
      </motion.div>
    </section>
  )
}

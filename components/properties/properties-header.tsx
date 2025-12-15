"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { animate, stagger } from "animejs"

interface PropertiesHeaderProps {
  totalCount: number
  filteredCount: number
}

export function PropertiesHeader({ totalCount, filteredCount }: PropertiesHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char")
      animate(chars, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: stagger(25, { start: 300 }),
        ease: "outExpo",
      })
    }
  }, [])

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ opacity: 0 }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <div className="pt-32 pb-12 bg-gradient-to-b from-secondary/50 to-transparent">
      <div className="container mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm tracking-widest uppercase text-accent mb-4 block"
        >
          Our Collection
        </motion.span>
        <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">
          {splitText("Properties")}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground"
        >
          Showing <span className="text-foreground font-medium">{filteredCount}</span> of{" "}
          <span className="text-foreground font-medium">{totalCount}</span> properties
        </motion.p>
      </div>
    </div>
  )
}

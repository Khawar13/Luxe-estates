"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { animate, stagger } from "animejs"
import { Diamond, Shield, Heart, Sparkles } from "lucide-react"

const values = [
  {
    icon: Diamond,
    title: "Excellence",
    description:
      "We pursue perfection in every detail, ensuring our clients receive nothing but the finest service and properties.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Trust is the foundation of our relationships. We operate with complete transparency and unwavering ethical standards.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our love for exceptional properties and creating perfect matches drives every interaction and recommendation.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We continuously evolve, embracing new technologies and approaches to enhance the luxury real estate experience.",
  },
]

export function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsRef.current) {
            animate(cardsRef.current.querySelectorAll(".value-card"), {
              opacity: [0, 1],
              translateY: [50, 0],
              rotateY: [20, 0],
              duration: 800,
              delay: stagger(150),
              ease: "outExpo",
            })

            animate(cardsRef.current.querySelectorAll(".value-icon"), {
              scale: [0, 1],
              rotate: [180, 0],
              duration: 1000,
              delay: stagger(150, { start: 300 }),
              ease: "outElastic(1, 0.5)",
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-accent mb-4 block"
          >
            What Drives Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold"
          >
            Our <span className="text-accent">Values</span>
          </motion.h2>
        </div>

        {/* Values Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card relative p-8 rounded-3xl bg-card shadow-lg hover:shadow-xl transition-shadow opacity-0 group"
              style={{ perspective: "1000px" }}
              whileHover={{ y: -10 }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="value-icon w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                  <value.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

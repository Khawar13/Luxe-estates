"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { animate, stagger } from "animejs"
import { Building, MapPin, Users, Award } from "lucide-react"

const stats = [
  { icon: Building, value: "500+", label: "Properties Listed" },
  { icon: MapPin, value: "6", label: "Premium Areas" },
  { icon: Users, value: "2000+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards Won" },
]

export function AreaStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && sectionRef.current) {
      // Animate counters (simplified for v4 - textContent animation)
      sectionRef.current.querySelectorAll(".stat-value").forEach((el: Element) => {
        const target = parseInt(el.getAttribute("data-value") || "0")
        animate(el, {
          textContent: [0, target],
          modifier: (value: number) => Math.round(value),
          duration: 2000,
          ease: "outExpo",
        })
      })

      // Animate icons
      animate(sectionRef.current.querySelectorAll(".stat-icon"), {
        scale: [0, 1],
        rotate: [180, 0],
        duration: 800,
        delay: stagger(100),
        ease: "outElastic(1, 0.5)",
      })
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="stat-icon w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <div
                className="stat-value text-4xl md:text-5xl font-serif font-bold mb-2"
                data-value={stat.value.replace(/\D/g, "")}
              >
                {stat.value}
              </div>
              <div className="text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

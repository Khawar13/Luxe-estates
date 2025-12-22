"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { animate, stagger } from "animejs"
import { Home, Key, TrendingUp, Shield, Users, Award } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Property Sales",
    description: "Expert guidance through every step of buying your dream property.",
  },
  {
    icon: Key,
    title: "Luxury Rentals",
    description: "Premium rental properties in the most prestigious locations.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Strategic insights for real estate investment opportunities.",
  },
  {
    icon: Shield,
    title: "Property Management",
    description: "Comprehensive management services for your valuable assets.",
  },
  {
    icon: Users,
    title: "Concierge Service",
    description: "Personalized assistance for all your real estate needs.",
  },
  {
    icon: Award,
    title: "Exclusive Listings",
    description: "Access to off-market and exclusive property opportunities.",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".service-card")
      animate(cards, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: stagger(100, { start: 200 }),
        ease: "outExpo",
      })
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-accent mb-4 block"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
          >
            Our <span className="text-accent">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-primary-foreground/70 leading-relaxed"
          >
            Comprehensive real estate services tailored to meet the unique needs of our discerning clientele.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card opacity-0 group p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-500">
                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">{service.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

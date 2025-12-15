"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { animate, stagger } from "animejs"

export function AboutStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textRef.current) {
            animate(textRef.current.querySelectorAll(".story-text"), {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: stagger(150),
              ease: "outExpo",
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Stack */}
          <div className="relative">
            <motion.div
              style={{ y: imageY, rotate: imageRotate }}
              className="relative z-10 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="/luxury-modern-office-interior-with-elegant-furnitu.jpg" alt="Our Office" fill className="object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 w-2/3 aspect-square rounded-3xl overflow-hidden shadow-xl border-8 border-background z-20"
            >
              <Image src="/team-meeting-in-luxury-real-estate-office.jpg" alt="Our Team" fill className="object-cover" />
            </motion.div>
            {/* Decorative Element */}
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
          </div>

          {/* Text Content */}
          <div ref={textRef} className="lg:pl-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="story-text text-sm tracking-widest uppercase text-accent mb-4 block"
            >
              Since 2008
            </motion.span>

            <h2 className="story-text text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 opacity-0">
              A Legacy of <span className="text-accent">Excellence</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="story-text opacity-0">
                Founded with a vision to transform the real estate experience, Luxe Estate has grown from a boutique
                agency to the region's premier luxury property specialists.
              </p>
              <p className="story-text opacity-0">
                Our approach is simple yet profound: we believe that finding the perfect home is about understanding the
                dreams, aspirations, and lifestyle of each client. We don't just sell properties; we curate living
                experiences.
              </p>
              <p className="story-text opacity-0">
                Every member of our team shares an unwavering commitment to excellence, discretion, and personalized
                service. This philosophy has earned us the trust of the most discerning clients and the most prestigious
                property portfolios.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border"
            >
              {[
                { value: "15+", label: "Years Experience" },
                { value: "$2B+", label: "Properties Sold" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

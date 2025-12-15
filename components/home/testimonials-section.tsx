"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { animate } from "animejs"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "CEO, Tech Innovators",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Luxe Estate exceeded all our expectations. Their attention to detail and understanding of luxury living made finding our dream penthouse an absolute pleasure.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Investment Banker",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "The level of service and expertise at Luxe Estate is unmatched. They found us the perfect waterfront property that we thought was impossible to find.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    role: "Interior Designer",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Working with Luxe Estate was a seamless experience from start to finish. Their curated selection of properties reflects impeccable taste and quality.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const quoteRef = useRef<HTMLDivElement>(null)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (quoteRef.current) {
      animate(quoteRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        ease: "outExpo",
      })
    }
  }, [current])

  const testimonial = testimonials[current]

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-accent mb-4 block"
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight"
          >
            What Our <span className="text-accent">Clients Say</span>
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl p-8 md:p-12 shadow-xl"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Quote className="w-6 h-6 text-accent-foreground" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-accent/20">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div ref={quoteRef} className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6 font-serif italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border hover:bg-secondary transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1)
                      setCurrent(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${index === current ? "w-8 bg-accent" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border hover:bg-secondary transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

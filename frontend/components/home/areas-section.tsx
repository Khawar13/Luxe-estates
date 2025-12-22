"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Building } from "lucide-react"
import { areas } from "@/lib/mock-data"

export function AreasSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-widest uppercase text-accent mb-4 block"
        >
          Prime Locations
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
        >
          Explore <span className="text-accent">Areas</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          Discover properties in the most sought-after neighborhoods, each offering its own unique character and
          lifestyle.
        </motion.p>
      </div>

      {/* Horizontal Scrolling Areas */}
      <motion.div className="flex gap-6 px-6" style={{ x }}>
        {areas.map((area, index) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[350px] md:w-[400px]"
          >
            <Link href={`/areas/${area.id}`} className="group block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={area.image || "/placeholder.svg"}
                  alt={area.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                    <Building className="w-4 h-4" />
                    <span>{area.propertyCount} Properties</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{area.name}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">{area.description}</p>
                  <div className="flex items-center gap-2 text-accent">
                    <span className="text-sm font-medium">Explore Area</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link */}
      <div className="container mx-auto px-6 mt-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium"
          >
            View All Areas
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { animate, stagger } from "animejs"
import { Linkedin, Mail, X } from "lucide-react"

const team = [
  {
    name: "Victoria Sterling",
    role: "Founder & CEO",
    image: "/professional-woman-portrait-elegant-business.jpg",
    bio: "With over 20 years in luxury real estate, Victoria founded Luxe Estate with a vision to redefine premium property services.",
    linkedin: "#",
    email: "victoria@luxeestate.com",
  },
  {
    name: "James Crawford",
    role: "Chief Operations Officer",
    image: "/professional-man-portrait-business-suit.jpg",
    bio: "James brings operational excellence and strategic vision to ensure seamless experiences for our clients.",
    linkedin: "#",
    email: "james@luxeestate.com",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Sales",
    image: "/professional-woman-portrait-friendly-smile-busines.jpg",
    bio: "Sarah leads our elite sales team with passion and an unmatched knowledge of the luxury market.",
    linkedin: "#",
    email: "sarah@luxeestate.com",
  },
  {
    name: "Michael Chen",
    role: "Senior Property Consultant",
    image: "/asian-professional-man-portrait-modern-business.jpg",
    bio: "Michael's expertise in high-end properties has made him a trusted advisor to our most discerning clients.",
    linkedin: "#",
    email: "michael@luxeestate.com",
  },
]

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<(typeof team)[0] | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (titleRef.current) {
              animate(titleRef.current.querySelectorAll(".word"), {
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 800,
                delay: stagger(100),
                ease: "outExpo",
              })
            }

            // Animate team cards
            if (gridRef.current) {
              animate(gridRef.current.querySelectorAll(".team-card"), {
                opacity: [0, 1],
                translateY: [60, 0],
                scale: [0.9, 1],
                duration: 800,
                delay: stagger(150, { start: 300 }),
                ease: "outExpo",
              })
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-accent mb-4 block"
          >
            Meet The Experts
          </motion.span>
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
            <span className="word inline-block opacity-0">Our</span>{" "}
            <span className="word inline-block text-accent opacity-0">Team</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="team-card group cursor-pointer opacity-0"
              whileHover={{ y: -10 }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={member.linkedin}
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-1 group-hover:text-accent transition-colors">
                {member.name}
              </h3>
              <p className="text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedMember(null)}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-card rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center z-10 hover:bg-secondary/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">{selectedMember.name}</h3>
                  <p className="text-accent font-medium mb-6">{selectedMember.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{selectedMember.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href={selectedMember.linkedin}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { animate, stagger } from "animejs"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Luxury Lane", "Premium City, PC 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@luxeestate.com", "sales@luxeestate.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon - Fri: 9am - 7pm", "Sat - Sun: 10am - 5pm"],
  },
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export function ContactInfo() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardsRef.current) {
      animate(cardsRef.current.querySelectorAll(".info-card"), {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 600,
        delay: stagger(100, { start: 300 }),
        ease: "outExpo",
      })
    }
  }, [])

  return (
    <div ref={cardsRef} className="space-y-6">
      {/* Contact Cards */}
      {contactInfo.map((info, index) => (
        <motion.div
          key={index}
          className="info-card opacity-0 p-6 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-shadow group"
          whileHover={{ x: 10 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
              <info.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
            </div>
            <div>
              <h3 className="font-serif font-semibold mb-2">{info.title}</h3>
              {info.lines.map((line, i) => (
                <p key={i} className="text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-primary text-primary-foreground"
      >
        <h3 className="font-serif font-semibold mb-4">Follow Us</h3>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
            <p className="text-muted-foreground">Interactive Map</p>
            <p className="text-sm text-muted-foreground">Coming with backend integration</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

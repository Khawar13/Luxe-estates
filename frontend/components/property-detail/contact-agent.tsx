"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { animate } from "animejs"
import { Phone, Mail, MessageCircle, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactAgentProps {
  propertyTitle: string
}

export function ContactAgent({ propertyTitle }: ContactAgentProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
  })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 500,
        ease: "outExpo",
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      className="sticky top-24 bg-card rounded-3xl shadow-xl overflow-hidden"
    >
      {/* Agent Info */}
      <div className="p-6 bg-secondary/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent ring-offset-2 ring-offset-background">
            <Image src="/placeholder.svg?height=100&width=100" alt="Agent" fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-lg">Sarah Mitchell</h3>
            <p className="text-sm text-muted-foreground">Luxury Property Specialist</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-medium">4.9</span>
            <span className="text-muted-foreground">(127 reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Award className="w-4 h-4" />
            <span>Top Agent</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="h-12 bg-secondary/50 border-0"
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12 bg-secondary/50 border-0"
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="h-12 bg-secondary/50 border-0"
        />
        <Textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[120px] bg-secondary/50 border-0 resize-none"
        />
        <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground">
          <MessageCircle className="w-5 h-5 mr-2" />
          Send Message
        </Button>
      </form>

      {/* Quick Contact */}
      <div className="px-6 pb-6 space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>or contact directly</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 bg-transparent">
            <Phone className="w-5 h-5 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1 h-12 bg-transparent">
            <Mail className="w-5 h-5 mr-2" />
            Email
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

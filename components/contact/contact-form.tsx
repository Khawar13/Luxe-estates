"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animate, stagger } from "animejs"
import { Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const inquiryTypes = [
  { value: "buy", label: "Buying a Property" },
  { value: "sell", label: "Selling a Property" },
  { value: "rent", label: "Renting a Property" },
  { value: "invest", label: "Investment Advice" },
  { value: "other", label: "Other Inquiry" },
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formRef.current) {
      animate(formRef.current.querySelectorAll(".form-field"), {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: stagger(100, { start: 200 }),
        ease: "outExpo",
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-3xl shadow-xl p-8 md:p-10"
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="form-field">
              <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field relative">
                <label
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === "name" || formData.name
                      ? "top-2 text-xs text-accent"
                      : "top-1/2 -translate-y-1/2 text-muted-foreground",
                  )}
                >
                  Full Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="h-14 pt-6 bg-secondary/50 border-0 focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="form-field relative">
                <label
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === "email" || formData.email
                      ? "top-2 text-xs text-accent"
                      : "top-1/2 -translate-y-1/2 text-muted-foreground",
                  )}
                >
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="h-14 pt-6 bg-secondary/50 border-0 focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Phone & Inquiry Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field relative">
                <label
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === "phone" || formData.phone
                      ? "top-2 text-xs text-accent"
                      : "top-1/2 -translate-y-1/2 text-muted-foreground",
                  )}
                >
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="h-14 pt-6 bg-secondary/50 border-0 focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="form-field">
                <label className="text-sm text-muted-foreground mb-2 block">Inquiry Type *</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  required
                  className="w-full h-14 px-4 bg-secondary/50 border-0 rounded-lg focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select an option</option>
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="form-field relative">
              <label
                className={cn(
                  "absolute left-4 transition-all duration-300 pointer-events-none",
                  focusedField === "message" || formData.message
                    ? "top-3 text-xs text-accent"
                    : "top-4 text-muted-foreground",
                )}
              >
                Your Message *
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                required
                className="min-h-[150px] pt-8 bg-secondary/50 border-0 focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="form-field">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

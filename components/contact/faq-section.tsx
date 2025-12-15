"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animate, stagger } from "animejs"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule a viewing by contacting us through this form, calling our office, or clicking the 'Schedule Tour' button on any property listing. Our team typically responds within 2 hours during business hours.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We specialize in premium properties across Downtown, Waterfront, The Hills, Garden District, Arts Quarter, and Lakeside areas. We also have exclusive listings in emerging luxury neighborhoods.",
  },
  {
    question: "Do you offer property management services?",
    answer:
      "Yes, we provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, and regular property inspections for owners who wish to rent their properties.",
  },
  {
    question: "What is your commission structure?",
    answer:
      "Our commission rates are competitive and vary based on the property type and transaction. We're happy to discuss our fee structure in detail during our initial consultation, which is always complimentary.",
  },
  {
    question: "Can you help with financing?",
    answer:
      "While we don't provide financing directly, we have established relationships with premium lenders and can connect you with trusted mortgage advisors who specialize in luxury property financing.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && titleRef.current) {
            animate(titleRef.current.querySelectorAll(".word"), {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: stagger(100),
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm tracking-widest uppercase text-accent mb-4 block"
            >
              Common Questions
            </motion.span>
            <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
              <span className="word inline-block opacity-0">Frequently</span>{" "}
              <span className="word inline-block text-accent opacity-0">Asked</span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

const footerLinks = {
  properties: [
    { label: "For Sale", href: "/properties?type=sale" },
    { label: "For Rent", href: "/properties?type=rent" },
    { label: "New Listings", href: "/properties" },
    { label: "Featured", href: "/properties?featured=true" },
  ],
  areas: [
    { label: "Downtown", href: "/areas/downtown" },
    { label: "Waterfront", href: "/areas/waterfront" },
    { label: "The Hills", href: "/areas/hills" },
    { label: "Garden District", href: "/areas/garden-district" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif font-bold">
                <span className="text-accent">LUXE</span>
                <span>ESTATE</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm leading-relaxed">
              Curating extraordinary properties for discerning clients. Your journey to exceptional living begins here.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent" />
                <span>123 Luxury Lane, Premium City, PC 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>hello@luxeestate.com</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Properties</h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Areas</h4>
            <ul className="space-y-3">
              {footerLinks.areas.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Luxe Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertiesHeader } from "@/components/properties/properties-header"
import { PropertyFilters } from "@/components/properties/property-filters"
import { PropertiesGrid } from "@/components/properties/properties-grid"
import { ParticleBackground } from "@/components/ui/particle-background"
import { properties } from "@/lib/mock-data"

interface FilterState {
  search: string
  area: string
  priceType: "all" | "sale" | "rent"
  propertyType: string
  minPrice: string
  maxPrice: string
}

export default function PropertiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    area: "",
    priceType: "all",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  })

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Area filter
      if (filters.area && property.area !== filters.area) return false

      // Price type filter
      if (filters.priceType !== "all" && property.priceType !== filters.priceType) return false

      // Property type filter
      if (filters.propertyType && property.type !== filters.propertyType) return false

      // Price range filter
      if (filters.minPrice) {
        const minPrice = Number.parseInt(filters.minPrice)
        if (property.price < minPrice) return false
      }
      if (filters.maxPrice) {
        const maxPrice = Number.parseInt(filters.maxPrice)
        if (property.price > maxPrice) return false
      }

      return true
    })
  }, [filters])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <PropertiesHeader totalCount={properties.length} filteredCount={filteredProperties.length} />
        <div className="container mx-auto px-6 pb-24">
          <PropertyFilters onFilterChange={setFilters} />
          <PropertiesGrid properties={filteredProperties} />
        </div>
        <Footer />
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animate, stagger } from "animejs"
import { Search, SlidersHorizontal, X, MapPin, Home, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { areas } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface FilterState {
  search: string
  area: string
  priceType: "all" | "sale" | "rent"
  propertyType: string
  minPrice: string
  maxPrice: string
}

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

const propertyTypes = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
]

const priceRanges = {
  sale: [
    { min: "", max: "", label: "Any Price" },
    { min: "0", max: "1000000", label: "Under $1M" },
    { min: "1000000", max: "3000000", label: "$1M - $3M" },
    { min: "3000000", max: "5000000", label: "$3M - $5M" },
    { min: "5000000", max: "", label: "$5M+" },
  ],
  rent: [
    { min: "", max: "", label: "Any Price" },
    { min: "0", max: "5000", label: "Under $5K/mo" },
    { min: "5000", max: "10000", label: "$5K - $10K/mo" },
    { min: "10000", max: "20000", label: "$10K - $20K/mo" },
    { min: "20000", max: "", label: "$20K+/mo" },
  ],
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    area: "",
    priceType: "all",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (filterRef.current) {
      animate(filterRef.current.querySelectorAll(".filter-item"), {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: stagger(80),
        ease: "outExpo",
      })
    }
  }, [])

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      area: "",
      priceType: "all",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters =
    filters.search || filters.area || filters.priceType !== "all" || filters.propertyType || filters.minPrice

  return (
    <>
      {/* Desktop Filters */}
      <motion.div
        ref={filterRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block bg-card rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="filter-item flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-0"
            />
          </div>

          {/* Area Select */}
          <div className="filter-item relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
            <select
              value={filters.area}
              onChange={(e) => updateFilter("area", e.target.value)}
              className="h-12 pl-12 pr-8 bg-secondary/50 border-0 rounded-lg appearance-none cursor-pointer text-foreground min-w-[180px]"
            >
              <option value="">All Areas</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Type Toggle */}
          <div className="filter-item flex items-center bg-secondary/50 rounded-lg p-1">
            {["all", "sale", "rent"].map((type) => (
              <button
                key={type}
                onClick={() => updateFilter("priceType", type)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  filters.priceType === type
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {type === "all" ? "All" : type === "sale" ? "For Sale" : "For Rent"}
              </button>
            ))}
          </div>

          {/* Property Type */}
          <div className="filter-item relative">
            <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilter("propertyType", e.target.value)}
              className="h-12 pl-12 pr-8 bg-secondary/50 border-0 rounded-lg appearance-none cursor-pointer text-foreground min-w-[160px]"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-item relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
            <select
              value={`${filters.minPrice}-${filters.maxPrice}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split("-")
                setFilters({ ...filters, minPrice: min, maxPrice: max })
                onFilterChange({ ...filters, minPrice: min, maxPrice: max })
              }}
              className="h-12 pl-12 pr-8 bg-secondary/50 border-0 rounded-lg appearance-none cursor-pointer text-foreground min-w-[160px]"
            >
              {(filters.priceType === "rent" ? priceRanges.rent : priceRanges.sale).map((range, i) => (
                <option key={i} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="filter-item">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-12 h-12 bg-card border-0 shadow-md"
            />
          </div>
          <Button
            onClick={() => setShowMobileFilters(true)}
            className="h-12 px-4 bg-card text-foreground shadow-md hover:bg-secondary"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {hasActiveFilters && <span className="ml-2 w-2 h-2 rounded-full bg-accent" />}
          </Button>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Area */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Area</label>
                  <select
                    value={filters.area}
                    onChange={(e) => updateFilter("area", e.target.value)}
                    className="w-full h-12 px-4 bg-secondary/50 border-0 rounded-lg"
                  >
                    <option value="">All Areas</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Type */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Listing Type</label>
                  <div className="flex gap-2">
                    {["all", "sale", "rent"].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFilter("priceType", type)}
                        className={cn(
                          "flex-1 py-3 rounded-lg text-sm font-medium transition-all",
                          filters.priceType === type
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary/50 text-muted-foreground",
                        )}
                      >
                        {type === "all" ? "All" : type === "sale" ? "For Sale" : "For Rent"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => updateFilter("propertyType", e.target.value)}
                    className="w-full h-12 px-4 bg-secondary/50 border-0 rounded-lg"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Price Range</label>
                  <select
                    value={`${filters.minPrice}-${filters.maxPrice}`}
                    onChange={(e) => {
                      const [min, max] = e.target.value.split("-")
                      setFilters({ ...filters, minPrice: min, maxPrice: max })
                      onFilterChange({ ...filters, minPrice: min, maxPrice: max })
                    }}
                    className="w-full h-12 px-4 bg-secondary/50 border-0 rounded-lg"
                  >
                    {(filters.priceType === "rent" ? priceRanges.rent : priceRanges.sale).map((range, i) => (
                      <option key={i} value={`${range.min}-${range.max}`}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={clearFilters} className="flex-1 h-12 bg-transparent">
                    Clear All
                  </Button>
                  <Button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 h-12 bg-accent text-accent-foreground"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

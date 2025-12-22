export interface Property {
  id: string
  title: string
  location: string
  area: string
  price: number
  priceType: "sale" | "rent"
  type: "apartment" | "house" | "villa" | "penthouse" | "studio"
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  featured: boolean
  description: string
  amenities: string[]
  coordinates: { lat: number; lng: number }
}

export interface Area {
  id: string
  name: string
  description: string
  image: string
  propertyCount: number
}

export const areas: Area[] = [
  {
    id: "downtown",
    name: "Downtown",
    description: "The heart of the city with stunning skyline views",
    image: "/downtown-skyline-luxury.jpg",
    propertyCount: 24,
  },
  {
    id: "waterfront",
    name: "Waterfront",
    description: "Exclusive beachfront properties with ocean access",
    image: "/waterfront-beach-luxury-home.jpg",
    propertyCount: 18,
  },
  {
    id: "hills",
    name: "The Hills",
    description: "Serene hillside estates with panoramic views",
    image: "/hillside-mansion-luxury.jpg",
    propertyCount: 12,
  },
  {
    id: "garden-district",
    name: "Garden District",
    description: "Historic charm meets modern luxury",
    image: "/garden-district-historic-mansion.jpg",
    propertyCount: 15,
  },
  {
    id: "arts-quarter",
    name: "Arts Quarter",
    description: "Vibrant creative neighborhood with unique properties",
    image: "/arts-district-modern-loft.jpg",
    propertyCount: 20,
  },
  {
    id: "lakeside",
    name: "Lakeside",
    description: "Tranquil lakefront living at its finest",
    image: "/lakeside-luxury-home.jpg",
    propertyCount: 10,
  },
]

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Penthouse Suite",
    location: "1200 Sky Tower, Downtown",
    area: "downtown",
    price: 2500000,
    priceType: "sale",
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    images: [
      "/luxury-penthouse-interior-modern.jpg",
      "/penthouse-living-room-city-view.jpg",
      "/modern-kitchen-luxury.jpg",
      "/master-bedroom-penthouse.jpg",
    ],
    featured: true,
    description:
      "Experience unparalleled luxury in this stunning penthouse offering 360-degree city views. Floor-to-ceiling windows flood the space with natural light, while premium finishes and smart home technology create the ultimate urban retreat.",
    amenities: ["Private Elevator", "Rooftop Terrace", "Wine Cellar", "Smart Home", "Concierge", "Gym Access"],
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    title: "Oceanfront Villa",
    location: "88 Coastal Drive, Waterfront",
    area: "waterfront",
    price: 4800000,
    priceType: "sale",
    type: "villa",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 6200,
    images: [
      "/oceanfront-villa-luxury-exterior.jpg",
      "/beach-house-interior-luxury.jpg",
      "/infinity-pool-ocean-view.png",
      "/luxury-beach-bedroom.jpg",
    ],
    featured: true,
    description:
      "A masterpiece of coastal architecture, this oceanfront villa offers direct beach access and breathtaking sunset views. The infinity pool seamlessly blends with the horizon, creating an unforgettable living experience.",
    amenities: ["Private Beach", "Infinity Pool", "Guest House", "Boat Dock", "Outdoor Kitchen", "Home Theater"],
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: "3",
    title: "Historic Garden Estate",
    location: "456 Oak Avenue, Garden District",
    area: "garden-district",
    price: 3200000,
    priceType: "sale",
    type: "house",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4800,
    images: [
      "/historic-mansion-garden.jpg",
      "/classic-interior-design-luxury.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    featured: true,
    description:
      "Step into timeless elegance with this meticulously restored historic estate. Original architectural details blend harmoniously with modern amenities, surrounded by award-winning gardens.",
    amenities: ["Restored Details", "Chef Kitchen", "Library", "Wine Room", "Gardens", "Carriage House"],
    coordinates: { lat: 40.7484, lng: -73.9857 },
  },
  {
    id: "4",
    title: "Hillside Modern Retreat",
    location: "789 Summit Road, The Hills",
    area: "hills",
    price: 15000,
    priceType: "rent",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    featured: false,
    description:
      "Contemporary architecture meets nature in this hillside sanctuary. Floor-to-ceiling glass walls frame spectacular valley views, while sustainable design elements ensure eco-conscious luxury.",
    amenities: ["Solar Panels", "EV Charging", "Heated Floors", "Home Office", "Meditation Room", "Panoramic Views"],
    coordinates: { lat: 40.7614, lng: -73.9776 },
  },
  {
    id: "5",
    title: "Artist Loft Conversion",
    location: "321 Gallery Lane, Arts Quarter",
    area: "arts-quarter",
    price: 8500,
    priceType: "rent",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2200,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    featured: false,
    description:
      "A stunning conversion in the heart of the Arts Quarter, featuring soaring 16-foot ceilings, exposed brick, and original steel beams. The perfect canvas for creative living.",
    amenities: ["16ft Ceilings", "Exposed Brick", "Gallery Wall", "Rooftop Access", "Artist Studio", "Pet Friendly"],
    coordinates: { lat: 40.7282, lng: -73.7949 },
  },
  {
    id: "6",
    title: "Lakeside Sanctuary",
    location: "567 Lakeview Court, Lakeside",
    area: "lakeside",
    price: 2800000,
    priceType: "sale",
    type: "house",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    featured: true,
    description:
      "Wake up to serene lake views in this architectural gem. Private dock, boathouse, and expansive outdoor living spaces make this the ultimate lakeside retreat.",
    amenities: ["Private Dock", "Boathouse", "Fire Pit", "Hot Tub", "Lake Access", "Screened Porch"],
    coordinates: { lat: 40.7831, lng: -73.9712 },
  },
  {
    id: "7",
    title: "Luxury Studio Apartment",
    location: "100 Central Plaza, Downtown",
    area: "downtown",
    price: 4500,
    priceType: "rent",
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    featured: false,
    description:
      "Efficient luxury in the heart of downtown. This thoughtfully designed studio maximizes every square foot with premium finishes and stunning city views.",
    amenities: ["Doorman", "Gym", "Rooftop Deck", "Package Room", "Bike Storage", "Laundry"],
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "8",
    title: "Mediterranean Villa",
    location: "222 Palm Court, Waterfront",
    area: "waterfront",
    price: 5500000,
    priceType: "sale",
    type: "villa",
    bedrooms: 7,
    bathrooms: 6,
    sqft: 7500,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    featured: false,
    description:
      "Inspired by the coastal villas of the Mediterranean, this estate features terracotta roofs, a central courtyard with fountain, and lush tropical landscaping.",
    amenities: ["Courtyard", "Fountain", "Pool House", "Summer Kitchen", "Wine Grotto", "Tennis Court"],
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
]

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((p) => p.id === id)
}

export const getPropertiesByArea = (areaId: string): Property[] => {
  return properties.filter((p) => p.area === areaId)
}

export const getFeaturedProperties = (): Property[] => {
  return properties.filter((p) => p.featured)
}

export const filterProperties = (filters: {
  area?: string
  priceType?: "sale" | "rent"
  propertyType?: string
  minPrice?: number
  maxPrice?: number
}): Property[] => {
  return properties.filter((p) => {
    if (filters.area && p.area !== filters.area) return false
    if (filters.priceType && p.priceType !== filters.priceType) return false
    if (filters.propertyType && p.type !== filters.propertyType) return false
    if (filters.minPrice && p.price < filters.minPrice) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    return true
  })
}

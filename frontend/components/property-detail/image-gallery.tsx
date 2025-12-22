"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { animate, stagger } from "animejs"
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (thumbnailsRef.current) {
      animate(thumbnailsRef.current.querySelectorAll(".thumbnail"), {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 600,
        delay: stagger(80, { start: 400 }),
        ease: "outExpo",
      })
    }
  }, [])

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next()
    if (e.key === "ArrowLeft") prev()
    if (e.key === "Escape") {
      setIsFullscreen(false)
      setShowGrid(false)
    }
  }

  useEffect(() => {
    if (isFullscreen || showGrid) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isFullscreen, showGrid])

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[16/10] rounded-3xl overflow-hidden group cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowGrid(true)
              }}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="View all images"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFullscreen(true)
              }}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Fullscreen"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div ref={thumbnailsRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={cn(
                "thumbnail flex-shrink-0 relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden transition-all duration-300",
                currentIndex === index
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100",
              )}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center z-10 hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
              >
                <Image
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentIndex === index ? "w-8 bg-white" : "bg-white/40 hover:bg-white/60",
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Modal */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold">All Photos ({images.length})</h3>
                <button
                  onClick={() => setShowGrid(false)}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setCurrentIndex(index)
                      setShowGrid(false)
                      setIsFullscreen(true)
                    }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

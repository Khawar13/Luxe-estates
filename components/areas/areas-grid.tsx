"use client"

import { useRef, useEffect } from "react"
import { animate, stagger } from "animejs"
import { AreaCard } from "./area-card"
import { areas } from "@/lib/mock-data"

export function AreasGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      animate(gridRef.current.querySelectorAll(".area-card"), {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: stagger(120, { grid: [3, 2], from: "center" }),
        ease: "outExpo",
      })
    }
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {areas.map((area, index) => (
            <div key={area.id} className={`area-card ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <AreaCard area={area} index={index} layout={index === 0 ? "large" : "normal"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

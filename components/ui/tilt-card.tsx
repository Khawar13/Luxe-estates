"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    tiltAmount?: number
    glareEnable?: boolean
}

export function TiltCard({
    children,
    className = "",
    tiltAmount = 10,
    glareEnable = true
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0.5)
    const y = useMotionValue(0.5)

    const springConfig = { damping: 20, stiffness: 300 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const rotateX = useTransform(ySpring, [0, 1], [tiltAmount, -tiltAmount])
    const rotateY = useTransform(xSpring, [0, 1], [-tiltAmount, tiltAmount])

    const glareX = useTransform(xSpring, [0, 1], ["0%", "100%"])
    const glareY = useTransform(ySpring, [0, 1], ["0%", "100%"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const xPos = (e.clientX - left) / width
        const yPos = (e.clientY - top) / height

        x.set(xPos)
        y.set(yPos)
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        x.set(0.5)
        y.set(0.5)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            {children}

            {/* Glare effect */}
            {glareEnable && (
                <motion.div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
                    style={{
                        opacity: isHovered ? 0.15 : 0,
                        background: useTransform(
                            [glareX, glareY],
                            ([latestX, latestY]) =>
                                `radial-gradient(circle at ${latestX} ${latestY}, white, transparent 60%)`
                        ),
                        transition: "opacity 0.3s ease",
                    }}
                />
            )}
        </motion.div>
    )
}

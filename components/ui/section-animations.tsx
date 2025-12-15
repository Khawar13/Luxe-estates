"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface StaggeredGridProps {
    children: React.ReactNode[]
    className?: string
    staggerDelay?: number
}

export function StaggeredGrid({
    children,
    className = "",
    staggerDelay = 0.1
}: StaggeredGridProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div ref={ref} className={className}>
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: i * staggerDelay,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    )
}

interface ImageRevealProps {
    children: React.ReactNode
    className?: string
    direction?: "left" | "right" | "top" | "bottom"
}

export function ImageReveal({
    children,
    className = "",
    direction = "left"
}: ImageRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const clipPaths = {
        left: {
            initial: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            animate: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        right: {
            initial: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            animate: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        top: {
            initial: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            animate: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        bottom: {
            initial: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            animate: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
    }

    return (
        <motion.div
            ref={ref}
            className={cn("overflow-hidden", className)}
            initial={{ clipPath: clipPaths[direction].initial }}
            animate={isInView ? { clipPath: clipPaths[direction].animate } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

interface ParallaxSectionProps {
    children: React.ReactNode
    className?: string
    speed?: number
}

export function ParallaxSection({
    children,
    className = "",
    speed = 0.5
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    )
}

interface FadeSlideInProps {
    children: React.ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right"
    delay?: number
}

export function FadeSlideIn({
    children,
    className = "",
    direction = "up",
    delay = 0
}: FadeSlideInProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    )
}

interface HoverScaleProps {
    children: React.ReactNode
    className?: string
    scale?: number
}

export function HoverScale({
    children,
    className = "",
    scale = 1.02
}: HoverScaleProps) {
    return (
        <motion.div
            className={className}
            whileHover={{ scale }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}

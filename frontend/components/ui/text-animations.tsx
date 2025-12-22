"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface BlurRevealTextProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function BlurRevealText({
    children,
    className = "",
    delay = 0
}: BlurRevealTextProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

interface WordRevealTextProps {
    text: string
    className?: string
    wordClassName?: string
    delay?: number
    staggerDelay?: number
}

export function WordRevealText({
    text,
    className = "",
    wordClassName = "",
    delay = 0,
    staggerDelay = 0.05
}: WordRevealTextProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const words = text.split(" ")

    return (
        <div ref={ref} className={cn("flex flex-wrap", className)}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className={cn("mr-2 inline-block", wordClassName)}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                        duration: 0.5,
                        delay: delay + (i * staggerDelay),
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    )
}

interface GoldShimmerTextProps {
    children: React.ReactNode
    className?: string
}

export function GoldShimmerText({
    children,
    className = ""
}: GoldShimmerTextProps) {
    return (
        <span
            className={cn(
                "relative inline-block bg-clip-text text-transparent",
                "bg-[length:200%_100%] animate-shimmer",
                className
            )}
            style={{
                backgroundImage: `linear-gradient(
          110deg,
          oklch(0.65 0.12 45) 0%,
          oklch(0.80 0.10 70) 25%,
          oklch(0.90 0.08 80) 50%,
          oklch(0.80 0.10 70) 75%,
          oklch(0.65 0.12 45) 100%
        )`,
            }}
        >
            {children}
        </span>
    )
}

interface CharacterRevealProps {
    text: string
    className?: string
    delay?: number
}

export function CharacterReveal({
    text,
    className = "",
    delay = 0
}: CharacterRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const characters = text.split("")

    return (
        <div ref={ref} className={cn("flex flex-wrap", className)}>
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: 90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{
                        duration: 0.5,
                        delay: delay + (i * 0.02),
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    )
}

interface SplitHoverTextProps {
    children: string
    className?: string
}

export function SplitHoverText({
    children,
    className = ""
}: SplitHoverTextProps) {
    const characters = children.split("")

    return (
        <span className={cn("group inline-flex", className)}>
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block transition-transform duration-300"
                    whileHover={{ y: -2 }}
                    transition={{ delay: i * 0.02 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    )
}

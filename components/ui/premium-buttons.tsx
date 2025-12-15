"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ShimmerButtonProps {
    children: React.ReactNode
    className?: string
    shimmerColor?: string
    onClick?: () => void
}

export function ShimmerButton({
    children,
    className = "",
    shimmerColor = "rgba(255, 255, 255, 0.1)",
    onClick
}: ShimmerButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all",
                "bg-accent text-accent-foreground",
                "hover:shadow-lg hover:shadow-accent/25",
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 -translate-x-full"
                animate={{
                    translateX: ["−100%", "200%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                }}
                style={{
                    background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                }}
            />

            {/* Content */}
            <span className="relative z-10">{children}</span>
        </motion.button>
    )
}

interface LiquidButtonProps {
    children: React.ReactNode
    className?: string
    variant?: "fill" | "outline"
}

export function LiquidButton({
    children,
    className = "",
    variant = "fill"
}: LiquidButtonProps) {
    return (
        <motion.button
            className={cn(
                "group relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-500",
                variant === "fill"
                    ? "bg-accent text-accent-foreground"
                    : "border border-foreground/20 text-foreground bg-transparent",
                className
            )}
            whileTap={{ scale: 0.98 }}
        >
            {/* Liquid fill background */}
            <span
                className={cn(
                    "absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0",
                    variant === "fill"
                        ? "bg-foreground"
                        : "bg-accent"
                )}
            />

            {/* Content */}
            <span className={cn(
                "relative z-10 transition-colors duration-500",
                variant === "fill"
                    ? "group-hover:text-background"
                    : "group-hover:text-accent-foreground"
            )}>
                {children}
            </span>
        </motion.button>
    )
}

interface UnderlineButtonProps {
    children: React.ReactNode
    className?: string
    href?: string
}

export function UnderlineButton({
    children,
    className = "",
}: UnderlineButtonProps) {
    return (
        <motion.button
            className={cn(
                "group relative font-medium text-foreground transition-colors hover:text-accent",
                className
            )}
            whileTap={{ scale: 0.98 }}
        >
            <span>{children}</span>

            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
        </motion.button>
    )
}

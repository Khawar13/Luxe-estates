"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
    value: number | string
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
}

export function AnimatedCounter({
    value,
    duration = 2,
    className = "",
    prefix = "",
    suffix = ""
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [displayValue, setDisplayValue] = useState(0)

    // Extract numeric value if string contains numbers
    const numericValue = typeof value === "string"
        ? parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
        : value

    useEffect(() => {
        if (!isInView) return

        const startTime = Date.now()
        const endTime = startTime + duration * 1000

        const updateValue = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / (duration * 1000), 1)

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentValue = Math.floor(easeOutQuart * numericValue)

            setDisplayValue(currentValue)

            if (now < endTime) {
                requestAnimationFrame(updateValue)
            } else {
                setDisplayValue(numericValue)
            }
        }

        requestAnimationFrame(updateValue)
    }, [isInView, numericValue, duration])

    // Format the display value with the original suffix from value string
    const originalSuffix = typeof value === "string"
        ? value.replace(/[0-9]/g, "")
        : suffix

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
        >
            {prefix}{displayValue}{originalSuffix || suffix}
        </motion.span>
    )
}

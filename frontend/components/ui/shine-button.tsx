"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ShineButtonProps {
    children: React.ReactNode
    className?: string
    variant?: "primary" | "outline"
    size?: "default" | "lg"
    onClick?: () => void
}

export function ShineButton({
    children,
    className = "",
    variant = "primary",
    size = "default",
    onClick
}: ShineButtonProps) {
    if (variant === "outline") {
        return (
            <button
                onClick={onClick}
                className={cn(
                    "group relative overflow-visible rounded-lg p-[2px] font-medium transition-all",
                    className
                )}
            >
                {/* Rotating beam border */}
                <span className="absolute inset-0 rounded-lg overflow-hidden">
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="absolute inset-[-100%] animate-beam-rotate">
                            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_30deg,#c4a484_90deg,#f5e6d3_180deg,#d4a574_270deg,transparent_330deg,transparent_360deg)] blur-md" />
                            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_40deg,#c4a484_100deg,#f5e6d3_180deg,#d4a574_260deg,transparent_320deg,transparent_360deg)] blur-sm" />
                        </span>
                    </span>
                </span>

                <span
                    className={cn(
                        "relative z-10 flex items-center justify-center gap-2 rounded-[6px] bg-background transition-all",
                        "border border-foreground/20 text-foreground",
                        "group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(196,164,132,0.2)]",
                        size === "default" && "px-6 py-3",
                        size === "lg" && "px-8 py-4 text-lg"
                    )}
                >
                    {children}
                </span>
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "shine-button group relative overflow-hidden rounded-lg font-medium transition-all duration-300",
                "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
                size === "default" && "px-6 py-3",
                size === "lg" && "px-8 py-4 text-lg",
                className
            )}
        >
            <span className="relative z-10 inline-flex items-center gap-2">
                {children}
            </span>
        </button>
    )
}

// Span version for wrapping inside Next.js Link
interface ShineLinkButtonProps extends Omit<ShineButtonProps, 'onClick'> { }

export function ShineLinkButton({
    children,
    className = "",
    variant = "primary",
    size = "default"
}: ShineLinkButtonProps) {
    if (variant === "outline") {
        return (
            <span
                className={cn(
                    "group relative inline-flex overflow-visible rounded-lg p-[2px] font-medium transition-all cursor-pointer",
                    className
                )}
            >
                {/* Rotating beam border */}
                <span className="absolute inset-0 rounded-lg overflow-hidden">
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="absolute inset-[-100%] animate-beam-rotate">
                            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_30deg,#c4a484_90deg,#f5e6d3_180deg,#d4a574_270deg,transparent_330deg,transparent_360deg)] blur-md" />
                            <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_40deg,#c4a484_100deg,#f5e6d3_180deg,#d4a574_260deg,transparent_320deg,transparent_360deg)] blur-sm" />
                        </span>
                    </span>
                </span>

                <span
                    className={cn(
                        "relative z-10 flex items-center justify-center gap-2 rounded-[6px] bg-background transition-all",
                        "border border-foreground/20 text-foreground",
                        "group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(196,164,132,0.2)]",
                        size === "default" && "px-6 py-3",
                        size === "lg" && "px-8 py-4 text-lg"
                    )}
                >
                    {children}
                </span>
            </span>
        )
    }

    return (
        <span
            className={cn(
                "shine-button group relative inline-flex overflow-hidden rounded-lg font-medium transition-all duration-300 cursor-pointer",
                "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
                size === "default" && "px-6 py-3",
                size === "lg" && "px-8 py-4 text-lg",
                className
            )}
        >
            <span className="relative z-10 inline-flex items-center gap-2">
                {children}
            </span>
        </span>
    )
}

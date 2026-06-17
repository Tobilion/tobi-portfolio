"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll spy to update activeTab automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220
      
      // Bottom of page check
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        const lastItem = items[items.length - 1]
        if (lastItem) setActiveTab(lastItem.name)
        return
      }

      for (const item of items) {
        const targetId = item.url.replace("#", "")
        if (!targetId) continue;
        const element = document.getElementById(targetId)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(item.name)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-auto sm:top-0 left-1/2 -translate-x-1/2 z-50 pt-0 sm:pt-6 w-auto",
        className,
      )}
    >
      <div className="flex items-center gap-2 bg-white/40 dark:bg-black/45 border border-zinc-200/50 dark:border-zinc-800/80 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(item.name)
                const targetId = item.url.replace("#", "")
                const lenis = (window as any).lenis
                if (targetId) {
                  const element = document.getElementById(targetId)
                  if (element) {
                    if (lenis) {
                      lenis.scrollTo(element, { duration: 1.5, offset: -80 })
                    } else {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }
                } else {
                  if (lenis) {
                    lenis.scrollTo(0, { duration: 1.5 })
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }
              }}
              className={cn(
                "relative cursor-pointer text-xs font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors duration-300",
                "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white",
                isActive && "text-[#0066CC] dark:text-[#0070F3] bg-zinc-200/30 dark:bg-zinc-800/40",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-zinc-200/20 dark:bg-zinc-800/20 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -bottom-1 sm:bottom-auto sm:-top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#0066CC] dark:bg-[#0070F3] rounded-full">
                    <div className="absolute w-12 h-6 bg-[#0066CC]/30 dark:bg-[#0070F3]/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#0066CC]/30 dark:bg-[#0070F3]/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#0066CC]/30 dark:bg-[#0070F3]/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

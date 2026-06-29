"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, X, Menu } from "lucide-react"
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
  const [isDesktop, setIsDesktop] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close drawer on scroll
  useEffect(() => {
    const onScroll = () => { if (drawerOpen) setDrawerOpen(false) }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [drawerOpen])

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        const lastItem = items[items.length - 1]
        if (lastItem) setActiveTab(lastItem.name)
        return
      }
      for (const item of items) {
        const targetId = item.url.replace("#", "")
        if (!targetId) continue
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
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const scrollTo = (item: NavItem) => {
    setActiveTab(item.name)
    setDrawerOpen(false)
    const targetId = item.url.replace("#", "")
    const lenis = (window as any).lenis
    if (targetId) {
      const element = document.getElementById(targetId)
      if (element) {
        if (lenis) lenis.scrollTo(element, { duration: 1.5, offset: -80 })
        else element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      if (lenis) lenis.scrollTo(0, { duration: 1.5 })
      else window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // ── Desktop pill nav ──────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div className={cn("fixed bottom-6 lg:bottom-auto lg:top-[72px] left-1/2 -translate-x-1/2 z-30 w-auto", className)}>
        <div className="flex items-center gap-1 bg-white/40 dark:bg-black/45 border border-zinc-200/50 dark:border-zinc-800/80 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-lg">
          {items.map((item) => {
            const isActive = activeTab === item.name
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => { e.preventDefault(); scrollTo(item) }}
                className={cn(
                  "relative cursor-pointer text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-300 whitespace-nowrap",
                  "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white",
                  isActive && "text-[#0066CC] dark:text-[#0070F3]",
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-zinc-200/20 dark:bg-zinc-800/20 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#0066CC] dark:bg-[#0070F3] rounded-full">
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

  // ── Mobile / tablet hamburger ─────────────────────────────────────────────
  return (
    <>
      {/* Hamburger button — sits in the header row, rendered here as a fixed element */}
      <button
        onClick={() => setDrawerOpen((o) => !o)}
        aria-label="Open navigation"
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/40 dark:bg-black/45 border border-zinc-200/50 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
      >
        <Menu size={18} strokeWidth={2} />
      </button>

      {/* Drawer overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-200/60 dark:border-zinc-800/60 shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/60">
                <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  <span className="text-[#0066CC]">&lt;</span>
                  {" TJ "}
                  <span className="text-[#0066CC]">/&gt;</span>
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation"
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                {items.map((item, i) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.name
                  return (
                    <motion.a
                      key={item.name}
                      href={item.url}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={(e) => { e.preventDefault(); scrollTo(item) }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                        isActive
                          ? "bg-[#0066CC]/10 text-[#0066CC] dark:text-[#0070F3]"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      <Icon size={17} strokeWidth={2} />
                      {item.name}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0066CC] dark:bg-[#0070F3]" />
                      )}
                    </motion.a>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/60">
                <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">Lagos / Remote · Available now</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

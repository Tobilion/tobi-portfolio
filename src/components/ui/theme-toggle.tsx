"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  theme?: "light" | "dark"
  toggleTheme?: () => void
}

export function ThemeToggle({ className, theme, toggleTheme }: ThemeToggleProps) {
  const [localIsDark, setLocalIsDark] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkClass = document.documentElement.classList.contains("dark")
      setLocalIsDark(isDarkClass)
    }
  }, [])

  const isDark = theme ? theme === "dark" : localIsDark

  const handleToggle = () => {
    if (toggleTheme) {
      toggleTheme()
    } else {
      const nextDark = !isDark
      setLocalIsDark(nextDark)
      const root = window.document.documentElement
      if (nextDark) {
        root.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        root.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    }
  }

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-zinc-100 border border-zinc-200",
        className
      )}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle()
        }
      }}
    >
      <div className="flex justify-between items-center w-full relative">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 z-10",
            isDark 
              ? "transform translate-x-0 bg-zinc-800" 
              : "transform translate-x-8 bg-white shadow-sm"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-4.5 h-4.5 text-white" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4.5 h-4.5 text-yellow-500" 
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 absolute right-0",
            isDark 
              ? "opacity-100" 
              : "opacity-0"
          )}
        >
          <Sun 
            className="w-4 h-4 text-gray-500" 
            strokeWidth={1.5}
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 absolute left-0",
            isDark 
              ? "opacity-0" 
              : "opacity-100"
          )}
        >
          <Moon 
            className="w-4 h-4 text-black" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  )
}

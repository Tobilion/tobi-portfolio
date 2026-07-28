import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "../../providers/ThemeProvider"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark"

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-zinc-100 border border-zinc-200",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleTheme()
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

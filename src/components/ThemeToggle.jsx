import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
      return saved === "dark"
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add("dark")
      document.body.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      document.body.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Toggle Dark Mode"
      className="flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3.5 py-2 text-xs font-bold text-emerald-900 shadow-sm transition-all hover:bg-emerald-50 dark:border-emerald-800/60 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700"
    >
      {darkMode ? (
        <>
          <svg
            className="h-4 w-4 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span>Dark Mode</span>
        </>
      )}
    </button>
  )
}

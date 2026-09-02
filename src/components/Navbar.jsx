import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sticky top-0 z-50 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/30">
            F
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Film <span className="text-emerald-600 dark:text-emerald-400">Searcher</span>
          </span>
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  )
}

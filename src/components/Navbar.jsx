import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import { useWatchlist } from "../context/WatchlistContext"

export default function Navbar() {
  const { watchlist } = useWatchlist()
  const location = useLocation()
  const isWatchlistPage = location.pathname === "/watchlist"

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

        <div className="flex items-center gap-3">
          <Link
            to="/watchlist"
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              isWatchlistPage
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700"
            }`}
          >
            <svg
              className={`h-4 w-4 ${
                watchlist.length > 0 ? "fill-current text-rose-500" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Watchlist</span>
            {watchlist.length > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-extrabold text-white">
                {watchlist.length}
              </span>
            )}
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import MovieCard from "../components/MovieCard"
import { useWatchlist } from "../context/WatchlistContext"

export default function Watchlist() {
  const { watchlist, clearWatchlist } = useWatchlist()
  const [filterType, setFilterType] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [confirmClear, setConfirmClear] = useState(false)

  const filteredWatchlist = watchlist.filter((item) => {
    const matchesType = filterType ? item.Type?.toLowerCase() === filterType.toLowerCase() : true
    const matchesSearch = searchQuery
      ? item.Title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-emerald-50/30 text-gray-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-100 dark:border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  My Watchlist
                </h1>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                  {watchlist.length} {watchlist.length === 1 ? "Item" : "Items"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                Your saved movies, series, and episodes stored locally.
              </p>
            </div>

            {watchlist.length > 0 && (
              <div>
                {confirmClear ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                      Clear all?
                    </span>
                    <button
                      onClick={() => {
                        clearWatchlist()
                        setConfirmClear(false)
                      }}
                      className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                    >
                      Yes, Clear
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="rounded-xl bg-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-300 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="rounded-xl border border-red-200 bg-red-50/60 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/80 transition-colors"
                  >
                    Clear Watchlist
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Search & Filter Toolbar */}
          {watchlist.length > 0 && (
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Within Watchlist */}
              <div className="relative flex-1 sm:max-w-xs">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter saved titles..."
                  className="w-full rounded-xl bg-white px-3.5 py-2 text-xs font-medium border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              {/* Type Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { label: "All", value: "" },
                  { label: "Movies", value: "movie" },
                  { label: "Series", value: "series" },
                  { label: "Episodes", value: "episode" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFilterType(type.value)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                      filterType === type.value
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 dark:border-slate-800 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Watchlist Grid or Empty State */}
          {watchlist.length === 0 ? (
            <div className="mx-auto max-w-md my-16 text-center rounded-3xl border border-emerald-100 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-slate-800 dark:text-emerald-400">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Your Watchlist is Empty
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                You haven&apos;t saved any movies or series yet. Tap the heart icon on any movie card to add it here.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
              >
                Explore Movies
              </Link>
            </div>
          ) : filteredWatchlist.length === 0 ? (
            <div className="my-12 text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No saved items match your filter criteria.
              </p>
              <button
                onClick={() => {
                  setFilterType("")
                  setSearchQuery("")
                }}
                className="mt-3 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredWatchlist.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

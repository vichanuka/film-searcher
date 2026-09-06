import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getMovieDetails } from "../services/omdbApi"
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton"
import Navbar from "../components/Navbar"
import { useWatchlist } from "../context/WatchlistContext"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { isWatchlisted, toggleWatchlist } = useWatchlist()
  const isSaved = movie ? isWatchlisted(movie.imdbID) : false

  useEffect(() => {
    async function fetchDetails() {
      if (!id) return
      try {
        setLoading(true)
        setError("")
        const data = await getMovieDetails(id)
        if (data.Response === "False") {
          setError(data.Error || "Movie details not found.")
        } else {
          setMovie(data)
        }
      } catch {
        setError("Network failure. Failed to load movie details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50/30 dark:bg-slate-950">
        <Navbar />
        <MovieDetailsSkeleton />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-emerald-50/30 text-gray-900 dark:bg-slate-950 dark:text-white">
        <Navbar />
        <main className="px-4 py-12">
          <div className="mx-auto max-w-md text-center rounded-2xl border border-red-100 bg-red-50/80 p-8 shadow-sm dark:border-red-900/50 dark:bg-red-950/40">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-red-900 dark:text-red-200">
              Unable to Load Details
            </h2>
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">
              {error || "Movie details not found."}
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 transition-opacity hover:opacity-90"
            >
              ← Back to Search
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-emerald-50/30 text-gray-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Search
          </Link>

          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900 md:flex">
            {/* Poster */}
            <div className="relative bg-emerald-950 md:w-1/3 flex-shrink-0">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="h-full w-full object-cover min-h-[420px]"
                />
              ) : (
                <div className="flex h-full w-full min-h-[420px] flex-col items-center justify-center bg-emerald-950 p-6 text-center text-emerald-300">
                  <svg
                    className="mb-2 h-16 w-16 text-emerald-500/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-emerald-400/80">
                    No Poster Available
                  </span>
                </div>
              )}

              {/* Watchlist Heart Overlay Button */}
              <button
                type="button"
                onClick={() => toggleWatchlist(movie)}
                title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                className={`absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                  isSaved
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105"
                    : "bg-slate-950/70 text-white hover:bg-rose-500 border border-white/20"
                }`}
              >
                <svg
                  className={`h-5 w-5 ${isSaved ? "fill-current scale-110" : ""}`}
                  fill={isSaved ? "currentColor" : "none"}
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
              </button>

              {/* Type Overlay Badge */}
              {movie.Type && (
                <div className="absolute right-4 top-4 rounded-full bg-emerald-950/80 px-3 py-1 text-xs font-semibold capitalize text-emerald-300 shadow-md backdrop-blur-md border border-emerald-500/30">
                  {movie.Type}
                </div>
              )}
            </div>

            {/* Details Content */}
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-10">
              <div>
                {/* Meta Badges & Watchlist Action */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {movie.Rated && movie.Rated !== "N/A" && (
                      <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                        {movie.Rated}
                      </span>
                    )}
                    {movie.Runtime && movie.Runtime !== "N/A" && (
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {movie.Runtime}
                      </span>
                    )}
                    {movie.Released && movie.Released !== "N/A" && (
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        • {movie.Released}
                      </span>
                    )}
                  </div>

                  {/* Add to Watchlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWatchlist(movie)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isSaved
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/20 hover:bg-rose-600"
                        : "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                      fill={isSaved ? "currentColor" : "none"}
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
                    {isSaved ? "In Watchlist" : "Add to Watchlist"}
                  </button>
                </div>

                {/* Title & Year */}
                <h1 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                  {movie.Title}{" "}
                  <span className="font-normal text-gray-400 dark:text-gray-500">({movie.Year})</span>
                </h1>

                {/* Genres */}
                {movie.Genre && movie.Genre !== "N/A" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.Genre.split(", ").map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Plot */}
                <div className="mt-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Overview
                  </h2>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 font-normal">
                    {movie.Plot !== "N/A"
                      ? movie.Plot
                      : "No plot summary available for this title."}
                  </p>
                </div>

                {/* Cast & Crew */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {movie.Director && movie.Director !== "N/A" && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Director
                      </h3>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                        {movie.Director}
                      </p>
                    </div>
                  )}
                  {movie.Actors && movie.Actors !== "N/A" && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Cast
                      </h3>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                        {movie.Actors}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ratings */}
              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="mt-8 pt-6 border-t border-emerald-100 dark:border-slate-800">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Ratings & Reviews
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {movie.Ratings.map((rating) => (
                      <div
                        key={rating.Source}
                        className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-100/80 dark:bg-slate-800 dark:border-slate-700"
                      >
                        <span className="block text-xs font-semibold text-emerald-800/70 dark:text-gray-400 truncate">
                          {rating.Source}
                        </span>
                        <span className="text-base font-extrabold text-emerald-950 dark:text-white">
                          {rating.Value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

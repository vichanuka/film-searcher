import { useState } from "react"
import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false)
  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgError

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50 dark:hover:shadow-emerald-500/5"
    >
      {/* Poster Container */}
      <div className="relative h-80 w-full overflow-hidden bg-gray-900 dark:bg-slate-950">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-emerald-950 p-4 text-center text-emerald-300">
            <svg
              className="mb-2 h-12 w-12 text-emerald-500/60"
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

        {/* Media Type Badge */}
        {movie.Type && (
          <div className="absolute right-3 top-3 rounded-full bg-emerald-950/80 px-2.5 py-0.5 text-xs font-semibold capitalize text-emerald-300 shadow-sm backdrop-blur-md border border-emerald-500/30">
            {movie.Type}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2
            className="line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400"
            title={movie.Title}
          >
            {movie.Title}
          </h2>

          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {movie.Year}
          </p>
        </div>

        {/* Action Link / Info */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {movie.imdbID}
          </span>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 hover:underline flex items-center gap-1 dark:text-emerald-400 dark:hover:text-emerald-300"
            onClick={(e) => e.stopPropagation()}
          >
            IMDb
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </Link>
  )
}

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getMovieDetails } from "../services/omdbApi"
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
    return <MovieDetailsSkeleton />
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-emerald-50/30 px-4 py-12">
        <div className="mx-auto max-w-md text-center rounded-2xl border border-red-100 bg-red-50/80 p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
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
          <h2 className="text-lg font-bold text-red-900">
            Unable to Load Details
          </h2>
          <p className="mt-2 text-sm font-medium text-red-600">
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
    )
  }

  return (
    <main className="min-h-screen bg-emerald-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
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

        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-500/5 md:flex">
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
              {/* Meta Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {movie.Rated && movie.Rated !== "N/A" && (
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-100">
                    {movie.Rated}
                  </span>
                )}
                {movie.Runtime && movie.Runtime !== "N/A" && (
                  <span className="text-xs font-semibold text-gray-500">
                    {movie.Runtime}
                  </span>
                )}
                {movie.Released && movie.Released !== "N/A" && (
                  <span className="text-xs font-semibold text-gray-500">
                    • {movie.Released}
                  </span>
                )}
              </div>

              {/* Title & Year */}
              <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {movie.Title}{" "}
                <span className="font-normal text-gray-400">({movie.Year})</span>
              </h1>

              {/* Genres */}
              {movie.Genre && movie.Genre !== "N/A" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.Genre.split(", ").map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Plot */}
              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Overview
                </h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-700 font-normal">
                  {movie.Plot !== "N/A"
                    ? movie.Plot
                    : "No plot summary available for this title."}
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {movie.Director && movie.Director !== "N/A" && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Director
                    </h3>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {movie.Director}
                    </p>
                  </div>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Cast
                    </h3>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {movie.Actors}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Ratings & Reviews
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {movie.Ratings.map((rating) => (
                    <div
                      key={rating.Source}
                      className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-100/80"
                    >
                      <span className="block text-xs font-semibold text-emerald-800/70 truncate">
                        {rating.Source}
                      </span>
                      <span className="text-base font-extrabold text-emerald-950">
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
  )
}

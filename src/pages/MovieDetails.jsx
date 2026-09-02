import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getMovieDetails } from "../services/omdbApi"

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
          setError(data.Error || "Movie details not found")
        } else {
          setMovie(data)
        }
      } catch {
        setError("Failed to load movie details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          <p className="mt-4 font-medium text-gray-600">Loading movie details...</p>
        </div>
      </main>
    )
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg font-medium text-red-500">{error || "Movie not found"}</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            ← Back to Search
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 font-medium text-gray-600 transition-colors hover:text-black"
        >
          ← Back to Search
        </Link>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:flex">
          {/* Poster */}
          <div className="relative bg-gray-900 md:w-1/3">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="h-full w-full object-cover min-h-[400px]"
            />
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col justify-between p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {movie.Rated}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {movie.Runtime}
                </span>
                <span className="text-sm font-medium text-gray-500">•</span>
                <span className="text-sm font-medium text-gray-500">
                  {movie.Released}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                {movie.Title} <span className="font-normal text-gray-500">({movie.Year})</span>
              </h1>

              {/* Genres */}
              {movie.Genre && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.Genre.split(", ").map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Plot */}
              <div className="mt-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Overview
                </h2>
                <p className="mt-2 leading-relaxed text-gray-700">
                  {movie.Plot !== "N/A" ? movie.Plot : "No plot summary available."}
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Director
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {movie.Director}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Cast
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {movie.Actors}
                  </p>
                </div>
              </div>
            </div>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Ratings
                </h3>
                <div className="flex flex-wrap gap-6">
                  {movie.Ratings.map((rating) => (
                    <div key={rating.Source}>
                      <span className="block text-xs font-medium text-gray-500">
                        {rating.Source}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
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

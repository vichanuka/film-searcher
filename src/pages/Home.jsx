import { useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { searchMovies } from "../services/omdbApi"

export default function Home() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch() {
    if (!query.trim()) {
      return
    }

    try {
      setLoading(true)
      setError("")

      const data = await searchMovies(query)

      if (data.Response === "False") {
        setMovies([])
        setError(data.Error || "No movies found")
        return
      }

      setMovies(data.Search || [])
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-center text-4xl font-bold">
          Film Searcher
        </h1>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />

        {loading && (
          <p className="mt-8 text-center">
            Searching...
          </p>
        )}

        {error && (
          <p className="mt-8 text-center text-red-500">
            {error}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>

      </div>
    </main>
  )
}

import { useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import MovieCardSkeleton from "../components/MovieCardSkeleton"
import Pagination from "../components/Pagination"
import { searchMovies } from "../services/omdbApi"

export default function Home() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("")
  const [year, setYear] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searched, setSearched] = useState(false)

  async function fetchMovies(
    searchQuery,
    targetPage = 1,
    selectedType = type,
    selectedYear = year
  ) {
    const trimmed = searchQuery.trim()
    if (!trimmed) {
      setError("Please enter a movie title to search.")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSearched(true)

      const data = await searchMovies(
        trimmed,
        targetPage,
        selectedType,
        selectedYear
      )

      if (data.Response === "False") {
        setMovies([])
        setTotalResults(0)
        
        const apiErr = data.Error || ""
        if (apiErr.toLowerCase().includes("too many results")) {
          setError("Too many results found. Please enter a more specific movie title.")
        } else if (apiErr.toLowerCase().includes("not found")) {
          setError(`No movies found matching "${trimmed}". Try adjusting your filters.`)
        } else {
          setError(apiErr || "No movies found matching your request.")
        }
        return
      }

      setMovies(data.Search || [])
      setTotalResults(parseInt(data.totalResults || "0", 10))
      setPage(targetPage)
    } catch {
      setError("Network or API error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleSearch() {
    fetchMovies(query, 1, type, year)
  }

  function handleResetFilters() {
    setType("")
    setYear("")
    if (query.trim()) {
      fetchMovies(query, 1, "", "")
    }
  }

  function handlePageChange(newPage) {
    fetchMovies(query, newPage, type, year)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const totalPages = Math.ceil(totalResults / 10)

  return (
    <main className="min-h-screen bg-emerald-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Branding */}
        <header className="mb-8 text-center sm:mb-10">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3 border border-emerald-200">
            Powered by OMDb API
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Film <span className="text-emerald-600">Searcher</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto font-medium">
            Explore millions of movies, TV series, and episodes with instant details, plot overviews, and ratings.
          </p>
        </header>

        {/* Search & Filters */}
        <div className="mx-auto max-w-4xl">
          <SearchBar
            value={query}
            onChange={setQuery}
            type={type}
            onTypeChange={setType}
            year={year}
            onYearChange={setYear}
            onSearch={handleSearch}
            onReset={handleResetFilters}
          />
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="mt-10">
            <div className="mb-4 h-4 w-36 rounded bg-emerald-200/60 animate-pulse" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {/* API Error State */}
        {!loading && error && (
          <div className="mt-10 mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50/70 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
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
            <h3 className="text-base font-bold text-red-900">
              Search Result Notice
            </h3>
            <p className="mt-1 text-sm text-red-600 font-medium">
              {error}
            </p>
            {(type || year) && (
              <button
                onClick={handleResetFilters}
                className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && movies.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-100 pb-3">
              <p className="text-sm font-medium text-gray-600">
                Found <span className="font-bold text-emerald-700">{totalResults}</span> results for &ldquo;<span className="font-semibold text-gray-800">{query}</span>&rdquo;
              </p>
              {(type || year) && (
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  Filtered by: {[type, year].filter(Boolean).join(" • ")}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Initial Empty State */}
        {!searched && !loading && (
          <div className="mt-16 text-center text-gray-400 py-12 border-2 border-dashed border-emerald-200/80 rounded-3xl bg-white/50">
            <svg
              className="mx-auto h-12 w-12 text-black mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-base font-semibold text-gray-700">
              Start typing above to search for movies
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Try searching for &ldquo;Batman&rdquo;, &ldquo;Inception&rdquo;, or &ldquo;Avengers&rdquo;
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

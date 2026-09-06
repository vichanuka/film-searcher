import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import MovieCardSkeleton from "../components/MovieCardSkeleton"
import Pagination from "../components/Pagination"
import { searchMovies, getMovieDetails } from "../services/omdbApi"
import { getPopularIdsBatch, fallbackKeywords } from "../data/popularMovies"

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

  // Popular movies state
  const [popularMovies, setPopularMovies] = useState([])
  const [popularLoading, setPopularLoading] = useState(true)
  const [popularBatchPage, setPopularBatchPage] = useState(1)
  const [loadingMorePopular, setLoadingMorePopular] = useState(false)

  async function loadPopularBatch(pageNumber = 1) {
    const idsToFetch = getPopularIdsBatch(pageNumber, 10)
    let fetchedMovies = []

    if (idsToFetch.length > 0) {
      const results = await Promise.all(
        idsToFetch.map((id) => getMovieDetails(id).catch(() => null))
      )
      fetchedMovies = results.filter((m) => m && m.Response !== "False")
    } else {
      const keywordIndex = (pageNumber - 6) % fallbackKeywords.length
      const keyword = fallbackKeywords[Math.abs(keywordIndex)] || "movie"
      try {
        const searchRes = await searchMovies(keyword, 1)
        fetchedMovies = searchRes.Search || []
      } catch {
        fetchedMovies = []
      }
    }

    return fetchedMovies
  }

  useEffect(() => {
    async function initPopularMovies() {
      try {
        setPopularLoading(true)
        const initialBatch = await loadPopularBatch(1)
        setPopularMovies(initialBatch)
        setPopularBatchPage(1)
      } catch {
        setPopularMovies([])
      } finally {
        setPopularLoading(false)
      }
    }

    initPopularMovies()
  }, [])

  async function handleLoadMorePopular() {
    if (loadingMorePopular) return
    try {
      setLoadingMorePopular(true)
      const nextPage = popularBatchPage + 1
      const newItems = await loadPopularBatch(nextPage)

      setPopularMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.imdbID))
        const filteredNew = newItems.filter((m) => !existingIds.has(m.imdbID))
        return [...prev, ...filteredNew]
      })
      setPopularBatchPage(nextPage)
    } catch {
      // ignore
    } finally {
      setLoadingMorePopular(false)
    }
  }

  function handleCollapsePopular() {
    setPopularMovies((prev) => prev.slice(0, 10))
    setPopularBatchPage(1)
  }

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

      const isFourDigitYear = /^\d{4}$/.test(selectedYear)
      const apiYear = isFourDigitYear ? selectedYear : ""

      const data = await searchMovies(
        trimmed,
        targetPage,
        selectedType,
        apiYear
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

      let results = data.Search || []

      if (selectedYear && !isFourDigitYear) {
        results = results.filter((movie) => {
          const yNum = parseInt(movie.Year?.match(/\d{4}/)?.[0] || "0", 10)
          if (!yNum) return true
          if (selectedYear === "2020s") return yNum >= 2020 && yNum <= 2029
          if (selectedYear === "2010s") return yNum >= 2010 && yNum <= 2019
          if (selectedYear === "2000s") return yNum >= 2000 && yNum <= 2009
          if (selectedYear === "1990s") return yNum >= 1990 && yNum <= 1999
          if (selectedYear === "before-1990") return yNum < 1990
          return true
        })
      }

      setMovies(results)
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

  function handleClearSearch() {
    setQuery("")
    setType("")
    setYear("")
    setSearched(false)
    setMovies([])
    setError("")
  }

  function handlePageChange(newPage) {
    fetchMovies(query, newPage, type, year)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const totalPages = Math.ceil(totalResults / 10)

  return (
    <div className="min-h-screen bg-emerald-50/30 text-gray-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header Branding */}
          <header className="mb-8 text-center sm:mb-10">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3 border border-emerald-200 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300">
              Powered by OMDb API
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Film <span className="text-emerald-600 dark:text-emerald-400">Searcher</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-medium">
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

          {/* Search Results / Loading / Error State */}
          {searched ? (
            <>
              {/* Loading Skeletons */}
              {loading && (
                <div className="mt-10">
                  <div className="mb-4 h-4 w-36 rounded bg-emerald-200/60 dark:bg-slate-800 animate-pulse" />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <MovieCardSkeleton key={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* API Error State */}
              {!loading && error && (
                <div className="mt-10 mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50/70 p-6 text-center shadow-sm dark:border-red-900/50 dark:bg-red-950/40">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300">
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
                  <h3 className="text-base font-bold text-red-900 dark:text-red-200">
                    Search Result Notice
                  </h3>
                  <p className="mt-1 text-sm text-red-600 font-medium dark:text-red-300">
                    {error}
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    ← Back to Popular Movies
                  </button>
                </div>
              )}

              {/* Search Results Grid */}
              {!loading && !error && movies.length > 0 && (
                <div className="mt-10">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleClearSearch}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100/60 px-3 py-1 rounded-lg transition-colors dark:bg-slate-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        ← Back
                      </button>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Found <span className="font-bold text-emerald-700 dark:text-emerald-400">{totalResults}</span> results for &ldquo;<span className="font-semibold text-gray-800 dark:text-gray-200">{query}</span>&rdquo;
                      </p>
                    </div>
                    {(type || year) && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300">
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
            </>
          ) : (
            /* Popular Movies Section (Default view before search) */
            <section className="mt-12">
              <div className="mb-6 flex items-center justify-between border-b border-emerald-100 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Popular Movies
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                    Hand-picked blockbusters & timeless classics
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Top Rated
                </span>
              </div>

              {popularLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {popularMovies.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                    {loadingMorePopular &&
                      Array.from({ length: 5 }).map((_, i) => (
                        <MovieCardSkeleton key={`skeleton-more-${i}`} />
                      ))}
                  </div>

                  {/* Load More Button Container */}
                  <div className="mt-10 flex items-center justify-center">
                    <button
                      onClick={handleLoadMorePopular}
                      disabled={loadingMorePopular}
                      className="group flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
                    >
                      {loadingMorePopular ? (
                        <>
                          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Fetching More Movies...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Popular Movies</span>
                          <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

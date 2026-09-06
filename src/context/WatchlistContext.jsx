import { createContext, useContext, useState, useEffect } from "react"

const WatchlistContext = createContext()

const STORAGE_KEY = "film_searcher_watchlist"

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    } catch (e) {
      console.error("Failed to save watchlist to localStorage", e)
    }
  }, [watchlist])

  const isWatchlisted = (imdbID) => {
    return watchlist.some((item) => item.imdbID === imdbID)
  }

  const addToWatchlist = (movie) => {
    if (!movie || !movie.imdbID) return
    if (isWatchlisted(movie.imdbID)) return

    const itemToSave = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type || "movie",
    }

    setWatchlist((prev) => [itemToSave, ...prev])
  }

  const removeFromWatchlist = (imdbID) => {
    setWatchlist((prev) => prev.filter((item) => item.imdbID !== imdbID))
  }

  const toggleWatchlist = (movie) => {
    if (!movie || !movie.imdbID) return
    if (isWatchlisted(movie.imdbID)) {
      removeFromWatchlist(movie.imdbID)
    } else {
      addToWatchlist(movie)
    }
  }

  const clearWatchlist = () => {
    setWatchlist([])
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isWatchlisted,
        clearWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}

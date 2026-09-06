import { useEffect } from "react"
import { getTrailerVideoId } from "../data/trailers"

export default function TrailerModal({ isOpen, onClose, movie }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !movie) return null

  const videoId = getTrailerVideoId(movie.imdbID)
  const searchQuery = encodeURIComponent(`${movie.Title} ${movie.Year || ""} official trailer`)
  const directYoutubeUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : `https://www.youtube.com/results?search_query=${searchQuery}`

  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-emerald-950/30">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5 truncate">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 font-bold text-xs">
              ▶
            </span>
            <h3 className="truncate text-base font-bold text-white sm:text-lg">
              {movie.Title} <span className="font-normal text-gray-400">({movie.Year})</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Close trailer (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Video Container (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${movie.Title} Official Trailer`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-600/20 text-rose-500 border border-rose-500/30">
                <svg className="h-8 w-8 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                Watch &ldquo;{movie.Title}&rdquo; Trailer on YouTube
              </h4>
              <p className="text-xs text-gray-400 max-w-sm mb-5">
                Click below to watch the official high-definition trailer directly on YouTube.
              </p>
              <a
                href={directYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-700 active:scale-95 transition-all"
              >
                Watch Trailer on YouTube ↗
              </a>
            </div>
          )}
        </div>

        {/* Footer / Action */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-800 bg-slate-950/50 px-6 py-3.5">
          <span className="text-xs text-gray-400">
            {embedUrl ? "Official HD Trailer" : "YouTube Search Search Player"}
          </span>

          <a
            href={directYoutubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-1.5 text-xs font-bold text-gray-300 hover:bg-rose-600 hover:text-white transition-all self-start sm:self-auto"
          >
            Open on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  )
}

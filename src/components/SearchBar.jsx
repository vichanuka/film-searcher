export default function SearchBar({
  value,
  onChange,
  type,
  onTypeChange,
  year,
  onYearChange,
  onSearch,
  onReset,
}) {
  const isFiltered = type || year

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-3 shadow-md shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:flex-row sm:items-center">
        {/* Search Input with Icon */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-700 dark:text-gray-300">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search movies, series, episodes..."
            className="w-full rounded-xl bg-emerald-50/50 py-3 pl-10 pr-4 text-sm font-medium text-gray-900 placeholder-gray-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-400/30"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Type Selector */}
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="flex-1 rounded-xl bg-emerald-50/50 px-3 py-3 text-xs font-semibold text-emerald-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:bg-slate-800 dark:text-emerald-300 dark:focus:bg-slate-800 sm:w-32"
          >
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>

          {/* Year Input */}
          <input
            type="number"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            placeholder="Year"
            min="1900"
            max={new Date().getFullYear()}
            className="w-24 rounded-xl bg-emerald-50/50 px-3 py-3 text-xs font-semibold text-emerald-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:bg-slate-800 dark:text-emerald-300 dark:placeholder-gray-500 dark:focus:bg-slate-800"
          />

          {/* Reset Filters Button */}
          {isFiltered && onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Reset filters"
              className="rounded-xl bg-emerald-100/70 px-3 py-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-200/80 transition-colors dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700"
            >
              Reset
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="flex-1 sm:flex-none rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm transition-all hover:bg-emerald-50 hover:border-emerald-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-emerald-200"
      >
        Previous
      </button>

      <span className="text-sm font-medium text-gray-600">
        Page <span className="font-bold text-emerald-700">{currentPage}</span> of{" "}
        <span className="font-bold text-gray-900">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm transition-all hover:bg-emerald-50 hover:border-emerald-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-emerald-200"
      >
        Next
      </button>
    </div>
  )
}

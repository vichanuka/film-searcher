export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
        placeholder="Search for a movie..."
        className="flex-1 rounded-lg border px-4 py-3"
      />

      <button
        onClick={onSearch}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Search
      </button>
    </div>
  )
}

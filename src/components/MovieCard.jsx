export default function MovieCard({ movie }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="h-80 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold">{movie.Title}</h2>

        <p className="mt-1 text-sm text-gray-500">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  )
}

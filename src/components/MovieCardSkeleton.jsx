export default function MovieCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Poster Skeleton */}
      <div className="h-80 w-full bg-gray-200" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-2">
          {/* Title line 1 */}
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          {/* Title line 2 */}
          <div className="h-4 w-3/5 rounded bg-gray-200" />
          {/* Year line */}
          <div className="h-3 w-1/4 rounded bg-gray-150 mt-2" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="h-3 w-10 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export default function MovieCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Poster Skeleton */}
      <div className="h-80 w-full bg-gray-200 dark:bg-slate-800" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-2">
          {/* Title line 1 */}
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-slate-800" />
          {/* Title line 2 */}
          <div className="h-4 w-3/5 rounded bg-gray-200 dark:bg-slate-800" />
          {/* Year line */}
          <div className="h-3 w-1/4 rounded bg-gray-150 dark:bg-slate-800 mt-2" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-3">
          <div className="h-3 w-12 rounded bg-gray-200 dark:bg-slate-800" />
          <div className="h-3 w-10 rounded bg-gray-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  )
}

export default function MovieDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl animate-pulse">
        {/* Back Link Skeleton */}
        <div className="mb-6 h-4 w-28 rounded bg-gray-300" />

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:flex">
          {/* Poster Skeleton */}
          <div className="h-[420px] bg-gray-300 md:w-1/3" />

          {/* Details Skeleton */}
          <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-12 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>

              <div className="h-8 w-3/4 rounded bg-gray-300" />

              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
                <div className="h-6 w-20 rounded-full bg-gray-200" />
                <div className="h-6 w-14 rounded-full bg-gray-200" />
              </div>

              <div className="pt-4 space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-4/6 rounded bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex gap-6">
              <div className="h-10 w-24 rounded bg-gray-200" />
              <div className="h-10 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

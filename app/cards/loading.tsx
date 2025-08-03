import { StarLoading, CardLoadingSkeleton } from "@/components/ui/star-loading"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <StarLoading size="lg" variant="constellation" message="Gathering the tarot wisdom..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardLoadingSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

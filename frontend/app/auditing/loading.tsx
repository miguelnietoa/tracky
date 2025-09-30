import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AuditingLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-80 mb-2 bg-gray-800" />
          <Skeleton className="h-6 w-96 bg-gray-800" />
        </div>

        {/* Metrics Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                    <Skeleton className="h-8 w-16 bg-gray-800" />
                    <Skeleton className="h-4 w-12 bg-gray-800" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-lg bg-gray-800" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full bg-gray-800" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <Skeleton className="h-6 w-32 bg-gray-800" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full bg-gray-800" />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

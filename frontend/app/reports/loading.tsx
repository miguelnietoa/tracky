import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReportsLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Skeleton className="h-10 w-80 mb-2 bg-gray-800" />
            <Skeleton className="h-6 w-96 bg-gray-800" />
          </div>
          <Skeleton className="h-10 w-40 bg-gray-800" />
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

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 bg-gray-800" />
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
                <CardContent>
                  <Skeleton className="h-64 w-full bg-gray-800" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

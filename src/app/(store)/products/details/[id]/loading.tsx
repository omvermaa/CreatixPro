"use client";

export default function ProductDetailsLoading() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen animate-pulse">
      {/* Back link skeleton */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="h-4 w-48 bg-gray-200 rounded-sm" />
      </div>

      {/* Product details skeleton */}
      <section className="py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image skeleton */}
            <div className="aspect-square bg-white border border-gray-100 shadow-2xl p-4">
              <div className="w-full h-full bg-gray-100 rounded-sm" />
            </div>

            {/* Info skeleton */}
            <div>
              {/* Category tags */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-32 bg-[#B8941F]/10 rounded-sm" />
                <div className="h-4 w-20 bg-gray-100 rounded-sm" />
              </div>

              {/* Title */}
              <div className="h-10 w-full bg-gray-200 mb-3 rounded-sm" />
              <div className="h-10 w-2/3 bg-gray-200 mb-6 rounded-sm" />

              {/* Description */}
              <div className="border-l-4 border-gray-200 pl-6 py-2 mb-8">
                <div className="h-5 w-full bg-gray-100 mb-2 rounded-sm" />
                <div className="h-5 w-4/5 bg-gray-100 mb-2 rounded-sm" />
                <div className="h-5 w-3/5 bg-gray-100 rounded-sm" />
              </div>

              {/* Specs card skeleton */}
              <div className="bg-white border border-gray-100 p-8 mb-8 shadow-xl">
                <div className="h-4 w-28 bg-gray-200 mb-8 rounded-sm" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50">
                      <div className="h-3 w-28 bg-gray-100 rounded-sm" />
                      <div className="h-3 w-24 bg-gray-200 rounded-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA button skeleton */}
              <div className="h-14 w-full bg-gray-900/20 rounded-sm" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

export default function SubcategoryLoading() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen animate-pulse">
      {/* Banner skeleton */}
      <section className="relative h-[180px] md:h-[220px] w-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="bg-black/40 px-8 py-4">
          <div className="h-10 w-56 bg-gray-300 rounded-sm" />
        </div>
      </section>

      {/* Breadcrumb skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-4 w-72 bg-gray-200 rounded-sm" />
      </div>

      {/* Header row */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#B8941F]/10 rounded-sm" />
              <div>
                <div className="h-4 w-32 bg-gray-200 mb-2 rounded-sm" />
                <div className="h-3 w-40 bg-gray-100 rounded-sm" />
              </div>
            </div>
            <div className="h-3 w-16 bg-gray-200 rounded-sm" />
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm">
                <div className="aspect-[4/5] bg-gray-100" />
                <div className="p-6 border-t border-gray-50">
                  <div className="h-4 w-3/4 bg-gray-200 mb-2 rounded-sm" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

export default function CategoryLoading() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen animate-pulse">
      {/* Banner skeleton */}
      <section className="relative h-[180px] md:h-[220px] w-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="bg-black/40 px-8 py-4">
          <div className="h-10 w-64 bg-gray-300 rounded-sm" />
        </div>
      </section>

      {/* Breadcrumb skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-4 w-60 bg-gray-200 rounded-sm" />
      </div>

      {/* Header row */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="h-4 w-36 bg-gray-200 rounded-sm" />
            <div className="h-3 w-32 bg-gray-200 rounded-sm" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-6 border-t border-gray-50">
                  <div className="h-5 w-3/4 bg-gray-200 mb-3 rounded-sm" />
                  <div className="h-3 w-24 bg-gray-100 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

export default function SearchLoading() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <section className="relative bg-[#0A0A0A] py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <div className="h-10 w-72 bg-gray-700 mx-auto mb-8 rounded-sm" />
          <div className="max-w-2xl mx-auto h-14 bg-gray-800 rounded-sm shadow-2xl" />
        </div>
      </section>

      {/* Breadcrumb skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-4 w-40 bg-gray-200 rounded-sm" />
      </div>

      {/* Results skeleton */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#B8941F]/10 rounded-sm" />
              <div>
                <div className="h-4 w-28 bg-gray-200 mb-2 rounded-sm" />
                <div className="h-3 w-40 bg-gray-100 rounded-sm" />
              </div>
            </div>
            <div className="h-3 w-16 bg-gray-200 rounded-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

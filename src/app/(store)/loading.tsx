"use client";

export default function StoreLoading() {
  return (
    <div className="flex flex-col min-h-[80vh] animate-pulse">
      {/* Hero skeleton */}
      <section className="relative py-32 overflow-hidden bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="h-4 w-40 bg-gray-200 mx-auto mb-8 rounded-sm" />
          <div className="h-12 w-[400px] max-w-full bg-gray-200 mx-auto mb-6 rounded-sm" />
          <div className="h-5 w-[500px] max-w-full bg-gray-100 mx-auto rounded-sm" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-white py-16 px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-8">
                  <div className="h-5 w-3/4 bg-gray-200 mb-3 rounded-sm" />
                  <div className="h-4 w-full bg-gray-100 mb-2 rounded-sm" />
                  <div className="h-4 w-2/3 bg-gray-100 mb-6 rounded-sm" />
                  <div className="border-t border-gray-50 pt-6 flex justify-between">
                    <div className="h-3 w-24 bg-gray-100 rounded-sm" />
                    <div className="h-3 w-3 bg-gray-200 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

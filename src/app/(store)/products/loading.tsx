"use client";

export default function ProductsLoading() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="h-4 w-32 bg-gray-200 mx-auto mb-8 rounded-sm" />
          <div className="h-12 w-[420px] max-w-full bg-gray-200 mx-auto mb-6 rounded-sm" />
          <div className="h-5 w-[500px] max-w-full bg-gray-100 mx-auto rounded-sm" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-8 border-t border-gray-50">
                  <div className="h-5 w-3/4 bg-gray-200 mb-3 rounded-sm" />
                  <div className="h-4 w-full bg-gray-100 mb-2 rounded-sm" />
                  <div className="h-4 w-2/3 bg-gray-100 mb-6 rounded-sm" />
                  <div className="border-t border-gray-50 pt-6 flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="h-3 w-20 bg-gray-100 rounded-sm" />
                      <div className="h-3 w-16 bg-gray-100 rounded-sm" />
                    </div>
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

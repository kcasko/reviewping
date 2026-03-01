export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar skeleton */}
      <aside className="w-60 bg-white border-r border-gray-200 fixed h-full animate-pulse">
        <div className="p-5 border-b border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-32" />
        </div>
        <div className="p-3 border-b border-gray-100">
          <div className="h-10 bg-gray-100 rounded-lg" />
        </div>
        <div className="p-3 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </aside>

      {/* Content skeleton */}
      <main className="ml-60 flex-1 p-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-7 bg-gray-200 rounded w-12" />
                  <div className="h-4 bg-gray-100 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse max-w-lg">
          <div className="h-6 bg-gray-200 rounded w-48 mb-5" />
          <div className="space-y-4">
            <div className="h-10 bg-gray-100 rounded-lg" />
            <div className="h-10 bg-gray-100 rounded-lg" />
            <div className="h-10 bg-gray-100 rounded-lg" />
            <div className="h-12 bg-blue-200 rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  );
}

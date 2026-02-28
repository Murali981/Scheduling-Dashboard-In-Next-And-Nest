export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md border border-gray-100 p-5 animate-pulse"
        >
          {/* Title and Badge */}
          <div className="flex justify-between items-start mb-3">
            <div className="h-5 bg-gray-200 rounded w-2/3" />
            <div className="h-6 bg-gray-200 rounded-full w-20" />
          </div>

          {/* Price */}
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />

          {/* Duration */}
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />

          {/* Slots label */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />

          {/* Slot badges */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-gray-200 rounded w-12" />
            <div className="h-6 bg-gray-200 rounded w-12" />
            <div className="h-6 bg-gray-200 rounded w-12" />
          </div>

          {/* Footer: Status and Button */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

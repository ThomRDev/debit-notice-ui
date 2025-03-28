const DebtNoticeSkeleton = () => {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-200 h-16 mb-6 rounded"></div>

      {/* Document Info Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-4 bg-gray-200 rounded w-3/4 ml-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 ml-auto"></div>
        </div>
      </div>

      {/* Client and Payment Info Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6 border-t pt-4">
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="mb-6">
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>

      {/* Observations Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-end space-x-4 mt-6">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default DebtNoticeSkeleton;

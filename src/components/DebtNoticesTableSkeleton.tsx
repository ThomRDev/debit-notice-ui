const DebtNoticesTableSkeleton = () => {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="grid grid-cols-8 gap-2 p-2 border-b-2 border-gray-300 bg-gray-100">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
      </div>

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-8 gap-2 p-2 border-b border-gray-200"
        >
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 w-6 bg-gray-200 rounded mx-auto"></div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default DebtNoticesTableSkeleton;

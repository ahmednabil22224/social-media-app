import React from 'react'

const LoaderSpinner = () => {
  return (
    <div className="py-6 text-center text-gray-400">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
      Loading more posts...
    </div>
  );
}

export default LoaderSpinner

import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-6xl font-bold text-green-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist or may be moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all">
        Go Home
      </Link>
    </div>
  );
};

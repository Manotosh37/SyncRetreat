import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-[#0a0a0a]">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">Node Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The infrastructure directory or node you are attempting to access does not exist, has been deprecated, or is currently restricted.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-white text-black hover:bg-gray-200 font-medium rounded-md transition-colors"
      >
        Return to Main Dashboard
      </Link>
    </div>
  );
}
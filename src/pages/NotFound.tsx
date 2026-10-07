import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">
          Error 404
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-5 text-gray-500 leading-7">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Back to Home
          </Link>

          <Link
            to="/blogs"
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
          >
            View Blogs
          </Link>
        </div>
      </div>
    </main>
  );
}

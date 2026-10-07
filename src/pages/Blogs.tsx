import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { Footer } from '../components/Footer';

export default function Blogs() {
  const { slug } = useParams();

  // If a slug exists, find that particular blog
  const selectedBlog = slug
    ? blogs.find((blog) => blog.slug === slug)
    : null;

  // Individual blog page
  if (slug) {
    if (!selectedBlog) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Blog Not Found</h1>
            <p className="mt-2 text-gray-500">
              The blog you're looking for doesn't exist.
            </p>

            <Link
              to="/blogs"
              className="inline-block mt-4 underline"
            >
              Back to Blogs
            </Link>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/blogs"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Blogs
        </Link>

        <article className="mt-8">
          <h1 className="text-4xl font-bold">
            {selectedBlog.title}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {selectedBlog.date}
          </p>

          <div className="mt-8 leading-8 whitespace-pre-line">
            {selectedBlog.content}
          </div>
        </article>
      
      </main>
      
      
    );
  }

  // All blogs page
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <Link
              to="/"
              className="text-sm text-gray-500 hover:text-black"
            >
             ← Back to Home
            </Link>
      <h1 className="text-4xl font-bold">
        Blogs
      </h1>

      <p className="mt-2 text-gray-500">
        Tips, guides and insights about resumes and careers.
      </p>

      <div className="grid gap-6 mt-10">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="border rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold">
              {blog.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {blog.description}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {blog.date}
            </p>

            <Link
              to={`/blogs/${blog.slug}`}
              className="inline-block mt-4 underline"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

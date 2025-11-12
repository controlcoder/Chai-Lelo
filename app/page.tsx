"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-orange-50 text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-orange-700 mb-6">
        ☕ Chai Lelo
      </h1>
      <p className="text-gray-700 text-lg mb-10 max-w-md">
        Welcome to Chai Lelo — order your favorite chai and food for lunch or dinner.
      </p>

      <div className="flex gap-6">
        <Link
          href="/accounts/login"
          className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
        >
          Login to continue
        </Link>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        Made with ❤️ for chai lovers.
      </footer>
    </main>
  );
}

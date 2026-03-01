import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
          <span className="font-bold text-xl text-gray-900">ReviewPing</span>
        </div>
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <p className="text-gray-500 mb-8">
          This page doesn&apos;t exist. Maybe it was moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}

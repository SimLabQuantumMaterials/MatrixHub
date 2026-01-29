import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#003D66]">404 - Page Not Found</h1>
          <p className="mt-2 text-gray-600">The page you are looking for could not be found.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link 
              href="/"
              className="inline-block bg-[#003D66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002D4D] transition-colors duration-200"
            >
              Go to Home
            </Link>
            <Link 
              href="/matrices"
              className="inline-block border border-[#003D66] text-[#003D66] px-6 py-3 rounded-lg font-medium hover:bg-[#003D66]/5 transition-colors duration-200"
            >
              Browse Matrices
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

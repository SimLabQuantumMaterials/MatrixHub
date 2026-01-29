import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#003D66] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003D66] to-[#002D4D] opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Matrix Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              A collection of matrices from quantum chemistry, materials science, and computational physics (eigenvalue problems, linear systems, and more)
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/matrices"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#003D66] bg-white hover:bg-gray-100 transition-colors"
              >
                Browse Matrices
              </Link>
              <Link 
                href="/io"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Learn About I/O Formats
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Matrix Hub</h1>
            <p className="text-lg sm:text-xl text-gray-600">A collection of scientific matrices for benchmarking and numerical development of NLA libraries and solvers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benchmarking</h3>
              <p className="text-gray-600">Access a diverse collection of matrices to evaluate and compare the performance of numerical linear algebra libraries and solvers</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600">Use real-world problems from scientific applications to test and improve numerical algorithms and solver implementations</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Research</h3>
              <p className="text-gray-600">Explore eigenvalue and linear-system problems from various scientific domains to advance numerical linear algebra research and development</p>
            </div>
          </div>
        </div>
      </div>

      {/* Matrix Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Matrix Categories</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore matrices from different scientific simulations and calculations
            </p>
          </div>
          <div className="mb-12 sm:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">DFT Matrices</h3>
                <p className="text-gray-600 mb-4">Density Functional Theory matrices from FLEUR and FHI-aims, including FLAPW and NAOs methods</p>
                <Link href="/matrices?type=DFT" className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse DFT Matrices →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">BSE Matrices</h3>
                <p className="text-gray-600 mb-4">Bethe-Salpeter Equation matrices from Jena BSE code and Yambo, available in various sizes and precisions</p>
                <Link href="/matrices?type=BSE" className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse BSE Matrices →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">System Types</h3>
                <p className="text-gray-600 mb-4">Matrices from various physical systems including Silicon, MoS2, In2O3, and more, with different sizes and properties</p>
                <Link href="/matrices" className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse All Systems →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 rounded-lg p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to Benchmark Your Eigensolver?</h2>
        <p className="text-lg text-gray-600 mb-6">Access our collection of scientific matrices to evaluate and improve your numerical linear algebra implementations</p>
        <Link href="/matrices" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
          Browse Matrices
        </Link>
      </div>
    </main>
  );
}

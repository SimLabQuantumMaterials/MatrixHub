'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#003D66] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Matrix Hub</h2>
            <p className="text-gray-200">
              A collection of scientific matrices for research and benchmarking
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/matrices" className="text-gray-200 hover:text-white">
                  Matrices
                </Link>
              </li>
              <li>
                <Link href="/io" className="text-gray-200 hover:text-white">
                  I/O Formats
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-gray-200">
              This database provides access to a collection of matrices from various scientific applications,
              including quantum chemistry, materials science, and computational physics.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Citation</h2>
            <p className="text-gray-200 text-sm">
              If you use matrices from this database in your research, please cite:
            </p>
            <div className="mt-2 text-gray-200 text-sm">
              <p>Matrix Hub (2024)</p>
              <p className="mt-1">
                <a 
                  href="https://doi.org/10.5281/zenodo.1234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  DOI: 10.5281/zenodo.1234567
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-500">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Matrix Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
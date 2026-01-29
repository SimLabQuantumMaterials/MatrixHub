'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIODropdownOpen, setIsIODropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/matrices', label: 'Matrices' },
    { href: '/contact', label: 'Contact' },
  ];

  const ioSubLinks = [
    { href: '/io?type=dense', label: 'Dense' },
    { href: '/io?type=sparse', label: 'Sparse' },
  ];

  return (
    <nav className="bg-[#003D66] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Matrix Hub</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive('/') 
                  ? 'bg-[#FFA500] text-white' 
                  : 'text-gray-200 hover:bg-[#FFA500] hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/matrices"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive('/matrices') 
                  ? 'bg-[#FFA500] text-white' 
                  : 'text-gray-200 hover:bg-[#FFA500] hover:text-white'
                }`}
              >
                Matrices
              </Link>
              
              {/* I/O Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsIODropdownOpen(true)}
                onMouseLeave={() => setIsIODropdownOpen(false)}
              >
                <Link 
                  href="/io"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive('/io') 
                    ? 'bg-[#FFA500] text-white' 
                    : 'text-gray-200 hover:bg-[#FFA500] hover:text-white'
                  }`}
                >
                  I/O
                </Link>
                
                {isIODropdownOpen && (
                  <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                    {ioSubLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFA500] hover:text-white transition-colors duration-150"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive('/contact') 
                  ? 'bg-[#FFA500] text-white' 
                  : 'text-gray-200 hover:bg-[#FFA500] hover:text-white'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                isActive('/') 
                ? 'bg-[#FFA500] text-white' 
                : 'text-gray-300 hover:bg-[#FFA500] hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/matrices"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                isActive('/matrices') 
                ? 'bg-[#FFA500] text-white' 
                : 'text-gray-300 hover:bg-[#FFA500] hover:text-white'
              }`}
            >
              Matrices
            </Link>
            <Link
              href="/io"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                isActive('/io') 
                ? 'bg-[#FFA500] text-white' 
                : 'text-gray-300 hover:bg-[#FFA500] hover:text-white'
              }`}
            >
              I/O
            </Link>
            <div className="pl-4 space-y-1">
              {ioSubLinks.map((subLink) => (
                <Link
                  key={subLink.href}
                  href={subLink.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#FFA500] hover:text-white transition-colors duration-150"
                >
                  {subLink.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                isActive('/contact') 
                ? 'bg-[#FFA500] text-white' 
                : 'text-gray-300 hover:bg-[#FFA500] hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 
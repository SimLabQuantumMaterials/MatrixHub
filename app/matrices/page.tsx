'use client';

import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { matrices } from '../data/matrices';

function MatricesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isUpdatingFromUrl = useRef(false);
  
  // Helper to build URL from state
  const buildUrlFromState = (state: {
    searchTerm: string;
    selectedType: string;
    selectedSystem: string;
    selectedSymmetryType: string;
    selectedSoftware: string;
    selectedDataType: string;
    minSize: string;
    maxSize: string;
    sortCriteria: string;
    sortOrder: string;
  }) => {
    const params = new URLSearchParams();
    if (state.searchTerm) params.set('search', state.searchTerm);
    if (state.selectedType) params.set('type', state.selectedType);
    if (state.selectedSystem) params.set('system', state.selectedSystem);
    if (state.selectedSymmetryType) params.set('symmetryType', state.selectedSymmetryType);
    if (state.selectedSoftware) params.set('software', state.selectedSoftware);
    if (state.selectedDataType) params.set('dataType', state.selectedDataType);
    if (state.minSize) params.set('minSize', state.minSize);
    if (state.maxSize) params.set('maxSize', state.maxSize);
    if (state.sortCriteria !== 'name') params.set('sortCriteria', state.sortCriteria);
    if (state.sortOrder !== 'asc') params.set('sortOrder', state.sortOrder);
    return params.toString() ? `/matrices?${params.toString()}` : '/matrices';
  };

  // Initialize state from URL params
  const getStateFromUrl = () => {
    // `searchParams` is a ReadonlyURLSearchParams; use it directly
    return {
      searchTerm: searchParams.get('search') || '',
      selectedType: searchParams.get('type') || '',
      selectedSystem: searchParams.get('system') || '',
      selectedSymmetryType: searchParams.get('symmetryType') || '',
      selectedSoftware: searchParams.get('software') || '',
      selectedDataType: searchParams.get('dataType') || '',
      minSize: searchParams.get('minSize') || '',
      maxSize: searchParams.get('maxSize') || '',
      sortCriteria: searchParams.get('sortCriteria') || 'name',
      sortOrder: searchParams.get('sortOrder') || 'asc',
    };
  };

  const urlState = getStateFromUrl();
  const [searchTerm, setSearchTerm] = useState(urlState.searchTerm);
  const [selectedType, setSelectedType] = useState(urlState.selectedType);
  const [selectedSystem, setSelectedSystem] = useState(urlState.selectedSystem);
  const [selectedSymmetryType, setSelectedSymmetryType] = useState(urlState.selectedSymmetryType);
  const [selectedSoftware, setSelectedSoftware] = useState(urlState.selectedSoftware);
  const [selectedDataType, setSelectedDataType] = useState(urlState.selectedDataType);
  const [minSize, setMinSize] = useState(urlState.minSize);
  const [maxSize, setMaxSize] = useState(urlState.maxSize);
  const [sortCriteria, setSortCriteria] = useState(urlState.sortCriteria);
  const [sortOrder, setSortOrder] = useState(urlState.sortOrder);

  // Sync state from URL when URL changes (e.g., browser back button)
  useEffect(() => {
    const newUrlState = getStateFromUrl();
    
    // Always update state from URL (URL is source of truth)
    // The isUpdatingFromUrl flag prevents the URL update effect from running
    isUpdatingFromUrl.current = true;
    setSearchTerm(newUrlState.searchTerm);
    setSelectedType(newUrlState.selectedType);
    setSelectedSystem(newUrlState.selectedSystem);
    setSelectedSymmetryType(newUrlState.selectedSymmetryType);
    setSelectedSoftware(newUrlState.selectedSoftware);
    setSelectedDataType(newUrlState.selectedDataType);
    setMinSize(newUrlState.minSize);
    setMaxSize(newUrlState.maxSize);
    setSortCriteria(newUrlState.sortCriteria);
    setSortOrder(newUrlState.sortOrder);
    
    // Reset flag after state updates complete
    const timeoutId = setTimeout(() => { isUpdatingFromUrl.current = false; }, 0);
    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  // Update URL params when filters change (but not when updating from URL)
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;
    
    const currentState = {
      searchTerm,
      selectedType,
      selectedSystem,
      selectedSymmetryType,
      selectedSoftware,
      selectedDataType,
      minSize,
      maxSize,
      sortCriteria,
      sortOrder,
    };

    const newUrl = buildUrlFromState(currentState);
    router.replace(newUrl, { scroll: false });
  }, [searchTerm, selectedType, selectedSystem, selectedSymmetryType, selectedSoftware, selectedDataType, minSize, maxSize, sortCriteria, sortOrder, router]);

  const scrollToFootnotes = () => {
    const footnotesElement = document.getElementById('footnotes');
    if (footnotesElement) {
      footnotesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTypeWithFootnotes = (type: string) => {
    const parts = type.split(', ');
    return (
      <>
        {parts.map((part, index) => (
          <span key={part}>
            {part}
            {part === 'DFT' && (
              <sup>
                <button
                  onClick={scrollToFootnotes}
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                  aria-label="View footnote for DFT"
                >
                  1
                </button>
              </sup>
            )}
            {part === 'FLAPW' && (
              <sup>
                <button
                  onClick={scrollToFootnotes}
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                  aria-label="View footnote for FLAPW"
                >
                  2
                </button>
              </sup>
            )}
            {part === 'BSE' && (
              <sup>
                <button
                  onClick={scrollToFootnotes}
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                  aria-label="View footnote for BSE"
                >
                  3
                </button>
              </sup>
            )}
            {part === 'NAOs' && (
              <sup>
                <button
                  onClick={scrollToFootnotes}
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                  aria-label="View footnote for NAOs"
                >
                  4
                </button>
              </sup>
            )}
            {index < parts.length - 1 && ', '}
          </span>
        ))}
      </>
    );
  };

  const uniqueTypes = useMemo(() => Array.from(new Set(matrices.map(m => m.type))), []);
  const uniqueSystems = useMemo(() => Array.from(new Set(matrices.map(m => m.system))), []);
  const uniqueSymmetryTypes = useMemo(() => Array.from(new Set(matrices.map(m => m.symmetryType))), []);
  const uniqueSoftware = useMemo(() => Array.from(new Set(matrices.map(m => m.software))), []);
  const uniqueDataTypes = useMemo(() => Array.from(new Set(matrices.map(m => m.dataType))), []);

  const filteredMatrices = useMemo(() => {
    return matrices
      .filter(matrix => {
        const matchesSearch = matrix.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            matrix.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !selectedType || matrix.type.includes(selectedType);
        const matchesSystem = !selectedSystem || matrix.system === selectedSystem;
        const matchesSymmetryType = !selectedSymmetryType || matrix.symmetryType === selectedSymmetryType;
        const matchesSoftware = !selectedSoftware || matrix.software === selectedSoftware;
        const matchesDataType = !selectedDataType || matrix.dataType === selectedDataType;
        const matchesMinSize = !minSize || matrix.n >= parseInt(minSize);
        const matchesMaxSize = !maxSize || matrix.n <= parseInt(maxSize);
        return matchesSearch && matchesType && matchesSystem && matchesSoftware && 
               matchesDataType && matchesSymmetryType && matchesMinSize && matchesMaxSize;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortCriteria) {
          case 'size':
            comparison = a.n - b.n;
            break;
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'type':
            comparison = a.type.localeCompare(b.type);
            break;
          case 'system':
            comparison = a.system.localeCompare(b.system);
            break;
          case 'symmetryType':
            comparison = a.symmetryType.localeCompare(b.symmetryType);
            break;
          case 'software':
            comparison = a.software.localeCompare(b.software);
            break;
          default:
            comparison = 0;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [searchTerm, selectedType, selectedSystem, selectedSymmetryType, selectedSoftware, selectedDataType, minSize, maxSize, sortCriteria, sortOrder]);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[90%] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Matrix Hub</h1>
          <p className="text-lg sm:text-xl text-gray-600">Browse and download scientific matrices for benchmarking and numerical development of NLA libraries and solvers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search by name or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Matrix Type</label>
              <select
                id="type"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="system" className="block text-sm font-medium text-gray-700 mb-1">System</label>
              <select
                id="system"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
              >
                <option value="">All Systems</option>
                {uniqueSystems.map(system => (
                  <option key={system} value={system}>{system}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="symmetryType" className="block text-sm font-medium text-gray-700 mb-1">Symmetry Type</label>
              <select
                id="symmetryType"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSymmetryType}
                onChange={(e) => setSelectedSymmetryType(e.target.value)}
              >
                <option value="">All Symmetry Types</option>
                {uniqueSymmetryTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="software" className="block text-sm font-medium text-gray-700 mb-1">Software</label>
              <select
                id="software"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSoftware}
                onChange={(e) => setSelectedSoftware(e.target.value)}
              >
                <option value="">All Software</option>
                {uniqueSoftware.map(software => (
                  <option key={software} value={software}>{software}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
              <select
                id="dataType"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedDataType}
                onChange={(e) => setSelectedDataType(e.target.value)}
              >
                <option value="">All Data Types</option>
                {uniqueDataTypes.map(dataType => (
                  <option key={dataType} value={dataType}>{dataType}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="minSize" className="block text-sm font-medium text-gray-700 mb-1">Min Size</label>
              <input
                type="number"
                id="minSize"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Min size"
                value={minSize}
                onChange={(e) => setMinSize(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="maxSize" className="block text-sm font-medium text-gray-700 mb-1">Max Size</label>
              <input
                type="number"
                id="maxSize"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Max size"
                value={maxSize}
                onChange={(e) => setMaxSize(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <div className="flex space-x-2">
                <select
                  id="sort"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                >
                  <option value="size">Size</option>
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                  <option value="system">System</option>
                  <option value="symmetryType">Symmetry Type</option>
                  <option value="software">Software</option>
                </select>
                <button
                  className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Matrices Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-[20%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="w-[8%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="w-[10%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Software
                  </th>
                  <th scope="col" className="w-[10%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Type
                  </th>
                  <th scope="col" className="w-[8%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="w-[10%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    System
                  </th>
                  <th scope="col" className="w-[10%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symmetry Type
                  </th>
                  <th scope="col" className="w-[15%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Properties
                  </th>
                  <th scope="col" className="w-[8%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    nev
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMatrices.map((matrix) => (
                  <tr 
                    key={matrix.id} 
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/matrices/${matrix.id}`)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push(`/matrices/${matrix.id}`); } }}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <Link href={`/matrices/${matrix.id}`} className="block text-sm font-medium text-gray-900 hover:text-[#003D66]" onClick={(e) => e.stopPropagation()}>
                        {matrix.name}
                      </Link>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                        {renderTypeWithFootnotes(matrix.type)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
                        {matrix.software}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500">
                      {matrix.dataType}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 whitespace-nowrap">
                      {matrix.size}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500">
                      {matrix.system}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500">
                      {matrix.symmetryType}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-wrap gap-1">
                        {matrix.properties.map((prop, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full whitespace-nowrap"
                          >
                            {prop}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 whitespace-nowrap">
                      {matrix.nev}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredMatrices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No matrices found matching your criteria.</p>
          </div>
        )}

        {/* Footnotes */}
        <div id="footnotes" className="mt-8 text-sm text-gray-600">
          <p className="mb-2"><strong>Notes:</strong></p>
          <ul className="list-decimal pl-5 space-y-1">
            <li>DFT: Density Functional Theory (e.g. eigenvalue problems)</li>
            <li>FLAPW: Full-potential linearized augmented-plane-wave method</li>
            <li>BSE: Bethe-Salpeter Equation (e.g. eigenvalue problems)</li>
            <li>NAOs: Numerically tabulated atom-centered orbitals</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default function MatricesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-[90%] mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center text-gray-500">Loading matrices...</div>
          </div>
        </main>
      }
    >
      <MatricesPageContent />
    </Suspense>
  );
}
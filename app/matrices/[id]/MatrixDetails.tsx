'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Matrix } from '../../data/matrices';

interface MatrixDetailsProps {
  matrix: Matrix;
}

export default function MatrixDetails({ matrix }: MatrixDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

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
            {index < parts.length - 1 && ', '}
          </span>
        ))}
      </>
    );
  };

  const binaryWgetCommand = `wget ${matrix.downloadUrl}`;
  const metadataWgetCommand = matrix.metadataUrl ? `wget ${matrix.metadataUrl}` : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">{matrix.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{matrix.description}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Size</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.size}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.type}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">System</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.system}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Symmetry Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.symmetryType}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Software</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.software}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Data Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.dataType}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Format</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.format}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Number of Eigenvalues (nev)</dt>
                <dd className="mt-1 text-sm text-gray-900">{matrix.nev}</dd>
              </div>
              {matrix.nex && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Number of Excitons (Nex)</dt>
                  <dd className="mt-1 text-sm text-gray-900">{matrix.nex}</dd>
                </div>
              )}
              {matrix.numCorrelatedSystems && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Number of Correlated Systems</dt>
                  <dd className="mt-1 text-sm text-gray-900">{matrix.numCorrelatedSystems}</dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Properties</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-2">
                    {matrix.properties.map((prop, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Download Instructions</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {matrix.metadataUrl 
                    ? 'The matrix data and metadata are available on the server. Use the following wget commands to download:'
                    : 'The matrix data is available on the server. Use the following wget command to download:'}
                </p>
              </div>
              
              {/* Binary File Download */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Binary File (.bin)</h4>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <a
                      href={matrix.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#003D66] hover:bg-[#002D4D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003D66]"
                    >
                      Download binary
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-gray-800 font-mono break-all">{binaryWgetCommand}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(binaryWgetCommand);
                        setCopiedCommand('binary');
                        setTimeout(() => setCopiedCommand(null), 2000);
                      }}
                      className="ml-4 flex-shrink-0 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {copiedCommand === 'binary' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata JSON File Download */}
              {matrix.metadataUrl && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Metadata File (metadata.json)</h4>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-gray-800 font-mono break-all">{metadataWgetCommand}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(metadataWgetCommand || '');
                          setCopiedCommand('metadata');
                          setTimeout(() => setCopiedCommand(null), 2000);
                        }}
                        className="ml-4 flex-shrink-0 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {copiedCommand === 'metadata' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sequence Files Information */}
              {matrix.numCorrelatedSystems && matrix.numCorrelatedSystems > 1 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sequence Files ({matrix.numCorrelatedSystems} files)</h4>
                  <div className="bg-blue-50 rounded-md p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      This matrix contains a sequence of {matrix.numCorrelatedSystems} correlated systems. 
                      You can download all files in the sequence by replacing <code className="font-mono bg-white px-1 py-0.5 rounded">id_1</code> with <code className="font-mono bg-white px-1 py-0.5 rounded">id_2</code> through <code className="font-mono bg-white px-1 py-0.5 rounded">id_{matrix.numCorrelatedSystems}</code> in the URL.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Example for downloading all files:
                    </p>
                    <div className="mt-2 bg-white rounded p-3">
                      <code className="text-xs text-gray-800 font-mono">
                        {(() => {
                          const baseUrl = matrix.downloadUrl.replace(/id_\d+\.bin$/, '');
                          return `for i in {1..${matrix.numCorrelatedSystems}}; do wget ${baseUrl}id_$i.bin; done`;
                        })()}
                      </code>
                      <button
                        onClick={() => {
                          const baseUrl = matrix.downloadUrl.replace(/id_\d+\.bin$/, '');
                          const command = `for i in {1..${matrix.numCorrelatedSystems}}; do wget ${baseUrl}id_$i.bin; done`;
                          navigator.clipboard.writeText(command);
                          setCopiedCommand('sequence');
                          setTimeout(() => setCopiedCommand(null), 2000);
                        }}
                        className="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {copiedCommand === 'sequence' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-500">
                <p>Note: You need to have wget installed on your system to use {matrix.metadataUrl ? 'these commands' : 'this command'}.</p>
                <p>If you don't have wget, you can install it using:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>On Ubuntu/Debian: <code className="font-mono">sudo apt-get install wget</code></li>
                  <li>On CentOS/RHEL: <code className="font-mono">sudo yum install wget</code></li>
                  <li>On macOS: <code className="font-mono">brew install wget</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
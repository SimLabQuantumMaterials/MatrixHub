'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, Suspense } from 'react';

function IOPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('type') || 'dense';

  const setActiveTab = (tab: string) => {
    router.push(`/io?type=${tab}`, { scroll: false });
  };

  const denseContent = useMemo(() => (
    <>
      {/* Dense Matrix I/O */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Dense Matrix I/O</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Dense matrices are stored in binary format with column-major ordering. The data is stored continuously
              in memory, making it efficient for numerical computations.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Format Specification</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                  <li>Binary format (no text/ASCII)</li>
                  <li>Column-major ordering (Fortran-style)</li>
                  <li>Continuous memory layout</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Memory Layout</h3>
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`For a 3x3 matrix:
[a11 a21 a31 a12 a22 a32 a13 a23 a33]

Memory layout (column-major):
[a11] -> [a21] -> [a31] -> [a12] -> [a22] -> [a32] -> [a13] -> [a23] -> [a33]`}
                </pre>
              </div>
            </div>
          </div>

          {/* Programming Language Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Programming Language Examples</h2>
            
            {/* Python */}
            <details className="mb-4">
              <summary className="text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#003D66] dark:hover:text-[#5b9bd5]">
                Python
              </summary>
              <div className="mt-4 pl-4">
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`import numpy as np

def read_binary_matrix(filename, n, dtype=np.float64):
    """
    Read a binary matrix file in column-major format.
    
    Args:
        filename: Path to the binary file
        n: Matrix dimension (n x n)
        dtype: Data type (default: double precision)
    
    Returns:
        numpy.ndarray: The matrix in column-major format
    """
    with open(filename, 'rb') as f:
        # Read the binary data
        matrix = np.fromfile(f, dtype=dtype)
        # Reshape to n x n, maintaining column-major order
        return matrix.reshape(n, n, order='F')

# Example usage
matrix = read_binary_matrix('matrix.bin', n=1000)`}
                </pre>
              </div>
            </details>

            {/* C/C++ */}
            <details className="mb-4">
              <summary className="text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#003D66] dark:hover:text-[#5b9bd5]">
                C/C++
              </summary>
              <div className="mt-4 pl-4">
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`#include <iostream>
#include <fstream>
#include <vector>

std::vector<double> read_binary_matrix(const std::string& filename, int n) {
    std::vector<double> matrix(n * n);
    std::ifstream file(filename, std::ios::binary);
    
    if (!file) {
        throw std::runtime_error("Failed to open file: " + filename);
    }
    
    // Read the entire matrix (column-major order is preserved)
    file.read(reinterpret_cast<char*>(matrix.data()), n * n * sizeof(double));
    
    if (!file) {
        throw std::runtime_error("Failed to read matrix data");
    }
    
    return matrix;
}

// Example usage
int main() {
    try {
        int n = 1000;
        auto matrix = read_binary_matrix("matrix.bin", n);
        
        // Access element (i,j) in column-major format
        auto get_element = [&matrix, n](int i, int j) {
            return matrix[j * n + i];  // Column-major indexing
        };
        
        // Example: access element at (5,3)
        double value = get_element(5, 3);
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    return 0;
}`}
                </pre>
              </div>
            </details>

            {/* Fortran */}
            <details className="mb-4">
              <summary className="text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#003D66] dark:hover:text-[#5b9bd5]">
                Fortran
              </summary>
              <div className="mt-4 pl-4">
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`program read_matrix
    implicit none
    integer :: n, i, j
    real(8), allocatable :: matrix(:,:)
    character(len=100) :: filename
    
    ! Set matrix size and filename
    n = 1000
    filename = 'matrix.bin'
    
    ! Allocate matrix (Fortran is column-major by default)
    allocate(matrix(n,n))
    
    ! Open and read binary file
    open(unit=10, file=filename, form='unformatted', access='stream', status='old')
    read(10) matrix
    close(10)
    
    ! Example: access element at (5,3)
    print *, matrix(5,3)
    
    deallocate(matrix)
end program read_matrix`}
                </pre>
              </div>
            </details>

            {/* Julia */}
            <details className="mb-4">
              <summary className="text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#003D66] dark:hover:text-[#5b9bd5]">
                Julia
              </summary>
              <div className="mt-4 pl-4">
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`function read_binary_matrix(filename::String, n::Int)
    # Open and read binary file
    open(filename, "r") do io
        # Read the binary data
        matrix = Array{Float64}(undef, n, n)
        read!(io, matrix)
        return matrix  # Julia is column-major by default
    end
end

# Example usage
matrix = read_binary_matrix("matrix.bin", 1000)

# Access element (i,j)
value = matrix[5, 3]  # 1-based indexing in Julia`}
                </pre>
              </div>
            </details>
          </div>

          {/* Distributed Reading */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Distributed Reading</h2>
            
            {/* MPI C/C++ */}
            <details className="mb-4">
              <summary className="text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#003D66] dark:hover:text-[#5b9bd5]">
                MPI C/C++
              </summary>
              <div className="mt-4 pl-4">
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`#include <mpi.h>
#include <vector>
#include <stdexcept>

void read_distributed_matrix(const std::string& filename, int n, int block_size) {
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Calculate local matrix size
    int local_rows = (n + size - 1) / size;
    std::vector<double> local_matrix(local_rows * n);

    // Open file
    MPI_File fh;
    if (MPI_File_open(MPI_COMM_WORLD, filename.c_str(), 
                     MPI_MODE_RDONLY, MPI_INFO_NULL, &fh) != MPI_SUCCESS) {
        throw std::runtime_error("Failed to open file");
    }

    // Set view for column-major reading
    MPI_Offset offset = rank * local_rows * sizeof(double);
    if (MPI_File_set_view(fh, offset, MPI_DOUBLE, 
                         MPI_DOUBLE, "native", MPI_INFO_NULL) != MPI_SUCCESS) {
        MPI_File_close(&fh);
        throw std::runtime_error("Failed to set file view");
    }

    // Read columns in parallel
    for (int j = 0; j < n; j++) {
        MPI_Offset col_offset = j * n * sizeof(double);
        if (MPI_File_read_at(fh, col_offset,
                            &local_matrix[j * local_rows],
                            local_rows, MPI_DOUBLE, MPI_STATUS_IGNORE) != MPI_SUCCESS) {
            MPI_File_close(&fh);
            throw std::runtime_error("Failed to read matrix data");
        }
    }

    MPI_File_close(&fh);
}

// Example usage
int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);
    
    try {
        int n = 1000;
        int block_size = 64;
        read_distributed_matrix("matrix.bin", n, block_size);
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        MPI_Abort(MPI_COMM_WORLD, 1);
    }
    
    MPI_Finalize();
    return 0;
}`}
                </pre>
              </div>
            </details>

            {/* MPI Fortran */}
            <details className="mb-4">
              <summary className="text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#003D66] dark:hover:text-[#5b9bd5]">
                MPI Fortran
              </summary>
              <div className="mt-4 pl-4">
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {`program read_distributed_matrix
    use mpi
    implicit none
    integer :: n, block_size, rank, size, ierr
    integer :: local_rows
    real(8), allocatable :: local_matrix(:,:)
    character(len=100) :: filename
    
    ! Initialize MPI
    call MPI_Init(ierr)
    call MPI_Comm_rank(MPI_COMM_WORLD, rank, ierr)
    call MPI_Comm_size(MPI_COMM_WORLD, size, ierr)
    
    ! Set parameters
    n = 1000
    block_size = 64
    filename = 'matrix.bin'
    
    ! Calculate local size
    local_rows = (n + size - 1) / size
    allocate(local_matrix(local_rows, n))
    
    ! Open file
    call MPI_File_open(MPI_COMM_WORLD, filename, &
                      MPI_MODE_RDONLY, MPI_INFO_NULL, fh, ierr)
    
    ! Set view for column-major reading
    offset = rank * local_rows * 8  ! 8 bytes for double precision
    call MPI_File_set_view(fh, offset, MPI_DOUBLE_PRECISION, &
                          MPI_DOUBLE_PRECISION, "native", MPI_INFO_NULL, ierr)
    
    ! Read columns in parallel
    do j = 1, n
        col_offset = (j-1) * n * 8
        call MPI_File_read_at(fh, col_offset, &
                            local_matrix(1,j), local_rows, &
                            MPI_DOUBLE_PRECISION, MPI_STATUS_IGNORE, ierr)
    end do
    
    ! Close file
    call MPI_File_close(fh, ierr)
    
    deallocate(local_matrix)
    call MPI_Finalize(ierr)
end program read_distributed_matrix`}
                </pre>
              </div>
            </details>
          </div>
    </>
  ), []);

  const sparseContent = useMemo(() => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sparse Matrix I/O</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Sparse matrix I/O formats and specifications will be documented here. This section is currently under development.
      </p>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <p className="text-gray-500 dark:text-gray-400 italic">
          Sparse matrix I/O documentation coming soon. This will include formats such as CSR (Compressed Sparse Row), 
          CSC (Compressed Sparse Column), COO (Coordinate), and other common sparse matrix storage formats.
        </p>
      </div>
    </div>
  ), []);

  return (
    <main className="min-h-screen">
      {/* Hero - match front page */}
      <div className="relative bg-[#003D66] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003D66] to-[#002D4D] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Matrix I/O Formats</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Dense and sparse matrix formats, specifications, and code examples
            </p>
          </div>
        </div>
      </div>

      {/* Content - match front page sections */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-600">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dense')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  activeTab === 'dense'
                    ? 'border-[#003D66] text-[#003D66] dark:text-[#5b9bd5] dark:border-[#5b9bd5]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                Dense Matrix I/O
              </button>
              <button
                onClick={() => setActiveTab('sparse')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  activeTab === 'sparse'
                    ? 'border-[#003D66] text-[#003D66] dark:text-[#5b9bd5] dark:border-[#5b9bd5]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                Sparse Matrix I/O
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 gap-8">
            {activeTab === 'dense' ? denseContent : sparseContent}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function IOPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-500 dark:text-gray-400">Loading I/O formats...</div>
          </div>
        </main>
      }
    >
      <IOPageContent />
    </Suspense>
  );
} 
import { matrices } from '../../data/matrices';
import MatrixDetails from './MatrixDetails';

// This function generates the static paths for all matrix detail pages
export function generateStaticParams() {
  return matrices.map((matrix) => ({
    id: matrix.id,
  }));
}

export default function MatrixPage({ params }: { params: { id: string } }) {
  const matrix = matrices.find((m) => m.id === params.id);

  if (!matrix) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#003D66]">Matrix Not Found</h1>
            <p className="mt-2 text-gray-600">The requested matrix could not be found.</p>
          </div>
        </div>
      </main>
    );
  }

  return <MatrixDetails matrix={matrix} />;
} 
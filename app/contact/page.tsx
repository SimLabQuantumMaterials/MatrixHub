'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero - match front page */}
      <div className="relative bg-[#003D66] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003D66] to-[#002D4D] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Get in touch with the Matrix Hub team
            </p>
          </div>
        </div>
      </div>

      {/* Content - match front page sections */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email</h3>
                  <a 
                    href="mailto:chase@fz-juelich.de" 
                    className="text-[#003D66] dark:text-[#5b9bd5] hover:text-[#002D4D] dark:hover:text-[#7ab3e8]"
                  >
                    chase[at]fz-juelich.de
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Forschungszentrum Jülich GmbH<br />
                    Wilhelm-Johnen-Straße<br />
                    52428 Jülich<br />
                    Germany
                  </p>
                </div>
              </div>
            </div>

            {/* Submit a Matrix */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Submit a Matrix</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have a matrix that you would like to contribute to our database,
                please email us directly. Include the following information:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Matrix name and description</li>
                <li>Source and application</li>
                <li>Matrix properties and format</li>
                <li>DOI or reference if available</li>
                <li>Any additional metadata</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
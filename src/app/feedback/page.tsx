"use client";
import React, { useState } from 'react';
import Nav from '../../components/Nav';

export default function FeedbackPage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Share Your Feedback
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help us improve the RICA demonstration plot platform. Your feedback is valuable 
              for enhancing our agricultural research and educational resources.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600">
              <h2 className="text-2xl font-semibold text-white text-center">
                RICA Feedback Form
              </h2>
            </div>
            
            <div className="p-6">
              {/* Google Form iframe with loading spinner */}
              <div className="relative w-full" style={{ minHeight: '600px' }}>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading feedback form...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSemfUZLf5l4aiRxglGu59YSPbiQjvC4yaJT49LMrO8oyZcqHw/viewform?embedded=true&hl=en"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  className="rounded-lg shadow-md"
                  title="RICA Feedback Form"
                  onLoad={() => setLoading(false)}
                  style={{ display: loading ? 'none' : 'block' }}
                />
              </div>

              {/* Fallback content if iframe doesn't load */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Having trouble with the form?
                </h3>
                <p className="text-blue-700 text-sm">
                  If the form above doesn't load, you can contact us directly at{' '}
                  <a href="mailto:feedback@rica.rw" className="underline hover:text-blue-900">
                    feedback@rica.rw
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {/* ... info cards ... */}
          </div>
        </div>
      </main>
    </>
  );
}
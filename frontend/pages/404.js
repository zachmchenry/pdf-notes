// frontend/pages/404.js
import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-lg">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Page Not Found</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/app" className="px-6 py-3 bg-blue-500 text-white rounded-lg inline-block hover:bg-blue-600">
          Return to App
        </Link>
      </div>
    </div>
  );
}

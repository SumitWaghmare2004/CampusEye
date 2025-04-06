import React from 'react';
import { AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

const warnings = [
  {
    id: 1,
    date: '2025-02-24',
    type: 'mild',
    description: 'Late arrival to morning class',
    status: 'active',
    issuedBy: 'Dr.N.K Chaudhary',
  },
  {
    id: 2,
    date: '2025-02-22',
    type: 'moderate',
    description: 'Unauthorized device usage during lecture',
    status: 'resolved',
    issuedBy: 'Dr.M S Chaudhary',
  },
  {
    id: 3,
    date: '2025-01-30',
    type: 'severe',
    description: 'Disruptive behavior in laboratory',
    status: 'active',
    issuedBy: 'Kiran Ande',
  },
];

export const Warnings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Disciplinary Warnings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            A complete list of all warnings issued
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {warnings.map((warning) => (
            <div key={warning.id} className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {warning.type === 'mild' ? (
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  ) : warning.type === 'moderate' ? (
                    <AlertCircle className="h-6 w-6 text-orange-500" />
                  ) : (
                    <AlertOctagon className="h-6 w-6 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {warning.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Issued by {warning.issuedBy} on{' '}
                      {new Date(warning.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      warning.status === 'active'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {warning.status.charAt(0).toUpperCase() + warning.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        warning.type === 'mild'
                          ? 'bg-yellow-100 text-yellow-800'
                          : warning.type === 'moderate'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {warning.type.charAt(0).toUpperCase() + warning.type.slice(1)}
                    </span>
                  </div>
                  {warning.status === 'active' && (
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Request Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
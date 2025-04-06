import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Class A', attendance: 95, warnings: 2, score: 88 },
  { name: 'Class B', attendance: 92, warnings: 4, score: 85 },
  { name: 'Class C', attendance: 88, warnings: 6, score: 82 },
  { name: 'Class D', attendance: 90, warnings: 3, score: 86 },
];

export const FacultyDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  120
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  Total Students
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  91%
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  Average Attendance
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  Good
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
                  15
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  Active Warnings
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  Moderate
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  5
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  High Risk Students
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  Monitor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Class Performance Overview
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#4f46e5" name="Attendance %" />
              <Bar dataKey="warnings" fill="#eab308" name="Warnings" />
              <Bar dataKey="score" fill="#22c55e" name="Avg. Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Incidents
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                student: 'Sumit Krishna Waghmare',
                class: 'Class A',
                incident: 'Late Arrival',
                severity: 'Moderate',
                date: '2024-03-07',
              },
              {
                id: 2,
                student: 'Bhavna Anandrao Mahure',
                class: 'Class B',
                incident: 'Late arrival',
                severity: 'Minor',
                date: '2024-03-07',
              },
              {
                id: 3,
                student: 'Sanskruti Kawale',
                class: 'Class C',
                incident: 'Unauthorized device usage',
                severity: 'Minor',
                date: '2024-03-06',
              },
            ].map((incident) => (
              <li key={incident.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      {incident.student}
                    </p>
                    <p className="text-sm text-gray-500">{incident.incident}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {incident.severity}
                    </span>
                    <span className="text-sm text-gray-500">{incident.class}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
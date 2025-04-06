import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format } from 'date-fns';

const data = [
  { date: '2024-03-01', score: 85 },
  { date: '2024-03-02', score: 82 },
  { date: '2024-03-03', score: 88 },
  { date: '2024-03-04', score: 85 },
  { date: '2024-03-05', score: 90 },
  { date: '2024-03-06', score: 92 },
  { date: '2024-03-07', score: 88 },
];

const attendanceData = [
  { name: 'Present', value: 85 },
  { name: 'Late', value: 10 },
  { name: 'Absent', value: 5 },
];

const behaviorData = [
  { name: 'Excellent', value: 60 },
  { name: 'Good', value: 25 },
  { name: 'Needs Improvement', value: 15 },
];

const COLORS = ['#4f46e5', '#eab308', '#ef4444'];

export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  85
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  Current Discipline Score
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
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  95%
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  Attendance Rate
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  Excellent
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
                  2
                </div>
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">
                  Active Warnings
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  Minor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Attendance Distribution
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Behavior Analysis
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={behaviorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {behaviorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Discipline Score Trend
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
              />
              <YAxis domain={[60, 100]} />
              <Tooltip
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                type: 'warning',
                description: 'Late arrival to morning class',
                date: '2024-03-07',
              },
              {
                id: 2,
                type: 'attendance',
                description: 'Perfect attendance this week',
                date: '2024-03-06',
              },
              {
                id: 3,
                type: 'behavior',
                description: 'Positive behavior recognition',
                date: '2024-03-05',
              },
            ].map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {activity.description}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {format(new Date(activity.date), 'MMM d, yyyy')}
                    </p>
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
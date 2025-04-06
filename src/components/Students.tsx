

// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Send } from 'lucide-react';
// import { supabase } from '../lib/supabase';
// import { sendReportSMS } from '../lib/reports';
// import Swal from 'sweetalert2';

// interface Student {
//   id: string;
//   name: string;
//   disciplineScore: number;
//   attendance: number;
//   warnings: number;
//   status: string;
//   parentContact: string;
// }

// export const Students: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('students')
//         .select('*');

//       if (error) throw error;

//       // Transform the data
//       const transformedStudents = data.map(student => ({
//         id: student.id,
//         name: student.name,
//         disciplineScore: student.discipline_score || 85,
//         attendance: 95, // You would calculate this from attendance records
//         warnings: 2, // You would get this from warnings table
//         status: getStatus(student.discipline_score || 85),
//         parentContact: student.parent_contact,
//       }));

//       setStudents(transformedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load students',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatus = (score: number): string => {
//     if (score >= 90) return 'Excellent';
//     if (score >= 80) return 'Good';
//     return 'At Risk';
//   };

//   const handleSendReport = async (student: Student) => {
//     try {
//       const currentDate = new Date();
//       const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
//       const year = currentDate.getFullYear().toString();

//       await sendReportSMS(
//         student.id,
//         month,
//         year,
//         student.parentContact
//       );

//       Swal.fire({
//         icon: 'success',
//         title: 'Report Sent',
//         text: `Monthly report has been sent to ${student.name}'s parent`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error('Error sending report:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to send report. Please try again.',
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div className="relative flex-1 max-w-lg">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//                 placeholder="Search students..."
//               />
//             </div>
//             <div className="mt-3 sm:mt-0 sm:ml-4">
//               <button
//                 type="button"
//                 className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <Filter className="h-5 w-5 mr-2 text-gray-400" />
//                 Filter
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col">
//           <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//               <div className="overflow-hidden border-t border-gray-200">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Student
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Discipline Score
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Attendance
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Warnings
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Status
//                       </th>
//                       <th scope="col" className="relative px-6 py-3">
//                         <span className="sr-only">Actions</span>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {students.map((student) => (
//                       <tr key={student.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {student.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {student.id}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {student.disciplineScore}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {student.attendance}%
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {student.warnings}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               student.status === 'Excellent'
//                                 ? 'bg-green-100 text-green-800'
//                                 : student.status === 'Good'
//                                 ? 'bg-blue-100 text-blue-800'
//                                 : 'bg-red-100 text-red-800'
//                             }`}
//                           >
//                             {student.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleSendReport(student)}
//                             className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
//                           >
//                             <Send className="h-4 w-4 mr-1" />
//                             Send Report
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };












import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4f46e5', '#eab308', '#ef4444'];

const students = [
  {
    id: '146',
    name: 'Sumit Waghmare',
    disciplineScore: 85,
    attendance: 95,
    warnings: 2,
    status: 'Good',
    attendanceData: [
      { name: 'Present', value: 95 },
      { name: 'Late', value: 3 },
      { name: 'Absent', value: 2 },
    ],
    behaviorData: [
      { name: 'Excellent', value: 65 },
      { name: 'Good', value: 25 },
      { name: 'Needs Improvement', value: 10 },
    ],
  },

  {
    id: '112',
    name: 'Bhavna Mahure',
    disciplineScore: 92,
    attendance: 98,
    warnings: 0,
    status: 'Excellent',
    attendanceData: [
      { name: 'Present', value: 98 },
      { name: 'Late', value: 2 },
      { name: 'Absent', value: 0 },
    ],
    behaviorData: [
      { name: 'Excellent', value: 85 },
      { name: 'Good', value: 15 },
      { name: 'Needs Improvement', value: 0 },
    ],
  },

  {
    id: '114',
    name: 'Saniya Pawankar',
    disciplineScore: 75,
    attendance: 85,
    warnings: 4,
    status: 'At Risk',
    attendanceData: [
      { name: 'Present', value: 85 },
      { name: 'Late', value: 5 },
      { name: 'Absent', value: 10 },
    ],
    behaviorData: [
      { name: 'Excellent', value: 40 },
      { name: 'Good', value: 35 },
      { name: 'Needs Improvement', value: 25 },
    ],
  },

  {
    id: '104',
    name: 'Sanskruti Kawale',
    disciplineScore: 75,
    attendance: 85,
    warnings: 4,
    status: 'Good',
    attendanceData: [
      { name: 'Present', value: 85 },
      { name: 'Late', value: 5 },
      { name: 'Absent', value: 10 },
    ],
    behaviorData: [
      { name: 'Excellent', value: 40 },
      { name: 'Good', value: 35 },
      { name: 'Needs Improvement', value: 25 },
    ],
  },

  {
    id: '144',
    name: 'Shashank Bhanarkar',
    disciplineScore: 75,
    attendance: 85,
    warnings: 4,
    status: 'At Risk',
    attendanceData: [
      { name: 'Present', value: 85 },
      { name: 'Late', value: 5 },
      { name: 'Absent', value: 10 },
    ],
    behaviorData: [
      { name: 'Excellent', value: 40 },
      { name: 'Good', value: 35 },
      { name: 'Needs Improvement', value: 25 },
    ],
  },
];

export const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (student: typeof students[0]) => {
    setSelectedStudent(student);
  };

  const closeDetails = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-400" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Student
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Discipline Score
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Attendance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Warnings
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.disciplineScore}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.attendance}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.warnings}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.status === 'Excellent'
                                ? 'bg-green-100 text-green-800'
                                : student.status === 'Good'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleViewDetails(student)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Student Details: {selectedStudent.name}
              </h3>
              <button 
                onClick={closeDetails}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="text-base font-medium text-gray-900 mb-4">
                    Student Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">ID:</span> {selectedStudent.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Discipline Score:</span> {selectedStudent.disciplineScore}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Attendance:</span> {selectedStudent.attendance}%
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Warnings:</span> {selectedStudent.warnings}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span> 
                      <span
                        className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedStudent.status === 'Excellent'
                            ? 'bg-green-100 text-green-800'
                            : selectedStudent.status === 'Good'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedStudent.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg shadow p-4">
                    <h4 className="text-base font-medium text-gray-900 mb-2">
                      Attendance Distribution
                    </h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedStudent.attendanceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {selectedStudent.attendanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-4">
                    <h4 className="text-base font-medium text-gray-900 mb-2">
                      Behavior Analysis
                    </h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedStudent.behaviorData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {selectedStudent.behaviorData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeDetails}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
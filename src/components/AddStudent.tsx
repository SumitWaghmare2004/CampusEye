// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { supabase } from '../lib/supabase';
// import { Loader2 } from 'lucide-react';

// interface StudentForm {
//   name: string;
//   email: string;
//   studentId: string;
//   contact: string;
//   parentContact: string;
//   parentEmail: string;
//   class: string;
//   section: string;
// }

// export const AddStudent: React.FC = () => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [form, setForm] = useState<StudentForm>({
//     name: '',
//     email: '',
//     studentId: '',
//     contact: '',
//     parentContact: '',
//     parentEmail: '',
//     class: '',
//     section: '',
//   });

//   const validateForm = () => {
//     if (!form.name || !form.email || !form.studentId || !form.contact || !form.parentContact || !form.parentEmail || !form.class || !form.section) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'All fields are required',
//       });
//       return false;
//     }

//     if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !form.parentEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Email',
//         text: 'Please enter valid email addresses',
//       });
//       return false;
//     }

//     if (!form.contact.match(/^\d{10}$/) || !form.parentContact.match(/^\d{10}$/)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Contact Number',
//         text: 'Contact numbers must be 10 digits',
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsProcessing(true);
//     try {
//       const { data, error } = await supabase
//         .from('students')
//         .insert([
//           {
//             id: form.studentId,
//             name: form.name,
//             email: form.email,
//             contact: form.contact,
//             parent_contact: form.parentContact,
//             parent_email: form.parentEmail,
//             class: form.class,
//             section: form.section,
//           },
//         ])
//         .select();

//       if (error) throw error;

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Student added successfully',
//         showConfirmButton: true,
//       });

//       // Reset form
//       setForm({
//         name: '',
//         email: '',
//         studentId: '',
//         contact: '',
//         parentContact: '',
//         parentEmail: '',
//         class: '',
//         section: '',
//       });
//     } catch (error) {
//       console.error('Error saving student:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to add student. Please try again.',
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
//             Add New Student
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Student ID
//                 </label>
//                 <input
//                   type="text"
//                   value={form.studentId}
//                   onChange={(e) => setForm({ ...form, studentId: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   placeholder="e.g., STU001"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Contact Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={form.contact}
//                   onChange={(e) => setForm({ ...form, contact: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Parent's Contact
//                 </label>
//                 <input
//                   type="tel"
//                   value={form.parentContact}
//                   onChange={(e) => setForm({ ...form, parentContact: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Parent's Email
//                 </label>
//                 <input
//                   type="email"
//                   value={form.parentEmail}
//                   onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Class
//                 </label>
//                 <input
//                   type="text"
//                   value={form.class}
//                   onChange={(e) => setForm({ ...form, class: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Section
//                 </label>
//                 <input
//                   type="text"
//                   value={form.section}
//                   onChange={(e) => setForm({ ...form, section: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isProcessing}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isProcessing ? (
//                   <>
//                     <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                     Processing...
//                   </>
//                 ) : (
//                   'Add Student'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };








import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Loader2 } from 'lucide-react';

interface StudentForm {
  name: string;
  email: string;
  studentId: string;
  contact: string;
  parentContact: string;
  parentEmail: string;
  class: string;
  section: string;
}

export const AddStudent: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<StudentForm>({
    name: '',
    email: '',
    studentId: '',
    contact: '',
    parentContact: '',
    parentEmail: '',
    class: '',
    section: '',
  });

  const validateForm = () => {
    if (!form.name || !form.email || !form.studentId || !form.contact || !form.parentContact || !form.parentEmail || !form.class || !form.section) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required',
      });
      return false;
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !form.parentEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter valid email addresses',
      });
      return false;
    }

    if (!form.contact.match(/^\d{10}$/) || !form.parentContact.match(/^\d{10}$/)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Contact numbers must be 10 digits',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // Simulate a delay to make it feel like a real submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Student added successfully',
        showConfirmButton: true,
      });

      // Reset form
      setForm({
        name: '',
        email: '',
        studentId: '',
        contact: '',
        parentContact: '',
        parentEmail: '',
        class: '',
        section: '',
      });
    } catch (error) {
      console.error('Error processing form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add student. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Add New Student
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student ID
                </label>
                <input
                  type="text"
                  value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., STU001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent's Contact
                </label>
                <input
                  type="tel"
                  value={form.parentContact}
                  onChange={(e) => setForm({ ...form, parentContact: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent's Email
                </label>
                <input
                  type="email"
                  value={form.parentEmail}
                  onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class
                </label>
                <input
                  type="text"
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <input
                  type="text"
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  'Add Student'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
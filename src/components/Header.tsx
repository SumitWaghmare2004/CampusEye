// import React from 'react';
// import { Menu, Bell } from 'lucide-react';
// import { useAuthStore } from '../store/authStore';
// import { Logo } from './Logo';

// export const Header: React.FC = () => {
//   const user = useAuthStore((state) => state.user);
//   const signOut = useAuthStore((state) => state.signOut);

//   return (
//     <header className="sticky top-0 z-40 lg:mx-auto bg-white border-b border-gray-200">
//       <div className="flex h-16 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
//         <button
//           type="button"
//           className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
//           onClick={() => {
//             // Toggle mobile menu
//           }}
//         >
//           <span className="sr-only">Open sidebar</span>
//           <Menu className="h-6 w-6" aria-hidden="true" />
//         </button>

//         <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
//           <div className="flex items-center gap-x-4 lg:gap-x-6">
//             <Logo showText={false} className="hidden lg:flex" />
//             <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
//           </div>

//           <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
//             <button
//               type="button"
//               className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
//             >
//               <span className="sr-only">View notifications</span>
//               <Bell className="h-6 w-6" aria-hidden="true" />
//             </button>

//             <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

//             <div className="flex items-center gap-x-4 lg:gap-x-6">
//               <div className="hidden lg:flex lg:items-end lg:gap-x-2">
//                 <span className="text-sm font-semibold leading-6 text-gray-900">
//                   {user?.name}
//                 </span>
//                 <span className="text-sm leading-6 text-gray-500">
//                   {user?.role}
//                 </span>
//               </div>

//               <button
//                 className="text-sm font-semibold leading-6 text-gray-900"
//                 onClick={() => signOut()}
//               >
//                 Sign out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };






import React, { useState } from 'react';
import { Menu, Bell, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Logo } from './Logo';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <header className="sticky top-0 z-40 lg:mx-auto bg-white border-b border-gray-200">
      <div className="flex h-16 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Toggle sidebar</span>
          {isSidebarOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Logo showText={false} className="hidden lg:flex" />
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:flex lg:items-end lg:gap-x-2">
                <span className="text-sm font-semibold leading-6 text-gray-900">
                  {user?.name}
                </span>
                <span className="text-sm leading-6 text-gray-500">
                  {user?.role}
                </span>
              </div>

              <button
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
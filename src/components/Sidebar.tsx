import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Bell,
  UserCircle,
  Settings,
  UserPlus,
  // Camera,
  // Eye,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Logo } from './Logo';

const navigation = {
  student: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', href: '/attendance', icon: Users },
    // { name: 'Mark Attendance', href: '/mark-attendance', icon: Camera },
    // { name: 'Behavior Tracking', href: '/behavior-tracking', icon: Eye },
    { name: 'Warnings', href: '/warnings', icon: AlertTriangle },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Profile', href: '/profile', icon: UserCircle },
  ],
  faculty: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Add Student', href: '/add-student', icon: UserPlus },
    { name: 'Warnings', href: '/warnings', icon: AlertTriangle },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
};

export const Sidebar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const items = navigation[user?.role || 'student'];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Logo className="h-8" />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {items.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          isActive
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};



















// import React from 'react';
// import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
// import { format } from 'date-fns';

// const notifications = [
//   {
//     id: 1,
//     type: 'warning',
//     title: 'New Warning Issued',
//     message: 'You have received a warning for late arrival.',
//     date: '2024-03-07T09:30:00',
//     read: false,
//   },
//   {
//     id: 2,
//     type: 'attendance',
//     title: 'Perfect Attendance',
//     message: 'Congratulations! You maintained perfect attendance this week.',
//     date: '2024-03-06T14:20:00',
//     read: true,
//   },
//   {
//     id: 3,
//     type: 'reminder',
//     title: 'Upcoming Review',
//     message: 'Your disciplinary review is scheduled for next week.',
//     date: '2024-03-05T11:15:00',
//     read: true,
//   },
// ];

// export const Notifications: React.FC = () => {
//   return (
//     <div className="space-y-6">
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Bell className="h-6 w-6 text-gray-400" />
//               <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
//                 Notifications
//               </h3>
//             </div>
//             <button className="text-sm text-indigo-600 hover:text-indigo-900">
//               Mark all as read
//             </button>
//           </div>
//         </div>

//         <div className="divide-y divide-gray-200">
//           {notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`p-4 ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}
//             >
//               <div className="flex items-start space-x-3">
//                 {notification.type === 'warning' ? (
//                   <AlertTriangle className="h-6 w-6 text-yellow-500" />
//                 ) : notification.type === 'attendance' ? (
//                   <CheckCircle className="h-6 w-6 text-green-500" />
//                 ) : (
//                   <Clock className="h-6 w-6 text-blue-500" />
//                 )}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <p
//                       className={`text-sm font-medium ${
//                         notification.read ? 'text-gray-900' : 'text-indigo-900'
//                       }`}
//                     >
//                       {notification.title}
//                     </p>
//                     <span className="text-sm text-gray-500">
//                       {format(new Date(notification.date), 'MMM d, h:mm a')}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
//                 </div>
//               </div>
//               {!notification.read && (
//                 <div className="mt-2 text-right">
//                   <button className="text-sm text-indigo-600 hover:text-indigo-900">
//                     Mark as read
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };






import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Check } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: number;
  type: 'warning' | 'attendance' | 'reminder';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      title: 'New Warning Issued',
      message: 'You have received a warning for late arrival.',
      date: '2024-03-07T09:30:00',
      read: false,
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Perfect Attendance',
      message: 'Congratulations! You maintained perfect attendance this week.',
      date: '2024-03-06T14:20:00',
      read: true,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Upcoming Review',
      message: 'Your disciplinary review is scheduled for next week.',
      date: '2024-03-05T11:15:00',
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-gray-400" />
              <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
            </div>
            <button 
              className="text-sm text-indigo-600 hover:text-indigo-900"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}
            >
              <div className="flex items-start space-x-3">
                {notification.type === 'warning' ? (
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                ) : notification.type === 'attendance' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Clock className="h-6 w-6 text-blue-500" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm font-medium ${
                        notification.read ? 'text-gray-900' : 'text-indigo-900'
                      }`}
                    >
                      {notification.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      {notification.read && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm text-gray-500">
                        {format(new Date(notification.date), 'MMM d, h:mm a')}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                </div>
              </div>
              {!notification.read && (
                <div className="mt-2 text-right">
                  <button 
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                    <Check className="ml-1 h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
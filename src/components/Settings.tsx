import React, { useState } from 'react';
import { Bell, Mail, Shield } from 'lucide-react';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    warnings: true,
    attendance: true,
    behavior: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showStats: true,
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your preferences and account settings
          </p>
        </div>

        <div className="px-4 py-5 sm:p-6 space-y-6">
          <div>
            <h4 className="text-base font-medium text-gray-900 flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              Notification Preferences
            </h4>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email"
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({ ...notifications, email: e.target.checked })
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500">
                    Receive email updates about warnings and important notices
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="warnings"
                    type="checkbox"
                    checked={notifications.warnings}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        warnings: e.target.checked,
                      })
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="warnings" className="font-medium text-gray-700">
                    Warning Alerts
                  </label>
                  <p className="text-gray-500">
                    Get notified immediately when a warning is issued
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="attendance"
                    type="checkbox"
                    checked={notifications.attendance}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        attendance: e.target.checked,
                      })
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="attendance" className="font-medium text-gray-700">
                    Attendance Updates
                  </label>
                  <p className="text-gray-500">
                    Receive notifications about attendance records
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-base font-medium text-gray-900 flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-2" />
              Privacy Settings
            </h4>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="show-profile"
                    type="checkbox"
                    checked={privacy.showProfile}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, showProfile: e.target.checked })
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="show-profile" className="font-medium text-gray-700">
                    Show Profile
                  </label>
                  <p className="text-gray-500">
                    Make your profile visible to other faculty members
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="show-stats"
                    type="checkbox"
                    checked={privacy.showStats}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, showStats: e.target.checked })
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="show-stats" className="font-medium text-gray-700">
                    Show Statistics
                  </label>
                  <p className="text-gray-500">
                    Display detailed statistics in reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
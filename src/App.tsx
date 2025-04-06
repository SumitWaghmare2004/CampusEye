// import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { StudentDashboard } from './components/StudentDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { Attendance } from './components/Attendance';
import { AttendanceMarking } from './components/AttendanceMarking';
import { BehaviorTracking } from './components/BehaviorTracking';
import { Warnings } from './components/Warnings';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Students } from './components/Students';
import { AddStudent } from './components/AddStudent';
import { Settings } from './components/Settings';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              user?.role === 'student' ? <StudentDashboard /> : <FacultyDashboard />
            }
          />
          {user?.role === 'student' ? (
            <>
              <Route path="attendance" element={<Attendance />} />
              <Route path="mark-attendance" element={<AttendanceMarking />} />
              <Route path="behavior-tracking" element={<BehaviorTracking />} />
              <Route path="warnings" element={<Warnings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="students" element={<Students />} />
              <Route path="add-student" element={<AddStudent />} />
              <Route path="warnings" element={<Warnings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
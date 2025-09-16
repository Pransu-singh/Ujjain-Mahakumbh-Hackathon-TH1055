import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PilgrimDashboard from './components/Dashboard/PilgrimDashboard';
import AdminPanel from './components/Admin/AdminPanel';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import CrowdMonitoring from './components/CrowdMonitoring/CrowdMonitoring';
import LiveFeeds from './components/LiveFeeds/LiveFeeds';
import Alerts from './components/Alerts/Alerts';
import LostAndFound from './components/Dashboard/LostAndFound';
import Recommendations from './components/Dashboard/Recommendations';
import SocialSentiment from './components/Dashboard/SocialSentiment';
import Settings from './components/Settings/Settings';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './components/Auth/AuthContext';



const App: React.FC = () => {
  const { state } = useAuth();
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['pilgrim', 'security', 'admin']}>
                {state.user?.userType === 'pilgrim' ? <PilgrimDashboard /> : <Dashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crowd-monitoring"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin']}>
                <CrowdMonitoring />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live-feeds"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin']}>
                <LiveFeeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin']}>
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lost-and-found"
            element={
              <ProtectedRoute allowedRoles={['pilgrim', 'security', 'admin']}>
                <LostAndFound />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/social-sentiment"
            element={
              <ProtectedRoute allowedRoles={['pilgrim', 'security', 'admin']}>
                <SocialSentiment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={['pilgrim', 'security', 'admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import CrowdMonitoring from './components/CrowdMonitoring/CrowdMonitoring';
import LiveFeeds from './components/LiveFeeds/LiveFeeds';
import Alerts from './components/Alerts/Alerts';
import Settings from './components/Settings/Settings';
import LostAndFound from './components/Dashboard/LostAndFound';
import Recommendations from './components/Dashboard/Recommendations';
import SocialSentiment from './components/Dashboard/SocialSentiment';

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/crowd-monitoring" element={<CrowdMonitoring />} />
        <Route path="/live-feeds" element={<LiveFeeds />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/lost-and-found" element={<LostAndFound />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/social-sentiment" element={<SocialSentiment />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
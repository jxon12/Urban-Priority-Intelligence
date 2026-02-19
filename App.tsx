import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ReportPage from './components/ReportPage';
import OfficerDashboard from './components/OfficerDashboard'; // Import the new page
import InclusiveModePage from './components/InclusiveMode';
import { Page, UserRole as UserRoleType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [userData, setUserData] = useState<any>(null);

  // Navigation handlers
  const handleJoinClick = () => {
    setCurrentPage(Page.AUTH);
  };

  const handleBackToLanding = () => {
    setCurrentPage(Page.LANDING);
  };

  const handleInclusiveMode = () => {
    setCurrentPage(Page.INCLUSIVE_MODE);
  };

  const handleAuthSuccess = (role: UserRoleType, data: any) => {
    setUserRole(role);
    setUserData(data);
    
    // Role-based routing logic
    if (role === 'officer') {
      setCurrentPage(Page.OFFICER_DASHBOARD);
    } else {
      setCurrentPage(Page.REPORT);
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserData(null);
    setCurrentPage(Page.LANDING);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {currentPage === Page.LANDING && (
          <LandingPage 
            key="landing" 
            onJoin={handleJoinClick}
            onInclusiveMode={handleInclusiveMode}
          />
        )}

        {currentPage === Page.INCLUSIVE_MODE && (
          <InclusiveModePage
            key="inclusive-mode"
            onExit={handleBackToLanding}
          />
        )}

        {currentPage === Page.AUTH && (
          <AuthPage 
            key="auth" 
            onBack={handleBackToLanding}
            onSuccess={handleAuthSuccess}
          />
        )}

        {currentPage === Page.REPORT && (
          <ReportPage 
            key="report"
            onLogout={handleLogout}
          />
        )}

      {currentPage === Page.OFFICER_DASHBOARD && (
  <OfficerDashboard 
    onLogout={handleLogout} 
    userData={userData || { email: 'guest@core.ai', dept: 'System' }} 
  />
)}
      </AnimatePresence>
    </div>
  );
};

export default App;
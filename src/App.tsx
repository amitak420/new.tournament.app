import React, { useContext } from 'react';
import { UserRole } from './types/types';
import LandingPage from './components/LandingPage';
import PlayerDashboard from './components/PlayerDashboard';
import OrganiserDashboard from './components/OrganiserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { AuthContext } from './context/AuthContext';

const App: React.FC = () => {
  const { loggedInUser, userStats, isLoading, theme, toggleTheme } = useContext(AuthContext);

  const renderDashboard = () => {
    if (!loggedInUser) return null;

    switch (loggedInUser.role) {
      case UserRole.PLAYER:
        return (
            <PlayerDashboard />
        );
      case UserRole.ORGANISER:
        return (
          <OrganiserDashboard />
        );
      case UserRole.ADMIN:
        return (
          <AdminDashboard />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading eSports Arena...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {loggedInUser ? renderDashboard() : <LandingPage theme={theme} toggleTheme={toggleTheme} />}
    </div>
  );
};

export default App;

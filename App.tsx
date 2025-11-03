import React, { useState, useCallback, useEffect } from 'react';
import { UserRole } from './types';
import LandingPage from './components/LandingPage';
import PlayerDashboard from './components/PlayerDashboard';
import OrganiserDashboard from './components/OrganiserDashboard';
import AdminDashboard from './components/AdminDashboard';
// Firebase Auth
import { onAuthStateChanged, signOut, User as FirebaseUser } from '@firebase/auth';
import { auth } from './firebase';
// Firebase Realtime Database
import { ref, onValue } from '@firebase/database';
import { database } from './firebase';

interface User {
  email: string;
  role: UserRole;
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  // User stats from Firebase will be passed to dashboards
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user && user.email) {
        // Use the role from localStorage as a fallback, but DB should be source of truth
        const storedRole = localStorage.getItem('userRole') as UserRole;
        const role = Object.values(UserRole).includes(storedRole) ? storedRole : UserRole.PLAYER;
        setLoggedInUser({ email: user.email, role });

        // Fetch stats for the currently logged-in user using their UID
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserStats(data);
            // If database has a role, it overrides localStorage
            if (data.role && data.role !== role) {
              const dbRole = data.role as UserRole;
              setLoggedInUser({ email: user.email!, role: dbRole });
              localStorage.setItem('userRole', dbRole);
            }
          } else {
            setUserStats(null);
          }
        });

      } else {
        setLoggedInUser(null);
        setUserStats(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = useCallback((email: string, role: UserRole) => {
    localStorage.setItem('userRole', role);
    setLoggedInUser({ email, role });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userRole');
    signOut(auth).catch((error) => {
      console.error('Logout Error:', error);
    });
  }, []);

  const renderDashboard = () => {
    if (!loggedInUser) return null;

    switch (loggedInUser.role) {
      case UserRole.PLAYER:
        return (
            <PlayerDashboard user={loggedInUser} onLogout={handleLogout} userStats={userStats} />
        );
      case UserRole.ORGANISER:
        return (
          <OrganiserDashboard user={loggedInUser} onLogout={handleLogout} userStats={userStats} />
        );
      case UserRole.ADMIN:
        return (
          <AdminDashboard user={loggedInUser} onLogout={handleLogout} />
        );
      default:
        return null;
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
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
      {loggedInUser ? renderDashboard() : <LandingPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />}
    </div>
  );
};

export default App;
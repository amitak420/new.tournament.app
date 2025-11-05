import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '../types/types';
import { onAuthStateChanged, signOut, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase/firebase';
import { ref, onValue, set } from 'firebase/database';

export interface User {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  loggedInUser: User | null;
  userStats: any;
  isLoading: boolean;
  theme: string;
  toggleTheme: () => void;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, ign: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  userStats: null,
  isLoading: true,
  theme: 'dark',
  toggleTheme: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user && user.email) {
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserStats(data);
            const dbRole = data.role as UserRole;
            setLoggedInUser({ email: user.email!, role: dbRole });
            localStorage.setItem('userRole', dbRole);
          } else {
            // This might happen briefly on registration before DB is set
            setUserStats(null);
            const storedRole = localStorage.getItem('userRole') as UserRole;
            const role = Object.values(UserRole).includes(storedRole) ? storedRole : UserRole.PLAYER;
            setLoggedInUser({ email: user.email, role });
          }
          setIsLoading(false);
        });
      } else {
        setLoggedInUser(null);
        setUserStats(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const login = async (email: string, password: string, role: UserRole) => {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('userRole', role);
    // onAuthStateChanged will handle setting the user state
  };

  const register = async (email: string, password: string, ign: string, role: UserRole) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await set(ref(database, 'users/' + user.uid), {
      email: user.email,
      ign: ign,
      role: role,
      joinedTournaments: 0,
      matchesWon: 0,
      totalWinnings: 0,
      tournamentsHosted: 0,
    });
    localStorage.setItem('userRole', role);
    // onAuthStateChanged will handle setting the user state
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    signOut(auth).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

  const value = {
    loggedInUser,
    userStats,
    isLoading,
    theme,
    toggleTheme,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

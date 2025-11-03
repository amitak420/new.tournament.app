
import React from 'react';
import { UserRole } from '../types';
import CrownIcon from './icons/CrownIcon';

interface DashboardProps {
  user: {
    email: string;
    role: UserRole;
  };
  onLogout: () => void;
}

const AdminDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center p-8 bg-slate-800/50 border border-slate-700 rounded-xl animate-pulse-glow">
        <div className="mx-auto mb-6 p-4 w-fit rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg">
          <CrownIcon />
        </div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-300 mb-1">Oversee the Nexus.</p>
        <p className="text-fuchsia-400 font-mono text-lg mb-8">{user.email}</p>
        <button
          onClick={onLogout}
          className="font-bold text-sm text-rose-300 border border-rose-300/50 rounded-full px-8 py-3 hover:bg-rose-300/10 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

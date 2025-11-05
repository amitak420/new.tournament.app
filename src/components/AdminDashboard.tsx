import React, { useContext } from 'react';
import { AuthContext, User } from '../context/AuthContext';
import CrownIcon from '../assets/icons/CrownIcon';

const AdminDashboard: React.FC = () => {
  const { loggedInUser, logout } = useContext(AuthContext);

  if (!loggedInUser) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center p-8 bg-slate-800/50 border border-slate-700 rounded-xl animate-pulse-glow">
        <div className="mx-auto mb-6 p-4 w-fit rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg">
          <CrownIcon />
        </div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-300 mb-1">Oversee the Nexus.</p>
        <p className="text-fuchsia-400 font-mono text-lg mb-8">{loggedInUser.email}</p>
        <button
          onClick={logout}
          className="font-bold text-sm text-rose-300 border border-rose-300/50 rounded-full px-8 py-3 hover:bg-rose-300/10 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

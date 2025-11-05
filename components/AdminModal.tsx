import React, { useState } from 'react';
import { UserRole } from '../types';
// FIX: Corrected firebase auth import path
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


interface AdminModalProps {
  onClose: () => void;
  onLogin: (email: string, role: UserRole) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user.email) {
            onLogin(userCredential.user.email, UserRole.ADMIN);
        }
    } catch (err: any) {
        setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, ''));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xs bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors text-xs bg-white/5 p-1 rounded-md">
          ✕
        </button>
        <h3 className="font-bold text-center">Admin Login</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin ID"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
          {error && <p className="text-red-400 text-xs text-center -mt-2">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-lg px-4 py-2 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "..." : "Login"}
          </button>
        </form>
        <p className="text-xs text-white/40 text-center">Restricted access only.</p>
      </div>
    </div>
  );
};

export default AdminModal;
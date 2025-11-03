import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import EmailIcon from './icons/EmailIcon';
import PasswordIcon from './icons/PasswordIcon';
import IgnIcon from './icons/IgnIcon';
// Firebase Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth, database } from '../firebase';
// Firebase DB
import { ref, set } from '@firebase/database';


interface LoginModalProps {
  initialRole: UserRole;
  onClose: () => void;
  onLogin: (email: string, role: UserRole) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ initialRole, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ign, setIgn] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPlayer = initialRole === UserRole.PLAYER;

  useEffect(() => {
    const checkStrength = (p: string) => {
      let score = 0;
      if (p.length > 7) score++;
      if (p.match(/[a-z]/)) score++;
      if (p.match(/[A-Z]/)) score++;
      if (p.match(/[0-9]/)) score++;
      if (p.match(/[^a-zA-Z0-9]/)) score++;
      setPasswordStrength(score);
    };
    if (activeTab === 'register') {
      checkStrength(password);
    }
  }, [password, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (activeTab === 'register' && !termsAccepted) {
      setError("Please accept the terms and conditions.");
      setIsLoading(false);
      return;
    }

    try {
      let userCredential;
      if (activeTab === 'register') {
        // Step 1: Create user in Auth
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Step 2: Create user profile in Realtime Database
        await set(ref(database, 'users/' + user.uid), {
          email: user.email,
          ign: ign,
          role: initialRole,
          joinedTournaments: 0,
          matchesWon: 0,
          totalWinnings: 0,
          tournamentsHosted: 0,
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      if (userCredential.user.email) {
        onLogin(userCredential.user.email, initialRole);
      }
    } catch (err: any) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  const strengthClasses = ['w-0', 'w-1/5 bg-red-500', 'w-2/5 bg-red-500', 'w-3/5 bg-yellow-500', 'w-4/5 bg-green-500', 'w-full bg-green-500'];

  return (
    <div 
      className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.2) 30%, rgba(3, 7, 18, 0.8))',
        backdropFilter: 'blur(10.5px)'
      }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-3xl border border-slate-400/30 shadow-2xl backdrop-blur-2xl"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.35))'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest ${isPlayer ? 'bg-blue-600' : 'bg-orange-600'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isPlayer ? 'bg-green-400' : 'bg-yellow-300'}`}></span>
              {isPlayer ? 'Player Mode' : 'Organiser Mode'}
            </div>
            <h2 className="mt-2 text-xl font-bold">Welcome {initialRole}</h2>
            <p className="text-xs text-slate-200/60">Sign in to continue to eSports Arena.</p>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full border border-slate-200/20 bg-slate-900/20 text-slate-200 transition-colors hover:bg-slate-900/40">✕</button>
        </div>

        <div className="mx-5 mb-1 flex rounded-full border border-slate-800/50 bg-slate-900/40 p-1">
          <button onClick={() => setActiveTab('login')} className={`flex-1 rounded-full py-1 text-sm font-semibold transition-colors ${activeTab === 'login' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>Login</button>
          <button onClick={() => setActiveTab('register')} className={`flex-1 rounded-full py-1 text-sm font-semibold transition-colors ${activeTab === 'register' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5 pt-3">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><EmailIcon /></span>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-blue-500" />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><PasswordIcon /></span>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={activeTab === 'login' ? '••••••••' : 'Create strong password'} required className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-blue-500" />
            {activeTab === 'register' && password.length > 0 && (
                <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-slate-700">
                    <div className={`h-full rounded-full transition-all duration-300 ${strengthClasses[passwordStrength]}`}></div>
                </div>
            )}
          </div>
          
          {activeTab === 'register' && (
            <>
              <div className="relative">
                <label htmlFor="ign" className="sr-only">In-game Name</label>
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><IgnIcon /></span>
                <input id="ign" type="text" value={ign} onChange={e => setIgn(e.target.value)} placeholder="Your IGN / Team name" required className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-blue-500" />
              </div>

              <div className="flex items-start gap-3">
                <input id="terms" type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-slate-400">
                  I agree to eSports Arena <a href="#" className="font-semibold text-blue-400 hover:underline">Terms & Conditions</a> and <a href="#" className="font-semibold text-blue-400 hover:underline">Fair Play Policy</a>
                </label>
              </div>
            </>
          )}

          {error && <p className="text-center text-xs text-red-400">{error}</p>}
          
          <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? '...' : (activeTab === 'login' ? 'Continue' : 'Create Account')} →
          </button>
          
          <p className="text-center text-xs text-slate-500">By continuing, you agree to eSports Arena terms & fair-play rules.</p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

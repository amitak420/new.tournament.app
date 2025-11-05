import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import EmailIcon from './icons/EmailIcon';
import PasswordIcon from './icons/PasswordIcon';
import IgnIcon from './icons/IgnIcon';
import GoogleIcon from './icons/GoogleIcon';
import DiscordIcon from './icons/DiscordIcon';
import { Eye, EyeOff } from './icons/LucideIcons';

// Firebase Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase';
// Firebase DB
import { ref, set } from 'firebase/database';


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

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);

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
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setIgn('');
    setError(null);
    setShowPassword(false);
  };

  useEffect(() => {
      resetForm();
  }, [activeTab]);

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
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await set(ref(database, 'users/' + user.uid), {
          email: user.email,
          ign: ign,
          role: initialRole,
          joinedTournaments: 0, matchesWon: 0, totalWinnings: 0, tournamentsHosted: 0,
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
        <div className="flex items-start justify-between p-5 pb-3">
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

        <div className="p-5 pt-0">
          {!showEmailForm ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-center items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full py-2">
                  <div className="flex -space-x-2 overflow-hidden">
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
                  </div>
                  <span className="text-sm font-semibold text-slate-300">Join 50,000+ Players</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"><GoogleIcon /> Google</button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"><DiscordIcon /> Discord</button>
              </div>
              <div className="flex items-center"><hr className="w-full border-slate-700" /><span className="px-2 text-xs text-slate-500">OR</span><hr className="w-full border-slate-700" /></div>
              <button onClick={() => setShowEmailForm(true)} className="w-full rounded-lg bg-slate-700/70 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700">Continue with Email</button>
            </div>
          ) : (
            <div className="animate-fadeIn">
                <div className="mx-5 mb-1 flex rounded-full border border-slate-800/50 bg-slate-900/40 p-1">
                    <button onClick={() => setActiveTab('login')} className={`flex-1 rounded-full py-1 text-sm font-semibold transition-colors ${activeTab === 'login' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>Login</button>
                    <button onClick={() => setActiveTab('register')} className={`flex-1 rounded-full py-1 text-sm font-semibold transition-colors ${activeTab === 'register' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>Register</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 p-5 pt-3">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><EmailIcon /></span>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-blue-500" />
                    </div>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><PasswordIcon /></span>
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={activeTab === 'login' ? '••••••••' : 'Create strong password'} required className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-10 text-sm text-white outline-none transition-colors focus:border-blue-500" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                        {activeTab === 'register' && password.length > 0 && <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-slate-700"><div className={`h-full rounded-full transition-all duration-300 ${strengthClasses[passwordStrength]}`}></div></div>}
                    </div>

                    {activeTab === 'login' && <div className="text-right -mt-2"><a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a></div>}
                    
                    {activeTab === 'register' && (
                        <>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><IgnIcon /></span>
                                <input type="text" value={ign} onChange={e => setIgn(e.target.value)} placeholder="Your IGN / Team name" required className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-blue-500" />
                            </div>
                            <div className="flex items-start gap-3"><input id="2fa" type="checkbox" checked={enable2FA} onChange={e => setEnable2FA(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer" /><label htmlFor="2fa" className="text-xs text-slate-400">Enable two-factor authentication</label></div>
                            <div className="flex items-start gap-3"><input id="terms" type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer" /><label htmlFor="terms" className="text-xs text-slate-400">I agree to eSports Arena <a href="#" className="font-semibold text-blue-400 hover:underline">Terms</a> and <a href="#" className="font-semibold text-blue-400 hover:underline">Privacy Policy</a></label></div>
                        </>
                    )}
                    {error && <p className="text-center text-xs text-red-400">{error}</p>}
                    <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {isLoading ? (activeTab === 'login' ? 'Signing In...' : 'Creating...') : (activeTab === 'login' ? 'Continue' : 'Create Account')}
                    </button>
                </form>
            </div>
          )}
        </div>
        
        <div className="border-t border-slate-800 px-5 py-3 text-center text-xs text-slate-400">
            {showEmailForm ? (
                <button onClick={() => setShowEmailForm(false)} className="font-semibold text-blue-400 hover:underline">← Back to Quick Login</button>
            ) : ( activeTab === 'login' ? (
                <span>Don't have an account? <button onClick={() => { setActiveTab('register'); setShowEmailForm(true); }} className="font-semibold text-blue-400 hover:underline">Sign up</button></span>
            ) : (
                <span>Already have an account? <button onClick={() => { setActiveTab('login'); setShowEmailForm(true); }} className="font-semibold text-blue-400 hover:underline">Log in</button></span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

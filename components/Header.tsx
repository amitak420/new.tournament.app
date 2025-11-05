import React, { useState } from 'react';
import BrandIcon from './icons/BrandIcon';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onAdminClick }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleBrandClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount >= 5) {
      onAdminClick();
      setClickCount(0); // Reset after triggering
    }
  };

  return (
    <header 
      className="sticky top-0 z-20 flex h-[var(--header-h)] items-center justify-between border-b px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-400/10 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div 
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-2xl shadow-lg transition-transform hover:scale-105"
          style={{
             background: 'radial-gradient(circle at 10% 10%, rgba(251, 191, 36, 0.92), rgba(249, 115, 22, 0.9), rgba(139, 92, 246, 1))',
             boxShadow: '0 10px 35px rgba(249, 115, 22, 0.4)'
          }}
          onClick={handleBrandClick}
          title="Admin Access Easter Egg"
        >
          <BrandIcon />
        </div>
        <div className="leading-tight">
          <div className="text-xl font-bold">eSports Arena</div>
          <div className="text-xs uppercase tracking-[0.2rem] text-slate-500 dark:text-slate-200/60">Tournament Platform</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-slate-200 dark:bg-slate-900/40 px-3 py-1.5 text-xs uppercase tracking-widest text-slate-700 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
          India's Next-Gen Esports Hub
        </div>
        <button 
          onClick={toggleTheme}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-slate-300 dark:border-slate-400/30 bg-slate-200 dark:bg-slate-800/20 text-xl transition-colors hover:bg-slate-300 dark:hover:bg-slate-400/40"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { UserRole } from '../types';
import LoginModal from './LoginModal';
import AdminModal from './AdminModal';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';
import PlayerCardIcon from './icons/PlayerCardIcon';
import OrganiserCardIcon from './icons/OrganiserCardIcon';
import Promo from './Promo';


interface LandingPageProps {
  onLogin: (email: string, role: UserRole) => void;
  theme: string;
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, theme, toggleTheme }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PLAYER);
  const [liveTournaments, setLiveTournaments] = useState(12);

  // Update live tournament count for visual effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveTournaments(Math.floor(Math.random() * (15 - 8) + 8));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openLoginModal = (role: UserRole) => {
    setSelectedRole(role);
    setIsLoginModalOpen(true);
  };
  
  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header theme={theme} toggleTheme={toggleTheme} onAdminClick={openAdminModal} />
        
        <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full text-center flex flex-col gap-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter hero-title">
                Enter the Arena. Dominate the Stage.
              </h1>
              {/* FIX: Replaced non-standard <style jsx> with standard <style> tag. */}
              <style>{`
                .hero-title {
                  background: linear-gradient(90deg, #1f2937 0%, #374151 50%, #f97316 100%);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                }
                html.dark .hero-title {
                  background: linear-gradient(90deg, #ffffff 0%, #c4d1ff 25%, #d1e6ff 50%, #fbbf24 80%);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                }
              `}</style>

              <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-slate-200/70">
                Choose your entry into India's most vibrant esports ecosystem. Compete as a Player or run your own high-stakes tournaments.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-sm font-semibold text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>{liveTournaments} tournaments live now</span>
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
              <RoleCard 
                role={UserRole.PLAYER}
                onClick={() => openLoginModal(UserRole.PLAYER)}
              />
              <RoleCard 
                role={UserRole.ORGANISER}
                onClick={() => openLoginModal(UserRole.ORGANISER)}
              />
            </div>
            
            <Promo />
            <Features />

          </div>
        </main>
        
        <Footer />

      </div>

      {isLoginModalOpen && <LoginModal initialRole={selectedRole} onClose={() => setIsLoginModalOpen(false)} onLogin={onLogin} />}
      {isAdminModalOpen && <AdminModal onLogin={onLogin} onClose={() => setIsAdminModalOpen(false)} />}
    </>
  );
};

// Role Card Component
const RoleCard: React.FC<{ role: UserRole; onClick: () => void }> = ({ role, onClick }) => {
  const isPlayer = role === UserRole.PLAYER;
  
  const playerConfig = {
    label: 'Player Access',
    title: 'Join as Player',
    description: 'Register, join tournaments, track leaderboards, and win rewards.',
    feature: 'Instant match-ready',
    icon: <PlayerCardIcon />,
    cardClass: 'border-slate-200 dark:border-blue-500/30 hover:border-blue-500/60 dark:hover:shadow-blue-500/10',
    labelClass: 'text-green-400',
    labelDotClass: 'bg-green-400',
    featureDotClass: 'bg-blue-500',
  };

  const organiserConfig = {
    label: 'Tournament Host',
    title: 'Host Tournament',
    description: 'Create & manage brackets, entries, prizes and live standings.',
    feature: 'Secure organiser tools',
    icon: <OrganiserCardIcon />,
    cardClass: 'border-slate-200 dark:border-orange-500/30 hover:border-orange-500/60 dark:hover:shadow-orange-500/10',
    labelClass: 'text-orange-400',
    labelDotClass: 'bg-orange-400',
    featureDotClass: 'bg-orange-500',
  };

  const config = isPlayer ? playerConfig : organiserConfig;

  return (
    <article 
      className={`group flex flex-col justify-between gap-6 rounded-3xl border bg-white dark:bg-slate-900/40 p-6 sm:p-8 text-left shadow-xl backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 ${config.cardClass}`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className={`inline-flex items-center gap-2 rounded-full border border-slate-800/10 dark:border-white/10 bg-slate-800/5 dark:bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider ${config.labelClass}`}>
            <span className={`h-2 w-2 rounded-full ${config.labelDotClass}`}></span>
            {config.label}
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-slate-800/10 dark:border-white/10 bg-slate-800/5 dark:bg-white/5">
            {config.icon}
          </div>
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{config.title}</h2>
        <p className="mt-3 max-w-xs text-base text-slate-500 dark:text-slate-200/60">{config.description}</p>
        <div className="mt-6 flex items-center gap-3 rounded-full bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 w-fit">
          <span className={`h-2 w-2 rounded-full ${config.featureDotClass}`}></span>
          {config.feature}
        </div>
      </div>
      
      {isPlayer ? (
        <button
          onClick={onClick}
          className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-slate-800/20 p-4 text-left text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/60 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:shadow-lg dark:hover:shadow-blue-500/20"
        >
          <span className="font-semibold">Tap to sign in / create account</span>
          <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-slate-800/20 p-4 text-left text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/60 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:shadow-lg dark:hover:shadow-orange-500/20"
        >
          <span className="font-semibold">Launch events in minutes</span>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-200 dark:bg-white/10 transition-all duration-300 group-hover:bg-slate-300 dark:group-hover:bg-white/20">
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </button>
      )}
    </article>
  );
};

export default LandingPage;
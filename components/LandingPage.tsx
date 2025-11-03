import React, { useState } from 'react';
import { UserRole } from '../types';
import LoginModal from './LoginModal';
import AdminModal from './AdminModal';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';
import Promo from './Promo';
import PlayerCardIcon from './icons/PlayerCardIcon';
import OrganiserCardIcon from './icons/OrganiserCardIcon';


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
        
        <main className="flex flex-1 items-center justify-center p-5 sm:p-8 md:p-12">
          <div className="w-full max-w-5xl text-center flex flex-col gap-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter hero-title">
                Enter the Arena. Dominate the Stage.
              </h1>
              {/* FIX: Replaced non-standard <style jsx> with standard <style> tag. */}
              <style>{`
                .hero-title {
                  background: linear-gradient(90deg, #ffffff 0%, #c4d1ff 25%, #d1e6ff 50%, #fbbf24 80%);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                }
                html.light-mode .hero-title {
                  background: linear-gradient(90deg, #1f2937 0%, #374151 50%, #f97316 100%);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                }
              `}</style>

              <p className="mt-4 text-base sm:text-lg text-slate-200/70 light:text-gray-500">
                Choose your entry into India's most vibrant esports ecosystem. Compete as a Player or run your own high-stakes tournaments.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-sm font-semibold text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>{liveTournaments} tournaments live now</span>
              </div>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              <RoleCard 
                role={UserRole.PLAYER}
                onClick={() => openLoginModal(UserRole.PLAYER)}
              />
              <RoleCard 
                role={UserRole.ORGANISER}
                onClick={() => openLoginModal(UserRole.ORGANISER)}
              />
            </div>
            
            <Features />
            <Promo />

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
    stat: 'Instant match-ready',
    cardClass: 'player-card',
    titleClass: 'player-title',
    icon: <PlayerCardIcon />,
    borderColor: 'border-blue-500/40',
    hoverBorderColor: 'hover:border-blue-400/80',
    shadowColor: 'hover:shadow-[0_18px_55px_rgba(59,130,246,0.25)]'
  };

  const organiserConfig = {
    label: 'Tournament Host',
    title: 'Host Tournament',
    description: 'Create & manage brackets, entries, prizes and live standings.',
    stat: 'Secure organiser tools',
    cardClass: 'organiser-card',
    titleClass: 'organiser-title',
    icon: <OrganiserCardIcon />,
    borderColor: 'border-orange-400/40',
    hoverBorderColor: 'hover:border-orange-400/80',
    shadowColor: 'hover:shadow-[0_18px_55px_rgba(249,115,22,0.25)]'
  };

  const config = isPlayer ? playerConfig : organiserConfig;

  return (
    <>
    {/* FIX: Replaced non-standard <style jsx> with standard <style> tag. */}
    <style>{`
      .player-card {
        background: radial-gradient(circle at 3% 5%, rgba(59, 130, 246, 0.16), rgba(3, 7, 18, 0.05)), rgba(3, 7, 18, 0.42);
      }
      .organiser-card {
        background: linear-gradient(140deg, rgba(249, 115, 22, 0.28) 0%, rgba(3, 7, 18, 0.1) 53%), rgba(3, 7, 18, 0.4);
      }
      .player-title {
        background: linear-gradient(90deg, #fff 0%, #e2e8f0 50%, #3b82f6 90%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .organiser-title {
        background: linear-gradient(90deg, #fff 0%, #fde68a 60%, #f97316 95%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
    `}</style>
    <article 
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col justify-between gap-4 rounded-3xl border p-5 text-left shadow-xl backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-1.5 
      ${config.cardClass} ${config.borderColor} ${config.hoverBorderColor} ${config.shadowColor}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/20 bg-slate-900/50 px-2 py-1 text-xs uppercase tracking-widest text-slate-300">
            <span className={`h-1.5 w-1.5 rounded-full ${isPlayer ? 'bg-green-500' : 'bg-orange-500'}`}></span>{config.label}
          </div>
          <h2 className={`mt-2 text-3xl font-bold ${config.titleClass}`}>{config.title}</h2>
          <p className="mt-1 max-w-xs text-sm text-slate-200/60 light:text-slate-400">{config.description}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200/10 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300">
            <span className={`h-1.5 w-1.5 rounded-full ${isPlayer ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>{config.stat}
          </div>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 backdrop-blur-lg">
            {config.icon}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-slate-200/40">{isPlayer ? 'Tap to sign in / create account' : 'Launch events in minutes'}</span>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xl text-white transition-transform duration-150 ease-out group-hover:translate-x-1">→</div>
      </div>
    </article>
    </>
  );
};

export default LandingPage;
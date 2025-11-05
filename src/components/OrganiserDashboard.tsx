import React, { useState, useEffect, useContext } from 'react';
import { UserRole } from '../types/types';
import { TrendingUp, TrendingDown, Users, Trophy, Wallet, BarChart3, Settings, Zap, Award, Target, ChevronRight, Menu, X, Sparkles, Flame, Star, ChevronLeft, Edit } from '../assets/icons/LucideIcons';
import { AuthContext } from '../context/AuthContext';

// Helper to determine the visual style of a tournament badge based on its state
const getBadgeInfo = (tournament: any) => {
    const fillRatio = tournament.players / tournament.maxPlayers;
    if (tournament.status === 'live') {
        return { text: 'Live Now', icon: Zap, gradient: 'from-green-400 to-green-600', bgClass: 'bg-green-500/20', textClass: 'text-green-400', borderClass: 'border-green-500/30' };
    }
    if (fillRatio >= 0.9 && tournament.status === 'open') {
        return { text: 'Filling Fast', icon: Flame, gradient: 'from-orange-400 to-orange-600', bgClass: 'bg-orange-500/20', textClass: 'text-orange-400', borderClass: 'border-orange-500/30' };
    }
     if (tournament.status === 'completed') {
        return { text: 'Completed', icon: Award, gradient: 'from-gray-400 to-gray-600', bgClass: 'bg-gray-500/20', textClass: 'text-gray-400', borderClass: 'border-gray-500/30' };
    }
    return { text: 'Open', icon: Trophy, gradient: 'from-cyan-400 to-cyan-600', bgClass: 'bg-cyan-500/20', textClass: 'text-cyan-400', borderClass: 'border-cyan-500/30' };
};


// --- SUB-COMPONENTS ---

const DashboardHome = ({ tournaments, userStats }: { tournaments: any[], userStats: any }) => (
    <div className="space-y-5">
      <GlassCard className="p-6 bg-gradient-to-br from-purple-200/80 to-pink-200/80 dark:from-purple-600/30 dark:to-pink-600/30" glow>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <p className="text-slate-700 dark:text-white/80 text-sm font-medium">Total Revenue</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">₹{userStats.totalWinnings.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <TrendingUp size={18} />
            <span>+23% Growth</span>
          </div>
          <NeonButton variant="success" className="text-sm py-2 px-4">
            <div className="flex items-center gap-2">
              <Wallet size={16} />
              Withdraw
            </div>
          </NeonButton>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Active" value={tournaments.filter(t => t.status === 'live' || t.status === 'open').length} change={12} icon={Trophy} gradient="from-cyan-400 to-blue-500" />
        <StatCard title="Players" value="2.4K" change={18} icon={Users} gradient="from-purple-400 to-pink-500" />
        <StatCard title="Pending" value="₹45K" icon={Target} gradient="from-orange-400 to-red-500" />
        <StatCard title="Earnings" value={`₹${userStats.totalWinnings.toLocaleString()}`} icon={Award} gradient="from-yellow-400 to-orange-500" />
      </div>

      <GlassCard>
        <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-slate-900 dark:text-white">Live Updates</h3>
          </div>
          <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase">Real-time</span>
        </div>
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {tournaments.slice(0, 3).map((t, i) => {
            const badge = getBadgeInfo(t);
            const BadgeIcon = badge.icon;
            return (
              <div key={i} className="p-4 flex items-center justify-between transform transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${badge.gradient}`}>
                    <BadgeIcon className="text-white" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 mt-2">
                      <div className={`h-1.5 rounded-full bg-gradient-to-r ${badge.gradient} transition-all duration-500`} style={{ width: `${(t.players/t.maxPlayers)*100}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-white/60 mt-1">{t.players}/{t.maxPlayers} slots</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 text-xs font-bold rounded-lg ${badge.bgClass} ${badge.textClass} border ${badge.borderClass}`}>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="text-cyan-500 dark:text-cyan-400" size={20} />
          Revenue Sources
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Entry Fees', value: '₹75K', percent: 62, gradient: 'from-blue-500 to-cyan-500' },
            { label: 'Sponsorship', value: '₹30K', percent: 25, gradient: 'from-emerald-500 to-green-500' },
            { label: 'Premium', value: '₹10K', percent: 8, gradient: 'from-purple-500 to-pink-500' },
            { label: 'Referrals', value: '₹5K', percent: 5, gradient: 'from-orange-500 to-yellow-500' },
          ].map((item, i) => (
            <div key={i} className="transform transition-all duration-300 hover:translate-x-2">
              <div className="flex justify-between mb-2">
                <span className="text-slate-700 dark:text-white/80 text-sm font-semibold">{item.label}</span>
                <span className={`font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.value}</span>
              </div>
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div className={`h-2.5 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-1000 shadow-lg`} style={{ width: `${item.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5 bg-gradient-to-br from-yellow-200/80 to-orange-200/80 dark:from-yellow-600/20 dark:to-orange-600/20 border-yellow-300 dark:border-yellow-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl animate-pulse">
            <Award className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <p className="font-black text-slate-900 dark:text-white text-lg">Top 5% Organizer! 🔥</p>
            <p className="text-slate-700 dark:text-white/70 text-sm mt-1">Unlock Pro tier for 85% commission</p>
          </div>
        </div>
        <NeonButton variant="gold" className="w-full mt-4 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={16} />
            Upgrade Now
            <ChevronRight size={16} />
          </div>
        </NeonButton>
      </GlassCard>
    </div>
);

const TournamentManagement = ({ tournaments, onViewDetails, updatedTournamentId }: { tournaments: any[], onViewDetails: (id: string) => void, updatedTournamentId: string | null }) => {
    const [activeTab, setActiveTab] = useState('All');

    const filteredTournaments = tournaments.filter(t => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Live') return t.status === 'live';
        if (activeTab === 'Scheduled') return t.status === 'open';
        if (activeTab === 'Completed') return t.status === 'completed';
        return true;
    });

    return (
        <div className="space-y-5">
            <NeonButton variant="purple" className="w-full">
                <div className="flex items-center justify-center gap-2">
                <Trophy size={20} />
                Create Tournament
                <Sparkles size={18} />
                </div>
            </NeonButton>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Live', 'Scheduled', 'Completed'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50' : 'backdrop-blur-xl bg-black/10 dark:bg-white/10 text-slate-800 dark:text-white/70 border border-black/10 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20'}`}>
                    {tab}
                </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredTournaments.map((t, i) => {
                    const badge = getBadgeInfo(t);
                    return (
                        <GlassCard key={i} className={`p-5 transform transition-all duration-300 hover:scale-102 hover:-translate-y-1 ${t.id === updatedTournamentId ? 'animate-flash-cyan' : ''}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                            <h4 className="font-black text-slate-900 dark:text-white text-lg">{t.name}</h4>
                            <p className="text-slate-600 dark:text-white/60 text-sm mt-1">₹{t.entry} entry • ₹{t.pool} prize pool</p>
                            </div>
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r ${badge.gradient} text-white shadow-lg`}>
                            {badge.text}
                            </span>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-slate-600 dark:text-white/70 mb-2 font-semibold">
                            <span>{t.players}/{t.maxPlayers} players</span>
                            <span>{Math.round(t.players/t.maxPlayers*100)}%</span>
                            </div>
                            <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden">
                            <div className={`h-3 rounded-full bg-gradient-to-r ${badge.gradient} transition-all duration-500 shadow-lg`} style={{ width: `${t.players/t.maxPlayers*100}%` }}></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                            <div>
                            <p className="text-xs text-slate-600 dark:text-white/60 font-semibold uppercase">Your Revenue</p>
                            <p className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">₹{t.revenue}</p>
                            </div>
                            <NeonButton onClick={() => onViewDetails(t.id)} variant="primary" className="text-sm py-2.5 px-5">
                                Manage
                            </NeonButton>
                        </div>
                        </GlassCard>
                    )
                })}
            </div>
        </div>
    );
};

const TournamentDetailView = ({ tournament, onBack, onDelete, isUpdating }: { tournament: any, onBack: () => void, onDelete: (id: string) => void, isUpdating: boolean }) => {
    const badge = getBadgeInfo(tournament);

    return (
        <div className="space-y-5 animate-fadeIn">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-bold transition-colors">
                <ChevronLeft size={20} />
                Back to Tournaments
            </button>

            <GlassCard className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">{tournament.name}</h2>
                        <span className={`inline-block mt-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r ${badge.gradient} text-white shadow-lg`}>
                            {badge.text}
                        </span>
                    </div>
                    <button className="backdrop-blur-xl bg-black/10 dark:bg-white/10 p-3 rounded-xl border border-black/10 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20 transition-all">
                        <Edit size={20} className="text-slate-800 dark:text-white" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                    <div>
                        <p className="text-xs text-slate-600 dark:text-white/60 font-semibold uppercase">Prize Pool</p>
                        <p className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">₹{tournament.pool.toLocaleString()}</p>
                    </div>
                     <div>
                        <p className="text-xs text-slate-600 dark:text-white/60 font-semibold uppercase">Entry Fee</p>
                        <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">₹{tournament.entry.toLocaleString()}</p>
                    </div>
                </div>
            </GlassCard>

            <GlassCard>
                 <div className="p-4 border-b border-black/10 dark:border-white/10">
                    <h3 className={`font-bold text-slate-900 dark:text-white transition-colors duration-500 ${isUpdating ? 'animate-flash-text' : ''}`}>Player List ({tournament.players}/{tournament.maxPlayers})</h3>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-black/10 dark:divide-white/10">
                    {tournament.participants.length > 0 ? tournament.participants.map((player: string, i: number) => (
                         <div key={i} className="p-3 flex items-center justify-between text-sm hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="font-semibold text-slate-800 dark:text-white/90">#{i + 1} {player}</span>
                            <span className="text-xs text-slate-500 dark:text-white/50">Joined Nov {i+1}</span>
                        </div>
                    )) : (
                        <div className="p-4 text-center text-sm text-slate-600 dark:text-white/60">No players have joined yet.</div>
                    )}
                </div>
            </GlassCard>

            <NeonButton onClick={() => onDelete(tournament.id)} variant="danger" className="w-full">
                Delete Tournament
            </NeonButton>
        </div>
    )
}


const WalletSection = ({ userStats }: { userStats: any }) => (
    <div className="space-y-5">
      <GlassCard className="p-6 bg-gradient-to-br from-emerald-200/80 to-green-200/80 dark:from-emerald-600/30 dark:to-green-600/30" glow>
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="text-slate-800 dark:text-white" size={28} />
          <p className="text-slate-700 dark:text-white/80 text-sm font-semibold uppercase tracking-wide">Available Balance</p>
        </div>
        <p className="text-5xl font-black text-slate-900 dark:text-white mb-6">₹45,230</p>
        <div className="flex gap-3">
          <NeonButton variant="success" className="flex-1">Withdraw</NeonButton>
          <button className="flex-1 backdrop-blur-xl bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/30 text-slate-800 dark:text-white py-3 px-6 rounded-xl font-bold hover:bg-black/20 dark:hover:bg-white/20 transition-all">History</button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4">
          <p className="text-slate-600 dark:text-white/60 text-xs font-semibold mb-2 uppercase">Pending</p>
          <p className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">₹12,500</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-slate-600 dark:text-white/60 text-xs font-semibold mb-2 uppercase">Lifetime</p>
          <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">₹{userStats.totalWinnings.toLocaleString()}</p>
        </GlassCard>
      </div>

      <GlassCard className="p-5 bg-gradient-to-br from-blue-200/80 to-cyan-200/80 dark:from-blue-600/20 dark:to-cyan-600/20 border-cyan-300 dark:border-cyan-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
            <Zap className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-black text-slate-900 dark:text-white">Commission Rate: 75%</p>
            <p className="text-slate-700 dark:text-white/70 text-xs mt-1">₹47K more to unlock 80% rate</p>
          </div>
        </div>
        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden">
          <div className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg transition-all duration-1000" style={{ width: '64%' }}></div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-4 border-b border-black/10 dark:border-white/10">
          <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {[
            { desc: 'Withdrawal to Bank', amount: -25000, date: 'Nov 2', status: 'Completed', colorClass: 'text-slate-800 dark:text-white' },
            { desc: 'BGMI Pro League', amount: 3450, date: 'Nov 1', status: 'Completed', colorClass: 'text-emerald-600 dark:text-emerald-400' },
            { desc: 'Valorant Cup', amount: 2800, date: 'Oct 31', status: 'Processing', colorClass: 'text-orange-500 dark:text-orange-400' },
          ].map((txn, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{txn.desc}</p>
                <p className="text-xs text-slate-600 dark:text-white/60 mt-1">{txn.date} • {txn.status}</p>
              </div>
              <p className={`font-black ${txn.colorClass} text-lg`}>
                {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
);

const PricingSection = () => (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Choose Your Plan</h2>
        <p className="text-slate-600 dark:text-white/70">Unlock premium features & better rates</p>
      </div>

      {[
        { name: 'Free', price: 0, commission: 75, features: ['Basic analytics', '3 tournaments', 'Standard support'], gradient: 'from-gray-500 to-gray-600', current: true },
        { name: 'Premium', price: 299, commission: 80, features: ['Featured placement', '10 tournaments', 'Priority support', 'Advanced analytics'], gradient: 'from-cyan-500 to-blue-600', popular: true },
        { name: 'Pro', price: 999, commission: 85, features: ['Top placement', '30 tournaments', '24/7 support', 'API access', 'White-label'], gradient: 'from-purple-500 to-pink-600' },
      ].map((plan, i) => (
        <GlassCard key={i} className={`p-6 relative ${plan.popular ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-200/80 to-blue-200/80 dark:from-cyan-600/20 dark:to-blue-600/20' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">⚡ POPULAR</span>
            </div>
          )}
          {plan.current && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">CURRENT</span>
            </div>
          )}
          
          <div className="text-center mb-5">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{plan.name}</h3>
            <div>
              <span className="text-5xl font-black text-slate-900 dark:text-white">₹{plan.price}</span>
              <span className="text-slate-600 dark:text-white/60 text-sm">/month</span>
            </div>
            <p className={`text-sm font-black mt-3 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
              {plan.commission}% Commission Rate
            </p>
          </div>

          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-center gap-3 text-sm text-slate-800 dark:text-white/90">
                <div className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                {feature}
              </li>
            ))}
          </ul>

          {plan.current ? (
            <button className="w-full backdrop-blur-xl bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/30 text-slate-800 dark:text-white py-3 rounded-xl font-bold">Current Plan</button>
          ) : (
            <NeonButton variant={plan.popular ? 'primary' : 'purple'} className="w-full">Upgrade Now ✨</NeonButton>
          )}
        </GlassCard>
      ))}
    </div>
);

// --- HELPER COMPONENTS ---

const GlassCard: React.FC<{ children: React.ReactNode, className?: string, glow?: boolean }> = ({ children, className = "", glow = false }) => (
    <div className={`backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-2xl border border-black/10 dark:border-white/20 shadow-2xl relative overflow-hidden ${className}`}>
      {glow && <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/50 via-purple-200/50 to-pink-200/50 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-pink-500/20 animate-pulse"></div>}
      <div className="relative z-10">{children}</div>
    </div>
);

const NeonButton: React.FC<{ children: React.ReactNode, variant?: string, onClick?: () => void, className?: string }> = ({ children, variant = 'primary', onClick, className = "" }) => {
    const getVariantClass = () => {
      if (variant === 'success') return 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-lg shadow-emerald-500/50';
      if (variant === 'purple') return 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg shadow-purple-500/50';
      if (variant === 'gold') return 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-lg shadow-yellow-500/50';
      if (variant === 'danger') return 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-lg shadow-red-500/50';
      return 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50';
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${getVariantClass()} text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${className}`}
      >
        {children}
      </button>
    );
};

const StatCard: React.FC<{ title: string, value: string | number, change?: number, icon: React.FC<any>, gradient: string }> = ({ title, value, change, icon: Icon, gradient }) => (
    <GlassCard className="p-5 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-slate-600 dark:text-white/70 text-xs font-semibold mb-2 uppercase tracking-wider">{title}</p>
          <p className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="text-white" size={22} />
        </div>
      </div>
      {change && (
        <div className={`flex items-center gap-1.5 text-xs font-bold ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{Math.abs(change)}% vs last month</span>
        </div>
      )}
    </GlassCard>
);

const initialTournaments = [
  { id: 't1', name: 'BGMI Pro League', players: 92, maxPlayers: 100, entry: 50, revenue: 3450, status: 'open', pool: 4000, participants: ['Player1', 'ProGamerX', 'Shadow_King', 'NoobMaster69', 'AlphaSniper'] },
  { id: 't2', name: 'Free Fire Masters', players: 100, maxPlayers: 100, entry: 30, revenue: 2250, status: 'live', pool: 2500, participants: ['FF_Legend', 'Booyah_Boss'] },
  { id: 't3', name: 'Valorant Evening', players: 45, maxPlayers: 64, entry: 100, revenue: 3375, status: 'open', pool: 5000, participants: ['JettMain', 'CypherGod', 'Reyna_MVP'] },
];

const OrganiserDashboard: React.FC = () => {
  const { loggedInUser, userStats, logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, duration: number}[]>([]);
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [updatedTournamentId, setUpdatedTournamentId] = useState<string | null>(null);
  
  const stats = userStats || {
    totalWinnings: 0,
    tournamentsHosted: 0,
  };

  useEffect(() => {
    // Set up background particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, duration: Math.random() * 20 + 10 }));
    setParticles(newParticles);
  }, []);

  // Update tournaments from Firebase data
  useEffect(() => {
    if (userStats && userStats.hostedTournaments) {
        const tournamentsArray = Object.keys(userStats.hostedTournaments).map(key => ({
            id: key,
            ...userStats.hostedTournaments[key]
        }));
        setTournaments(tournamentsArray);
    }
  }, [userStats]);

  // Simulate real-time player joins for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
        setTournaments(prevTournaments => {
            if (prevTournaments.length === 0) return [];

            const updatableTournaments = prevTournaments.filter(
                t => (t.status === 'open' || t.status === 'live') && t.players < t.maxPlayers
            );

            if (updatableTournaments.length === 0) return prevTournaments;

            const tournamentToUpdate = updatableTournaments[Math.floor(Math.random() * updatableTournaments.length)];
            
            setUpdatedTournamentId(tournamentToUpdate.id);
            setTimeout(() => setUpdatedTournamentId(null), 1000); // Visual flash for 1 second

            const newParticipant = `Player${Math.floor(Math.random() * 900) + 100}`;

            return prevTournaments.map(t => 
                t.id === tournamentToUpdate.id 
                ? { 
                    ...t, 
                    players: t.players + 1,
                    participants: [...t.participants, newParticipant]
                  } 
                : t
            );
        });
    }, 3000); // New player joins every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDeleteTournament = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tournament? This action cannot be undone.')) {
        setTournaments(prev => prev.filter(t => t.id !== id));
        setSelectedTournamentId(null); // Go back to the list view
    }
  };

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Zap },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'pricing', label: 'Pricing', icon: Star },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home': return <DashboardHome tournaments={tournaments} userStats={stats} />;
      case 'tournaments':
        const selectedTournament = tournaments.find(t => t.id === selectedTournamentId);
        return selectedTournament ? (
          <TournamentDetailView
            tournament={selectedTournament}
            onBack={() => setSelectedTournamentId(null)}
            onDelete={handleDeleteTournament}
            isUpdating={selectedTournament.id === updatedTournamentId}
          />
        ) : (
          <TournamentManagement 
            tournaments={tournaments}
            onViewDetails={(id) => setSelectedTournamentId(id)}
            updatedTournamentId={updatedTournamentId}
          />
        );
      case 'wallet': return <WalletSection userStats={stats} />;
      case 'pricing': return <PricingSection />;
      default: return (
        <GlassCard className="p-12 text-center">
          <BarChart3 className="mx-auto text-cyan-500 dark:text-cyan-400 mb-4" size={56} />
          <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">{menuItems.find(m => m.id === activeSection)?.label}</h3>
          <p className="text-slate-600 dark:text-white/60">Coming in full version</p>
        </GlassCard>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden text-slate-900 dark:text-white">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-black/10 dark:bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s infinite ease-in-out ${p.id * 0.5}s`
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes flash-cyan {
            0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
            50% { box-shadow: 0 0 15px 5px rgba(6, 182, 212, 0.7); }
            100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
        }
        .animate-flash-cyan {
            animation: flash-cyan 1s ease-out;
        }
        @keyframes flash-text {
            50% { color: #06b6d4; }
        }
        .animate-flash-text {
            animation: flash-text 1s ease-out;
        }
      `}</style>

      <header className="backdrop-blur-xl bg-white/30 dark:bg-black/30 sticky top-0 z-50 border-b border-black/10 dark:border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Trophy className="text-white" size={26} />
            </div>
            <div>
              <h1 className="font-black text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">eSports Arena</h1>
              <p className="text-xs text-slate-600 dark:text-white/60 font-semibold">Organizer Pro</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-lg border border-black/10 dark:border-white/20 md:hidden">
            {mobileMenuOpen ? <X className="text-slate-800 dark:text-white" size={24} /> : <Menu className="text-slate-800 dark:text-white" size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="backdrop-blur-xl bg-white/80 dark:bg-black/60 w-72 h-full p-6 shadow-2xl border-r border-black/10 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold transition-all ${activeSection === item.id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-slate-700 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10'}`}
                >
                  <item.icon size={22} />
                  {item.label}
                </button>
              ))}
                <button
                  onClick={logout}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold transition-all text-red-500 dark:text-red-400/70 hover:bg-red-500/10`}
                >
                  <X size={22} />
                  Logout
                </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-md mx-auto p-4 pb-24 relative z-10">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/40 dark:bg-black/40 border-t border-black/10 dark:border-white/10 z-50">
        <div className="max-w-md mx-auto flex justify-around py-2">
          {menuItems.slice(0, 4).map((item) => ( // Show only first 4 in bottom nav for space
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all ${activeSection === item.id ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-500 dark:text-white/50'}`}
            >
              <item.icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default OrganiserDashboard;

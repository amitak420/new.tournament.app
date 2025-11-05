import React, { useState, useEffect, useRef, useContext } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Home, Trophy, Wallet, User, Bell, Search, Award, Zap, Target, Brain, Send, Flame, X, Gift, Gamepad2, Users, ChevronRight, Star, DollarSign } from '../assets/icons/LucideIcons';
import Tutorial from './Tutorial';
import { AuthContext } from '../context/AuthContext';

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// --- MOCK DATA FOR UI --- (real data will come from props/firebase)
const tournaments = [
    { id: 1, name: 'Champions League 2025', prize: 50000, status: 'Live', rank: 12, game: 'Valorant', players: 128, entryFee: 200 },
    { id: 2, name: 'Battle Royale Legends', prize: 25000, status: 'Live', rank: 8, game: 'PUBG', players: 64, entryFee: 100 },
    { id: 3, name: 'Pro League Season 5', prize: 100000, status: 'Upcoming', startDate: 'Nov 10', game: 'Valorant', players: 256, entryFee: 500 }
];

const pricingPlans = [
    { name: 'Free', price: 0, features: ['5 Tournaments/month', 'Basic Stats', 'Community Access', 'Standard Support'], color: 'from-gray-600 to-gray-700', darkColor: 'dark:from-gray-600 dark:to-gray-700' },
    { name: 'Pro', price: 499, features: ['Unlimited Tournaments', 'Advanced Analytics', 'AI Coach Access', 'Priority Support', 'Exclusive Events'], color: 'from-blue-500 to-purple-500', darkColor: 'dark:from-blue-600 dark:to-purple-600', popular: true },
    { name: 'Elite', price: 999, features: ['Everything in Pro', 'Personal Coach', 'VIP Tournament Access', 'Exclusive Rewards', '24/7 Premium Support'], color: 'from-yellow-500 to-orange-500', darkColor: 'dark:from-yellow-600 dark:to-orange-600' }
];

const transactions = [
    { id: 1, type: 'win' as const, amount: 4500, desc: 'Winter Warriors - Prize', date: '2025-11-01' },
    { id: 2, type: 'deposit' as const, amount: 5000, desc: 'Wallet Top-up', date: '2025-10-30' },
    { id: 3, type: 'entry' as const, amount: -200, desc: 'Champions League Entry', date: '2025-10-28' }
];


// --- AI HELPERS ---
const analyzePerformance = (stats: any) => {
    if (!stats || !stats.joinedTournaments) return [];
    const winRate = (stats.matchesWon / stats.joinedTournaments) * 100 || 0;
    const insights = [];
    if (winRate < 40) {
        insights.push({
            type: 'critical',
            title: 'Win Rate Needs Improvement',
            message: `Your current win rate of ${winRate.toFixed(1)}% is an area for growth. Let's focus on fundamentals.`,
            actionable: ['Practice last-hitting in training mode for 30 mins daily', 'Study map awareness techniques', 'Watch replays of your losses']
        });
    }
     if (winRate > 60) {
        insights.push({
            type: 'positive',
            title: 'Excellent Win Rate!',
            message: `You're dominating with a ${winRate.toFixed(1)}% win rate! Keep up the great work.`,
            actionable: ['Analyze pro player POVs to refine micro-decisions', 'Try mentoring a newer player to solidify your own knowledge', 'Experiment with new agent/hero roles to increase versatility']
        });
    }
    return insights;
};

const generateDailyChallenge = () => {
    const challenges = [
        { title: 'Headshot Master', desc: 'Achieve 60% headshot accuracy in 5 matches', reward: '₹50', xp: 100 },
        { title: 'Clutch King', desc: 'Win 3 rounds in a 1v2 situation', reward: '₹75', xp: 150 },
        { title: 'Team Player', desc: 'Get 20 assists in a single day', reward: '₹40', xp: 80 }
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
};

const tutorialSteps = [
    {
        target: '#welcome-banner',
        title: '👋 Welcome to the Arena!',
        content: 'This is your personal dashboard. Let\'s take a quick tour of the key features to get you started.',
        position: 'bottom',
    },
    {
        target: '#player-stats',
        title: 'Your Stats at a Glance',
        content: 'Track your progress here. See how many tournaments you\'ve joined, your wins, and your current winning streak.',
        position: 'bottom',
    },
    {
        target: '#daily-challenge',
        title: 'Daily Challenges',
        content: 'Complete daily challenges like this one to earn extra rewards and XP. A new challenge appears every day!',
        position: 'bottom',
    },
    {
        target: '#live-tournaments',
        title: 'Find Your Next Game',
        content: 'This is where you can find and join live or upcoming tournaments. Your path to glory starts here!',
        position: 'bottom',
    },
    {
        target: '#ai-coach-button',
        title: 'Your Personal AI Coach',
        content: 'Need tips or strategy advice? Tap this button to chat with our AI Coach anytime.',
        position: 'left',
    },
    {
        target: '#bottom-nav',
        title: 'Easy Navigation',
        content: 'Switch between your Home screen, Tournaments, Wallet, and Profile using this navigation bar.',
        position: 'top',
    },
];


// --- MAIN COMPONENT ---
const PlayerDashboard: React.FC = () => {
    const { userStats, logout } = useContext(AuthContext);
    const [activeScreen, setActiveScreen] = useState('home');
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: Date; type?: string; tips?: string[] }[]>([
        { sender: 'ai', text: 'Hey Champion! I have analyzed your recent matches. Ready to level up?', timestamp: new Date() }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isCoachLoading, setIsCoachLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    const [dailyChallenge, setDailyChallenge] = useState<any>(null);
    const [aiInsights, setAiInsights] = useState<any[]>([]);

    const [isTutorialActive, setIsTutorialActive] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);
    
    const stats = userStats || {
        ign: 'Player', joinedTournaments: 0, matchesWon: 0, totalWinnings: 0, streak: 0, level: 1, currentRank: 'N/A'
    };
    
    useEffect(() => {
        if (userStats) {
            setAiInsights(analyzePerformance(userStats));
            if (userStats.joinedTournaments === 0) {
                // Launch tutorial for new players
                setIsTutorialActive(true);
            }
        }
        setDailyChallenge(generateDailyChallenge());
    }, [userStats]);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleNextStep = () => {
        if (tutorialStep < tutorialSteps.length - 1) {
            setTutorialStep(tutorialStep + 1);
        } else {
            setIsTutorialActive(false);
        }
    };
    const handlePrevStep = () => {
        if (tutorialStep > 0) {
            setTutorialStep(tutorialStep - 1);
        }
    };
    const handleSkipTutorial = () => {
        setIsTutorialActive(false);
    };
    
    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isCoachLoading) return;

        const userMsg = { sender: 'user' as const, text: inputMessage, timestamp: new Date() };
        setChatMessages(prev => [...prev, userMsg, { sender: 'ai' as const, text: '...', timestamp: new Date(), type: 'loading' }]);
        setInputMessage('');
        setIsCoachLoading(true);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are an expert eSports coach for games like Valorant and PUBG. The user is a player on our platform. Their stats are: IGN: ${stats.ign}, Tournaments Joined: ${stats.joinedTournaments}, Matches Won: ${stats.matchesWon}, Current Streak: ${stats.streak}. Respond to their question concisely (2-3 sentences max), be encouraging, and provide one actionable tip. User's question: "${inputMessage}"`,
            });
            const coachResponse = response.text;
            setChatMessages(prev => {
                const newMessages = prev.filter(m => m.type !== 'loading');
                return [...newMessages, { sender: 'ai', text: coachResponse, timestamp: new Date() }];
            });
        } catch (error) {
            console.error("AI Coach Error:", error);
            setChatMessages(prev => {
                const newMessages = prev.filter(m => m.type !== 'loading');
                return [...newMessages, { sender: 'ai', text: 'Sorry, I had a problem connecting. Please try again.', timestamp: new Date() }];
            });
        } finally {
            setIsCoachLoading(false);
        }
    };
    
    const HomeScreen = () => (
    <div className="pb-24">
      <div id="welcome-banner" className="relative bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 p-8 rounded-3xl mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 hidden dark:block"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">Enter the Arena.</h1>
              <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">Dominate the Stage.</h2>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl">
              🏆
            </div>
          </div>
          
          <p className="text-blue-900/80 dark:text-blue-100 text-sm mb-6">
            India's most vibrant esports ecosystem. Compete, win, and rise.
          </p>
          
          <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-800 dark:text-green-300 text-sm font-medium">10 tournaments live now</span>
          </div>
        </div>
      </div>
      
      <div id="player-stats" className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Trophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.joinedTournaments}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Tournaments</div>
        </div>
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Award className="w-6 h-6 text-green-500 dark:text-green-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.matchesWon}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Wins</div>
        </div>
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Flame className="w-6 h-6 text-orange-500 dark:text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streak}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
        </div>
      </div>
      
      {aiInsights.length > 0 && (
        <div className="mb-6">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${insight.type === 'critical' ? 'from-red-100 to-red-50 dark:from-red-900/40 dark:to-red-800/40 border-red-500/30' : 'from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 border-green-500/30'} rounded-2xl p-5`}>
              <div className="flex items-start space-x-3">
                <Brain className={`w-6 h-6 ${insight.type === 'critical' ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'} flex-shrink-0 mt-1`} />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{insight.message}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">💡 Actionable Steps:</div>
                    {insight.actionable.map((action: string, i: number) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <Target className="w-3 h-3 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {dailyChallenge && (
        <div id="daily-challenge" className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 border border-purple-200 dark:border-purple-500/30 rounded-2xl p-5 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-purple-700 dark:text-purple-300 mb-1">⚡ DAILY CHALLENGE</div>
              <h3 className="font-bold text-gray-900 dark:text-white">{dailyChallenge.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{dailyChallenge.desc}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">{dailyChallenge.reward}</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{dailyChallenge.xp} XP</span>
            </div>
            <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-lg font-semibold">
              Accept
            </button>
          </div>
        </div>
      )}
      
      <div id="live-tournaments" className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Tournaments</h3>
          <button onClick={() => setActiveScreen('tournaments')} className="text-blue-600 dark:text-blue-400 text-sm font-medium">
            View All →
          </button>
        </div>
        
        <div className="space-y-3">
          {tournaments.slice(0, 2).map(tournament => (
            <div key={tournament.id} className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tournament.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tournament.game}</p>
                </div>
                {tournament.status === 'Live' && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full font-semibold animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Prize Pool</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">₹{tournament.prize.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Entry Fee</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{tournament.entryFee}</div>
                </div>
              </div>
              
              <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const TournamentsScreen = () => (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tournaments</h2>
        <button className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold whitespace-nowrap">All</button>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-semibold whitespace-nowrap">Live</button>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-semibold whitespace-nowrap">Upcoming</button>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-semibold whitespace-nowrap">Completed</button>
      </div>
      
      <div className="space-y-4">
        {tournaments.map(tournament => (
          <div key={tournament.id} className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{tournament.name}</h3>
                  {tournament.status === 'Live' && <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded font-semibold animate-pulse">LIVE</span>}
                  {tournament.status === 'Upcoming' && <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs rounded font-semibold">SOON</span>}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1"><Gamepad2 className="w-3 h-3" /><span>{tournament.game}</span></span>
                  <span className="flex items-center space-x-1"><Users className="w-3 h-3" /><span>{tournament.players} players</span></span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg"><div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Prize Pool</div><div className="text-lg font-bold text-green-600 dark:text-green-400">₹{tournament.prize.toLocaleString()}</div></div>
              <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg"><div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Entry Fee</div><div className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{tournament.entryFee}</div></div>
              <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg"><div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{tournament.status === 'Live' ? 'Your Rank' : 'Starts'}</div><div className="text-lg font-bold text-purple-600 dark:text-purple-400">{tournament.status === 'Live' ? `#${tournament.rank}` : tournament.startDate}</div></div>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
              {tournament.status === 'Live' ? 'View Details' : 'Register Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
  const WalletScreen = () => (
    <div className="pb-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Wallet</h2>
      
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <div className="text-sm text-blue-100 mb-2">Total Winnings</div>
          <div className="text-4xl font-bold text-white mb-6">₹{stats.totalWinnings.toLocaleString()}</div>
          
          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-white text-blue-600 rounded-xl font-semibold flex items-center justify-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Add Money</span>
            </button>
            <button className="flex-1 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map(txn => (
            <div key={txn.id} className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'win' ? 'bg-green-500/20' : txn.type === 'deposit' ? 'bg-blue-500/20' : 'bg-red-500/20'
                }`}>
                  {txn.type === 'win' && <Trophy className="w-5 h-5 text-green-500 dark:text-green-400" />}
                  {txn.type === 'deposit' && <DollarSign className="w-5 h-5 text-blue-500 dark:text-blue-400" />}
                  {txn.type === 'entry' && <Gamepad2 className="w-5 h-5 text-red-500 dark:text-red-400" />}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{txn.desc}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{txn.date}</div>
                </div>
              </div>
              <div className={`font-bold text-lg ${txn.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-500/30 rounded-2xl p-5">
        <div className="flex items-start space-x-3">
          <Gift className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Refer & Earn</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Invite friends and get ₹100 bonus when they join!</p>
            <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-semibold">
              Invite Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const ProfileScreen = () => (
    <div className="pb-24">
      <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 mb-6 border border-gray-200 dark:border-transparent">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl">
            🎮
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.ign}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <div className="px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                Level {stats.level}
              </div>
              <div className="px-3 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-semibold">
                Rank #{stats.currentRank}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.joinedTournaments}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tournaments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.matchesWon}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.joinedTournaments > 0 ? Math.round((stats.matchesWon / stats.joinedTournaments) * 100) : 0}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Win Rate</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pricing Plans</h3>
        <div className="space-y-4">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${plan.color} ${plan.darkColor} rounded-2xl p-5 relative overflow-hidden ${plan.popular ? 'border-2 border-yellow-400' : ''}`}>
              {plan.popular && (
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-yellow-400 text-black text-xs rounded-full font-bold">POPULAR</span>
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-xl font-bold text-white mb-1">{plan.name}</h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                  <span className="text-white/60 ml-2">/month</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-5">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-white/90 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold">
                {plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <button className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-xl flex items-center justify-between">
          <span className="font-medium">Settings</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-xl flex items-center justify-between">
          <span className="font-medium">Help & Support</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button onClick={logout} className="w-full bg-red-500/20 text-red-500 dark:text-red-400 p-4 rounded-xl flex items-center justify-between">
          <span className="font-medium">Logout</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
    
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gradient-to-br dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 text-gray-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-xl">🏆</div>
                        <div>
                            <div className="text-gray-900 dark:text-white font-bold">eSports Arena</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">PLAYER DASHBOARD</div>
                        </div>
                    </div>
                    <button className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg relative">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    </button>
                </div>
            </header>
            
            <main className="max-w-md mx-auto px-4 py-6">
                {activeScreen === 'home' && <HomeScreen />}
                {activeScreen === 'tournaments' && <TournamentsScreen />}
                {activeScreen === 'wallet' && <WalletScreen />}
                {activeScreen === 'profile' && <ProfileScreen />}
            </main>
            
            <button 
                id="ai-coach-button"
                onClick={() => setChatOpen(!chatOpen)}
                className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50"
            >
                <Brain className="w-7 h-7 text-white" />
            </button>
            
            {chatOpen && (
                <div className="fixed inset-x-4 bottom-24 top-24 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col z-50 max-w-md mx-auto animate-fadeIn border border-gray-200 dark:border-transparent">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-3xl flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <Brain className="w-6 h-6 text-white" />
                            <div><h3 className="font-bold text-white">AI Coach</h3><p className="text-xs text-blue-100">Always here to help</p></div>
                        </div>
                        <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-lg"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>
                                    <p className={`whitespace-pre-line text-sm ${msg.type === 'loading' ? 'animate-pulse' : ''}`}>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={isCoachLoading}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            />
                            <button onClick={handleSendMessage} disabled={isCoachLoading} className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <nav id="bottom-nav" className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-40">
                <div className="max-w-md mx-auto px-4 py-3">
                    <div className="flex items-center justify-around">
                        <button onClick={() => setActiveScreen('home')} className={`flex flex-col items-center space-y-1 ${activeScreen === 'home' ? 'text-blue-500' : 'text-gray-500'}`}><Home className="w-6 h-6" /><span className="text-xs font-medium">Home</span></button>
                        <button onClick={() => setActiveScreen('tournaments')} className={`flex flex-col items-center space-y-1 ${activeScreen === 'tournaments' ? 'text-blue-500' : 'text-gray-500'}`}><Trophy className="w-6 h-6" /><span className="text-xs font-medium">Tournaments</span></button>
                        <button onClick={() => setActiveScreen('wallet')} className={`flex flex-col items-center space-y-1 ${activeScreen === 'wallet' ? 'text-blue-500' : 'text-gray-500'}`}><Wallet className="w-6 h-6" /><span className="text-xs font-medium">Wallet</span></button>
                        <button onClick={() => setActiveScreen('profile')} className={`flex flex-col items-center space-y-1 ${activeScreen === 'profile' ? 'text-blue-500' : 'text-gray-500'}`}><User className="w-6 h-6" /><span className="text-xs font-medium">Profile</span></button>
                    </div>
                </div>
            </nav>
            {isTutorialActive && (
                <Tutorial
                    steps={tutorialSteps}
                    currentStep={tutorialStep}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                    onSkip={handleSkipTutorial}
                />
            )}
        </div>
    );
};

export default PlayerDashboard;

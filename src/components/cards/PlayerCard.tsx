import React from 'react';
import CardButton from '../CardButton';

export default function PlayerCard() {
  return (
    <div className="group relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />

      {/* Glass card */}
      <div className="relative backdrop-blur-md bg-gray-900/70 border border-blue-500/30 rounded-3xl p-10 transition-all duration-300 hover:border-blue-500/60 hover:bg-gray-900/80">
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-2">
            Join as Player
          </h2>

          <p className="text-gray-300 mb-8">
            Register, join tournaments, track leaderboards, and win rewards
          </p>

          {/* Features */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              <span className="text-gray-200">Compete in epic tournaments</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-200">Climb the leaderboards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <span className="text-gray-200">Win real rewards</span>
            </div>
          </div>

          {/* Button */}
          <CardButton
            text="Sign In Now →"
            variant="blue"
          />
        </div>
      </div>
    </div>
  );
}

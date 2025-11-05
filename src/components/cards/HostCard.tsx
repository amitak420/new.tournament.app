import React from 'react';
import CardButton from '../CardButton';

export default function HostCard() {
  return (
    <div className="group relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />

      {/* Glass card */}
      <div className="relative backdrop-blur-md bg-gray-900/70 border border-orange-500/30 rounded-3xl p-10 transition-all duration-300 hover:border-orange-500/60 hover:bg-gray-900/80">
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-2">
            Host Tournament
          </h2>

          <p className="text-gray-300 mb-8">
            Create & manage brackets, entries, prizes and live standings
          </p>

          {/* Features */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <span className="text-gray-200">Organize tournaments easily</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <span className="text-gray-200">Live bracket management</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <span className="text-gray-200">Real-time standings & updates</span>
            </div>
          </div>

          {/* Button */}
          <CardButton
            text="Launch Event →"
            variant="orange"
          />
        </div>
      </div>
    </div>
  );
}

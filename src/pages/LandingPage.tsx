import React from 'react';
import GlassmorphismCards from '../components/GlassmorphismCards';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Gradient Banner */}
      <div className="h-32 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

      {/* Main Content */}
      <div className="bg-slate-950 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <div className="pt-16 pb-12 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              eSports Arena
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join competitive gaming tournaments or host your own event. Experience the next generation of esports competition.
            </p>
          </div>

          {/* Glassmorphic Cards */}
          <GlassmorphismCards />
        </div>
      </div>
    </div>
  );
}

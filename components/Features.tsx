import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h3 className="text-center text-xl font-bold text-slate-200 light:text-slate-800">Why eSports Arena?</h3>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <FeatureItem icon="⚡" text="Instant Tournaments" />
        <FeatureItem icon="🏆" text="Real Rewards" />
        <FeatureItem icon="🔒" text="100% Secure" />
        <FeatureItem icon="📱" text="Mobile Ready" />
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="rounded-2xl border border-slate-400/10 bg-slate-900/20 p-4 text-center text-sm text-slate-200/70 transition-transform hover:-translate-y-1 hover:border-slate-400/30">
    <div className="text-2xl">{icon}</div>
    <div className="mt-1">{text}</div>
  </div>
);

export default Features;

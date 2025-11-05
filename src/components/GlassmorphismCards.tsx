import React from 'react';
import PlayerCard from './cards/PlayerCard';
import HostCard from './cards/HostCard';

export default function GlassmorphismCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <PlayerCard />
      <HostCard />
    </div>
  );
}

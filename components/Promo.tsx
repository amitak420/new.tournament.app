import React from 'react';

const Promo: React.FC = () => {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
      <PromoCard 
        icon="🎯"
        title="Get Early Access"
        description="Subscribe for beta tournaments & exclusive rewards"
        buttonText="Subscribe"
        inputType="email"
        inputPlaceholder="your email"
        gradient="from-blue-400/80 to-purple-500/80"
        glowClass="from-blue-500/40 to-purple-500/40"
      />
      <PromoCard 
        icon="🎁"
        title="Refer & Earn"
        description="Invite friends, earn bonus points for each join"
        buttonText="Copy"
        inputType="text"
        inputPlaceholder="Your referral code"
        inputValue="ESPUKI523"
        gradient="from-pink-400/80 to-orange-400/80"
        glowClass="from-pink-500/40 to-orange-500/40"
      />
    </div>
  );
};

interface PromoCardProps {
    icon: string;
    title: string;
    description: string;
    buttonText: string;
    inputType: string;
    inputPlaceholder: string;
    inputValue?: string;
    gradient: string;
    glowClass: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ icon, title, description, buttonText, inputType, inputPlaceholder, inputValue, gradient, glowClass }) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
    if (buttonText === "Copy" && input) {
      navigator.clipboard.writeText(input.value);
      alert("Referral code copied!");
    } else if (buttonText === "Subscribe" && input && input.value) {
      alert("Subscribed successfully!");
    }
  };
    
  return (
    <div className={`relative rounded-3xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-2xl overflow-hidden`}>
        <div className={`absolute -inset-24 bg-gradient-to-br ${glowClass} opacity-30 dark:opacity-50 blur-3xl animate-pulse`}></div>
        <div className="relative z-10">
            <h3 className="text-xl font-bold text-white/90 flex items-center justify-center gap-2">
                <span>{icon}</span>
                {title}
            </h3>
            <p className="mt-2 text-sm text-white/60">{description}</p>
            <form className="mt-6 flex gap-3">
                <input 
                type={inputType} 
                placeholder={inputPlaceholder}
                defaultValue={inputValue}
                readOnly={!!inputValue}
                className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-slate-400/80 outline-none transition-all focus:border-white/30 focus:ring-2 focus:ring-purple-500/50"
                />
                <button 
                    onClick={handleButtonClick}
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                >
                    {buttonText}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Promo;
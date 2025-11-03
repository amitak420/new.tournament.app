import React from 'react';

const Promo: React.FC = () => {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      <PromoCard 
        title="🎯 Get Early Access"
        description="Subscribe for beta tournaments & exclusive rewards"
        buttonText="Subscribe"
        inputType="email"
        inputPlaceholder="Your email"
        gradient="from-blue-500/20 to-purple-500/20"
        borderColor="border-blue-500/30"
      />
      <PromoCard 
        title="🎁 Refer & Earn"
        description="Invite friends, earn bonus points for each join"
        buttonText="Copy"
        inputType="text"
        inputPlaceholder="Your referral code"
        inputValue="ESPORTS25"
        gradient="from-red-500/20 to-orange-500/20"
        borderColor="border-orange-500/30"
      />
    </div>
  );
};

interface PromoCardProps {
    title: string;
    description: string;
    buttonText: string;
    inputType: string;
    inputPlaceholder: string;
    inputValue?: string;
    gradient: string;
    borderColor: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ title, description, buttonText, inputType, inputPlaceholder, inputValue, gradient, borderColor }) => {
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
    <div className={`rounded-2xl border p-5 text-center bg-gradient-to-br ${gradient} ${borderColor}`}>
      <h3 className="text-lg font-bold text-slate-100 light:text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-200/60">{description}</p>
      <form className="mt-4 flex gap-2">
        <input 
          type={inputType} 
          placeholder={inputPlaceholder}
          defaultValue={inputValue}
          readOnly={!!inputValue}
          className="flex-1 rounded-md border border-slate-400/20 bg-slate-900/50 px-3 py-1.5 text-sm text-white outline-none focus:border-blue-400"
        />
        <button 
            onClick={handleButtonClick}
            className="rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
            {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Promo;

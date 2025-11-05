import React from 'react';

interface CardButtonProps {
  text: string;
  variant: 'blue' | 'orange';
  onClick?: () => void;
}

export default function CardButton({ text, variant, onClick }: CardButtonProps) {
  const baseStyles = "w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";

  const variantStyles = {
    blue: "bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-blue-500/50 hover:shadow-2xl",
    orange: "bg-gradient-to-r from-orange-600 to-orange-400 hover:shadow-orange-500/50 hover:shadow-2xl"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {text}
    </button>
  );
}

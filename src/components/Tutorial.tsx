import React, { useState, useEffect, useLayoutEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from '../assets/icons/LucideIcons';

interface TutorialStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialProps {
  steps: TutorialStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ steps, currentStep, onNext, onPrev, onSkip }) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = steps[currentStep];

  useLayoutEffect(() => {
    const updatePosition = () => {
      try {
        const element = document.querySelector(step.target);
        if (element) {
          setTargetRect(element.getBoundingClientRect());
        } else {
          setTargetRect(null); // Target not found, maybe center the tooltip
        }
      } catch (e) {
        console.error("Failed to query selector:", step.target, e);
        setTargetRect(null);
      }
    };
    
    // Delay to allow animations to finish
    const timer = setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updatePosition);
    }
  }, [currentStep, step.target]);

  const getTooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const position = step.position || 'bottom';
    const offset = 16; // 1rem

    switch (position) {
      case 'top':
        return { bottom: `${window.innerHeight - targetRect.top + offset}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: `${targetRect.bottom + offset}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
      case 'left':
        return { top: `${targetRect.top + targetRect.height / 2}px`, right: `${window.innerWidth - targetRect.left + offset}px`, transform: 'translateY(-50%)' };
      case 'right':
        return { top: `${targetRect.top + targetRect.height / 2}px`, left: `${targetRect.right + offset}px`, transform: 'translateY(-50%)' };
      default:
        return { top: `${targetRect.bottom + offset}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
    }
  };

  const spotlightStyle: React.CSSProperties = targetRect ? {
      position: 'absolute',
      top: `${targetRect.top}px`,
      left: `${targetRect.left}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
      boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.7)`,
      transition: 'all 300ms ease-in-out',
      borderRadius: '1rem',
      pointerEvents: 'none'
  } : {
      display: 'none'
  };

  return (
    <div className="fixed inset-0 z-[100]" onClick={onSkip}>
      <div 
        className="absolute inset-0 bg-black/70 transition-opacity duration-300"
      ></div>
      <div style={spotlightStyle}></div>

      <div
        className="absolute w-72 max-w-[80vw] backdrop-blur-xl bg-slate-800/80 rounded-2xl border border-white/20 shadow-2xl p-5 text-white animate-fadeIn"
        style={{...getTooltipPosition(), transition: 'top 300ms ease-in-out, left 300ms ease-in-out, bottom 300ms ease-in-out, right 300ms ease-in-out'}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-300">{step.content}</p>
            </div>
             <button onClick={onSkip} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <X size={18} />
             </button>
        </div>
        
        <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-slate-400">{currentStep + 1} / {steps.length}</span>
            <div className="flex gap-2">
                {currentStep > 0 && (
                    <button onClick={onPrev} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                )}
                {currentStep < steps.length - 1 ? (
                    <button onClick={onNext} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity">
                        Next
                    </button>
                ) : (
                    <button onClick={onSkip} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition-opacity">
                        Got it!
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;

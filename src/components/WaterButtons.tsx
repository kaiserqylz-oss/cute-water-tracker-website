import React, { useState, useEffect } from 'react';
import { getRandomEncouragement } from '../data/encouragements';

interface WaterButtonsProps {
  onAddWater: (amount: number) => void;
}

const amounts = [
  { ml: 250, icon: '🥤', label: '+250ml' },
  { ml: 500, icon: '🫗', label: '+500ml' },
  { ml: 750, icon: '🍶', label: '+750ml' },
  { ml: 1000, icon: '🧴', label: '+1000ml' },
];

const WaterButtons: React.FC<WaterButtonsProps> = ({ onAddWater }) => {
  const [encouragement, setEncouragement] = useState<string | null>(null);
  const [ripple, setRipple] = useState<number | null>(null);

  useEffect(() => {
    if (encouragement) {
      const timer = setTimeout(() => setEncouragement(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [encouragement]);

  useEffect(() => {
    if (ripple !== null) {
      const timer = setTimeout(() => setRipple(null), 400);
      return () => clearTimeout(timer);
    }
  }, [ripple]);

  const handleAdd = (amount: number) => {
    onAddWater(amount);
    setEncouragement(getRandomEncouragement());
    setRipple(amount);
  };

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-lg font-semibold text-sky-700 mb-4 text-center">
        Add Water 💧
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {amounts.map(({ ml, icon, label }) => (
          <button
            key={ml}
            onClick={() => handleAdd(ml)}
            className={`
              water-btn relative overflow-hidden
              bg-white hover:bg-sky-50 
              border-2 border-sky-200 hover:border-sky-400
              rounded-2xl p-4 sm:p-5
              flex flex-col items-center justify-center gap-1
              shadow-sm hover:shadow-md
              active:bg-sky-100
              transition-all duration-200
              ${ripple === ml ? 'scale-95' : 'scale-100'}
            `}
          >
            <span className="text-2xl sm:text-3xl">{icon}</span>
            <span className="text-lg sm:text-xl font-bold text-sky-600">{label}</span>
          </button>
        ))}
      </div>

      {/* Encouragement Toast */}
      <div className="h-16 flex items-center justify-center mt-4">
        {encouragement && (
          <div className="encouragement-toast bg-white border border-sky-200 rounded-full px-6 py-3 shadow-lg">
            <p className="text-sky-600 font-semibold text-center text-sm sm:text-base">
              {encouragement}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterButtons;

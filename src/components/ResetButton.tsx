import React, { useState } from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const [confirming, setConfirming] = useState(false);

  const handleReset = () => {
    if (confirming) {
      onReset();
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <button
      onClick={handleReset}
      className={`
        w-full rounded-2xl py-3 px-6 font-semibold text-sm transition-all active:scale-95
        ${confirming
          ? 'bg-red-50 border-2 border-red-300 text-red-500 hover:bg-red-100'
          : 'bg-sky-50 border-2 border-sky-100 text-sky-400 hover:bg-sky-100 hover:text-sky-500'}
      `}
    >
      {confirming ? 'Tap again to confirm reset' : 'Reset today\'s intake 🔄'}
    </button>
  );
};

export default ResetButton;

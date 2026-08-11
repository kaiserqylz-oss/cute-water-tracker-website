import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  show: boolean;
  onDismiss: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      // Fire confetti multiple times for a nice effect
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#38bdf8', '#0ea5e9', '#3b82f6', '#60a5fa', '#93c5fd', '#f472b6', '#fbbf24'];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Initial big burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });

      frame();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onDismiss}
    >
      <div
        className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center shadow-2xl animate-celebrate"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl sm:text-7xl mb-4">🎉💧</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-3">
          You reached your goal today!
        </h2>
        <p className="text-lg text-sky-500 mb-2">
          🎉💧
        </p>
        <p className="text-sky-400 mb-6">
          So proud of you, baket ko! 💙
        </p>
        <button
          onClick={onDismiss}
          className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-full px-8 py-3 font-semibold text-lg shadow-lg active:scale-95 transition-all"
        >
          Thank you! 💙
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;

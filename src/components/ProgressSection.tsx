import React from 'react';

interface ProgressSectionProps {
  intake: number;
  goal: number;
  percentage: number;
  remaining: number;
  goalReached: boolean;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  intake,
  goal,
  percentage,
  remaining,
  goalReached,
}) => {
  const getProgressColor = () => {
    if (percentage >= 100) return 'from-emerald-400 to-emerald-500';
    if (percentage >= 75) return 'from-sky-400 to-blue-500';
    if (percentage >= 50) return 'from-sky-300 to-sky-500';
    return 'from-sky-200 to-sky-400';
  };

  const getProgressBg = () => {
    if (percentage >= 100) return 'bg-emerald-50';
    return 'bg-sky-50';
  };

  return (
    <div className="glass-card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-44 h-44 sm:w-52 sm:h-52">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="14"
            />
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke={goalReached ? '#34d399' : '#38bdf8'}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 85}`}
              strokeDashoffset={`${2 * Math.PI * 85 * (1 - percentage / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl sm:text-5xl font-bold ${goalReached ? 'text-emerald-500' : 'text-sky-600'}`}>
              {percentage}%
            </span>
            <span className="text-sm text-sky-400 mt-1">completed</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className={`${getProgressBg()} rounded-full h-4 mb-6 overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()} progress-bar-fill relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-sky-50 rounded-2xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-sky-600">{intake}ml</div>
          <div className="text-xs sm:text-sm text-sky-400 mt-1">Current Intake</div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">{goal}ml</div>
          <div className="text-xs sm:text-sm text-blue-400 mt-1">Daily Goal</div>
        </div>
        <div className="bg-sky-50 rounded-2xl p-4 text-center col-span-2">
          <div className={`text-2xl sm:text-3xl font-bold ${remaining === 0 ? 'text-emerald-500' : 'text-sky-500'}`}>
            {remaining === 0 ? '🎉 Goal reached!' : `${remaining}ml remaining`}
          </div>
          <div className="text-xs sm:text-sm text-sky-400 mt-1">
            {remaining === 0 ? 'You did it baket ko! 💙' : 'Keep drinking water 💧'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;

import React from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import ProgressSection from './components/ProgressSection';
import WaterButtons from './components/WaterButtons';
import GoalEditor from './components/GoalEditor';
import CelebrationModal from './components/CelebrationModal';
import ResetButton from './components/ResetButton';
import { useWaterTracker } from './hooks/useWaterTracker';

const App: React.FC = () => {
  const [state, actions] = useWaterTracker();

  return (
    <div className="min-h-screen pb-10">
      {/* Decorative background bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-200/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-8 w-14 h-14 bg-blue-200/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-96 left-1/4 w-10 h-10 bg-sky-300/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-sky-200/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-20 left-16 w-8 h-8 bg-blue-300/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* Welcome */}
        <WelcomeMessage />

        {/* Progress */}
        <div className="mt-6">
          <ProgressSection
            intake={state.intake}
            goal={state.goal}
            percentage={state.percentage}
            remaining={state.remaining}
            goalReached={state.goalReached}
          />
        </div>

        {/* Water Buttons */}
        <div className="mt-6">
          <WaterButtons onAddWater={actions.addWater} />
        </div>

        {/* Goal Editor */}
        <div className="mt-4">
          <GoalEditor goal={state.goal} onSetGoal={actions.setGoal} />
        </div>

        {/* Reset Button */}
        <div className="mt-6">
          <ResetButton onReset={actions.resetIntake} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sky-300 text-sm">
            Made with 💙 for you, baket ko
          </p>
          <p className="text-sky-200 text-xs mt-1">
            Stay hydrated! 💧
          </p>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        show={state.justReachedGoal}
        onDismiss={actions.dismissCelebration}
      />
    </div>
  );
};

export default App;

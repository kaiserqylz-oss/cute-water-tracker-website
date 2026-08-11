import React, { useState } from 'react';

interface GoalEditorProps {
  goal: number;
  onSetGoal: (goal: number) => void;
}

const presetGoals = [1500, 2000, 2500, 3000];

const GoalEditor: React.FC<GoalEditorProps> = ({ goal, onSetGoal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customGoal, setCustomGoal] = useState(String(goal));

  const handleSave = () => {
    const parsed = parseInt(customGoal, 10);
    if (parsed > 0 && parsed <= 10000) {
      onSetGoal(parsed);
      setIsEditing(false);
    }
  };

  const handlePreset = (preset: number) => {
    onSetGoal(preset);
    setCustomGoal(String(preset));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={() => {
            setCustomGoal(String(goal));
            setIsEditing(true);
          }}
          className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-sky-50/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <div className="text-sm text-sky-400">Daily Goal</div>
              <div className="text-xl font-bold text-sky-700">{goal}ml</div>
            </div>
          </div>
          <div className="text-sky-400 text-sm font-medium">
            Edit ✏️
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 animate-fade-in">
      <h3 className="text-lg font-semibold text-sky-700 mb-4 text-center">
        Set Daily Goal 🎯
      </h3>

      {/* Preset buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {presetGoals.map(preset => (
          <button
            key={preset}
            onClick={() => handlePreset(preset)}
            className={`
              rounded-xl py-2 px-1 text-sm font-semibold transition-all
              ${goal === preset 
                ? 'bg-sky-500 text-white shadow-md' 
                : 'bg-sky-50 text-sky-600 hover:bg-sky-100'}
            `}
          >
            {preset}ml
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="number"
            value={customGoal}
            onChange={e => setCustomGoal(e.target.value)}
            placeholder="Custom goal"
            min="100"
            max="10000"
            step="100"
            className="w-full rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none px-4 py-3 text-lg font-semibold text-sky-700 bg-white"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 text-sm font-medium">ml</span>
        </div>
        <button
          onClick={handleSave}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-5 py-3 font-semibold transition-colors shadow-md active:scale-95"
        >
          Save
        </button>
      </div>

      <button
        onClick={() => setIsEditing(false)}
        className="w-full mt-3 text-sky-400 text-sm font-medium hover:text-sky-600 transition-colors py-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default GoalEditor;

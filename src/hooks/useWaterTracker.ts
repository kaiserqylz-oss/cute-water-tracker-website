import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  INTAKE: 'water_intake',
  GOAL: 'water_goal',
  DATE: 'water_date',
  GOAL_REACHED: 'water_goal_reached',
};

const getTodayString = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const DEFAULT_GOAL = 2000;

export interface WaterTrackerState {
  intake: number;
  goal: number;
  percentage: number;
  remaining: number;
  goalReached: boolean;
  justReachedGoal: boolean;
}

export interface WaterTrackerActions {
  addWater: (amount: number) => void;
  setGoal: (goal: number) => void;
  resetIntake: () => void;
  dismissCelebration: () => void;
}

export function useWaterTracker(): [WaterTrackerState, WaterTrackerActions] {
  const [intake, setIntake] = useState<number>(() => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.DATE);
    const today = getTodayString();
    if (savedDate !== today) {
      localStorage.setItem(STORAGE_KEYS.DATE, today);
      localStorage.setItem(STORAGE_KEYS.INTAKE, '0');
      localStorage.setItem(STORAGE_KEYS.GOAL_REACHED, 'false');
      return 0;
    }
    return parseInt(localStorage.getItem(STORAGE_KEYS.INTAKE) || '0', 10);
  });

  const [goal, setGoalState] = useState<number>(() => {
    return parseInt(localStorage.getItem(STORAGE_KEYS.GOAL) || String(DEFAULT_GOAL), 10);
  });

  const [goalReached, setGoalReached] = useState<boolean>(() => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.DATE);
    const today = getTodayString();
    if (savedDate !== today) return false;
    return localStorage.getItem(STORAGE_KEYS.GOAL_REACHED) === 'true';
  });

  const [justReachedGoal, setJustReachedGoal] = useState(false);

  // Check for day change every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const savedDate = localStorage.getItem(STORAGE_KEYS.DATE);
      const today = getTodayString();
      if (savedDate !== today) {
        localStorage.setItem(STORAGE_KEYS.DATE, today);
        localStorage.setItem(STORAGE_KEYS.INTAKE, '0');
        localStorage.setItem(STORAGE_KEYS.GOAL_REACHED, 'false');
        setIntake(0);
        setGoalReached(false);
        setJustReachedGoal(false);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Persist intake
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTAKE, String(intake));
  }, [intake]);

  // Persist goal
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOAL, String(goal));
  }, [goal]);

  // Persist goal reached
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOAL_REACHED, String(goalReached));
  }, [goalReached]);

  const addWater = useCallback((amount: number) => {
    setIntake(prev => {
      const newIntake = prev + amount;
      if (newIntake >= goal && prev < goal) {
        setGoalReached(true);
        setJustReachedGoal(true);
      }
      return newIntake;
    });
  }, [goal]);

  const setGoal = useCallback((newGoal: number) => {
    if (newGoal > 0) {
      setGoalState(newGoal);
      // Recheck if goal is reached with new goal
      if (intake >= newGoal) {
        setGoalReached(true);
      } else {
        setGoalReached(false);
        setJustReachedGoal(false);
      }
    }
  }, [intake]);

  const resetIntake = useCallback(() => {
    setIntake(0);
    setGoalReached(false);
    setJustReachedGoal(false);
  }, []);

  const dismissCelebration = useCallback(() => {
    setJustReachedGoal(false);
  }, []);

  const percentage = goal > 0 ? Math.min(Math.round((intake / goal) * 100), 100) : 0;
  const remaining = Math.max(goal - intake, 0);

  return [
    { intake, goal, percentage, remaining, goalReached, justReachedGoal },
    { addWater, setGoal, resetIntake, dismissCelebration },
  ];
}

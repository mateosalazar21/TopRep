import { createContext, useContext, useState, ReactNode } from 'react';

// 🔹 Exportamos el tipo de goal_type para usarlo en otros archivos
export type GoalType = 'pr_levantamientos' | 'resistencia' | 'gimnasticos' | null;

interface GoalDraft {
  goal_type: 'pr_levantamientos' | 'resistencia' | 'gimnasticos' | null;

  // PR en levantamientos
  exercise?: 'snatch' | 'clean_and_jerk' | 'back_squat';
  current_pr_lb?: number;
  improvement_percent?: number;
  target_pr_lb?: number;
  recommended_weeks?: number;
  max_weeks?: number;
  target_date?: string; // Formato 'YYYY-MM-DD'

  // Tiempo en resistencia
  endurance_exercise?: 'run' | 'row' | 'assault_bike';
  current_time_sec?: number;
  target_time_sec?: number;
  level_target?: 'principiante' | 'intermedio' | 'avanzado';

  // Reps gimnásticos
  gymnastics_exercise?: 'pull_up' | 'push_up' | 'air_squat';
  current_reps_1min?: number;
  target_reps?: number;
}


interface GoalDraftContextType {
  goal: GoalDraft;
  setGoal: (goal: Partial<GoalDraft>) => void;
  clearGoal: () => void;
}

const GoalDraftContext = createContext<GoalDraftContextType | null>(null);

export function GoalDraftProvider({ children }: { children: ReactNode }) {
  const [goal, setGoalState] = useState<GoalDraft>({
    goal_type: null,
  });

  const setGoal = (updates: Partial<GoalDraft>) => {
    setGoalState((prev) => ({ ...prev, ...updates }));
  };

  const clearGoal = () => {
    setGoalState({
      goal_type: null,
    });
  };

  return (
    <GoalDraftContext.Provider value={{ goal, setGoal, clearGoal }}>
      {children}
    </GoalDraftContext.Provider>
  );
}

export function useGoalDraft() {
  const context = useContext(GoalDraftContext);
  if (!context) {
    throw new Error('useGoalDraft must be used within a GoalDraftProvider');
  }
  return context;
}

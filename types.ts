export type MuscleGroup = 'legs' | 'back' | 'chest' | 'shoulders' | 'arms' | 'core' | 'glutes' | 'full';

export interface Exercise {
  id: string;
  name: string;
  sets: string; // e.g., "3-4"
  reps: string; // e.g., "6-10"
  muscleGroup: MuscleGroup;
  notes?: string;
}

export interface DayRoutine {
  title: string;
  focus: string;
  exercises: Exercise[];
}

export interface WeekRoutine {
  id: 1 | 2;
  title: string;
  days: {
    [key: string]: DayRoutine; // Monday, Tuesday, etc.
  };
}

export interface ExerciseLog {
  date: string;
  exerciseId: string;
  setsCompleted: Array<{
    reps: number;
    weight: number;
  }>;
}

export interface InventoryItem {
  name: string;
}

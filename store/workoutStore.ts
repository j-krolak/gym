import { create } from "zustand";
import { exercises } from "~/lib/exercises";
import { Exercise } from "~/types/exercise";

type WorkoutStore = {
  exercises: Exercise[];
  addExercises: (exercise: Exercise[]) => void;
  removeExercises: (exercise: Exercise[]) => void;
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  exercises: [],
  addExercises: (exercises) =>
    set((state) => ({
      exercises: [...state.exercises, ...exercises],
    })),
  removeExercises: (exercises) =>
    set((state) => ({
      exercises: state.exercises.filter((val) => !exercises.includes(val)),
    })),
}));

import { Satellite } from "lucide-react-native";
import { create } from "zustand";
import { ExerciseCard } from "~/components/home/exercise-card";
import { exercises } from "~/lib/exercises";
import { swap } from "~/lib/utils";
import { Exercise, ExerciseLog } from "~/types/exercise";

type WorkoutStore = {
  exercises: ExerciseLog[];
  addExercises: (exercise: Exercise[]) => void;
  removeExercises: (exercise: Exercise[]) => void;
  addSet: (exercise: Exercise) => void;
  moveUpExercise: (exerciseIndex: number) => void;
  moveDownExercise: (exerciseIndex: number) => void;
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  exercises: [],
  addExercises: (exercises) =>
    set((state) => ({
      exercises: [
        ...state.exercises,
        ...exercises.map<ExerciseLog>((val) => ({
          exercise: val,
          sets: [],
        })),
      ],
    })),
  removeExercises: (exercises) =>
    set((state) => ({
      exercises: state.exercises.filter(
        (val) => !exercises.includes(val.exercise)
      ),
    })),
  addSet: (exercise) =>
    set((state) => ({
      exercises: state.exercises.map<ExerciseLog>((val) =>
        val.exercise === exercise
          ? {
              exercise: exercise,
              sets: [
                ...val.sets,
                {
                  reps: 0,
                  time: 0,
                  weight: 0,
                },
              ],
            }
          : val
      ),
    })),
  moveUpExercise: (exerciseIndex) =>
    set((state) => ({
      exercises: swap(state.exercises, exerciseIndex, exerciseIndex - 1),
    })),
  moveDownExercise: (exerciseIndex) =>
    set((state) => ({
      exercises: swap(state.exercises, exerciseIndex, exerciseIndex + 1),
    })),
}));

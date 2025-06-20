import AsyncStorage from "@react-native-async-storage/async-storage";
import { RawWorkoutStorage, Workout, WorkoutStorage } from "~/types/workout";
import { create } from "zustand";

type workoutsHistoryStore = {
  workoutsHistory: WorkoutStorage;
  addWorkout: (workout: Workout) => void;
  loadHistory: () => Promise<void>;
};

const WORKOUT_HISTORY_KEY = "workouts-history";

export const useWorkoutsHistoryStore = create<workoutsHistoryStore>((set) => ({
  workoutsHistory: [],
  addWorkout: (workout) =>
    set((state) => {
      const newWorkoutsHistory: WorkoutStorage = [...state.workoutsHistory, workout];

      AsyncStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(newWorkoutsHistory));

      return {
        workoutsHistory: newWorkoutsHistory,
      };
    }),
  loadHistory: async () => {
    const rawWorkoutsHistory = JSON.parse(
      (await AsyncStorage.getItem(WORKOUT_HISTORY_KEY)) || "[]",
    ) as RawWorkoutStorage;

    const workoutsHistory: WorkoutStorage = rawWorkoutsHistory.map((workout) => ({
      ...workout,
      date: new Date(workout.date),
    }));

    set((_) => ({
      workoutsHistory: workoutsHistory,
    }));
  },
}));

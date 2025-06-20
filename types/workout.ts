import { ExerciseLog } from "./exercise";

export type Workout = {
  date: Date;
  exercises: ExerciseLog[];
};

export type RawWorkout = Omit<Workout, "date"> & {
  date: string;
};

export type WorkoutStorage = Workout[];
export type RawWorkoutStorage = RawWorkout[];

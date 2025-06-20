export type FieldType = "time" | "weight" | "reps";

export type Exercise = {
  id: string;
  name: string;
  fields: Partial<Record<FieldType, boolean>>;
};

export type ExerciseSet = { [K in FieldType]: number } & {
  done: boolean;
};

export type ExerciseLog = {
  exercise: Exercise;
  sets: ExerciseSet[];
};

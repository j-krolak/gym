type FieldType = "time" | "weight" | "reps";

export type Exercise = {
  id: string;
  name: string;
  fields: Partial<Record<FieldType, boolean>>;
};

export type ExerciseLog = {
  exercise: Exercise;
  sets: { [K in FieldType]: number }[];
};

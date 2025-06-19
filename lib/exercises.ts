import { Exercise } from "~/types/exercise";

export const exercises: Exercise[] = [
  {
    id: "bench press",
    name: "Bench Press",
    fields: { weight: true, reps: true },
  },
  {
    id: "incline bench press",
    name: "Incline Bench Press",
    fields: { weight: true, reps: true },
  },
  {
    id: "decline bench press",
    name: "Decline Bench Press",
    fields: { weight: true, reps: true },
  },
  { id: "push up", name: "Push Up", fields: { time: true, reps: true } },
  { id: "pull up", name: "Pull Up", fields: { time: true, reps: true } },
  { id: "chin up", name: "Chin Up", fields: { time: true, reps: true } },
  {
    id: "barbell row",
    name: "Barbell Row",
    fields: { weight: true, reps: true },
  },
  {
    id: "lat pulldown",
    name: "Lat Pulldown",
    fields: { weight: true, reps: true },
  },
  { id: "deadlift", name: "Deadlift", fields: { weight: true, reps: true } },
  { id: "squat", name: "Squat", fields: { weight: true, reps: true } },
  { id: "leg press", name: "Leg Press", fields: { weight: true, reps: true } },
  { id: "lunges", name: "Lunges", fields: { time: true, reps: true } },
  {
    id: "calf raise",
    name: "Calf Raise",
    fields: { weight: true, reps: true },
  },
  {
    id: "bicep curl",
    name: "Bicep Curl",
    fields: { weight: true, reps: true },
  },
  {
    id: "hammer curl",
    name: "Hammer Curl",
    fields: { weight: true, reps: true },
  },
  { id: "tricep dip", name: "Tricep Dip", fields: { time: true, reps: true } },
  {
    id: "tricep pushdown",
    name: "Tricep Pushdown",
    fields: { weight: true, reps: true },
  },
  {
    id: "shoulder press",
    name: "Shoulder Press",
    fields: { weight: true, reps: true },
  },
  {
    id: "lateral raise",
    name: "Lateral Raise",
    fields: { weight: true, reps: true },
  },
  { id: "plank", name: "Plank", fields: { time: true } },
  { id: "crunch", name: "Crunch", fields: { time: true, reps: true } },
  {
    id: "russian twist",
    name: "Russian Twist",
    fields: { time: true, reps: true },
  },
  { id: "leg raise", name: "Leg Raise", fields: { time: true, reps: true } },
  {
    id: "mountain climber",
    name: "Mountain Climber",
    fields: { time: true, reps: true, weight: true },
  },
];

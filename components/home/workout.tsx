import { useNavigation } from "@react-navigation/native";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useWorkoutStore } from "../../store/workoutStore";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { ExerciseCard } from "./exercise-card";

export function Workout() {
  const navigator = useNavigation();
  const {
    exercises,
    moveDownExercise,
    moveUpExercise,
    removeExercises,
    clear: clearWorkoutStorage,
  } = useWorkoutStore();
  const { addWorkout } = useWorkoutsHistoryStore();

  const handleEndWorkout = async () => {
    addWorkout({
      date: new Date(),
      exercises: exercises,
    });
    clearWorkoutStorage();
  };

  return (
    <>
      <ScrollView className="flex-1 bg-secondary/30" contentContainerClassName="py-6">
        <View className="flex gap-5 p-2">
          {exercises.map((exercise, i) => (
            <ExerciseCard
              exerciseLog={exercise}
              key={exercise.exercise.id}
              onMoveDown={
                exercises.length > 1 && i < exercises.length - 1
                  ? moveDownExercise.bind(null, i)
                  : undefined
              }
              onMoveUp={
                exercises.length > 1 && i > 0 ? moveUpExercise.bind(null, i) : undefined
              }
              onDelete={removeExercises.bind(null, [exercise.exercise])}
            />
          ))}
        </View>
        <View className="mt-6 gap-6 px-6">
          <Button onPress={() => navigator.navigate("Add exercises")}>
            <Text>Add exercises</Text>
          </Button>
          {exercises.length > 0 && (
            <Button variant={"outline"} onPress={handleEndWorkout}>
              <Text>End workout</Text>
            </Button>
          )}
        </View>
      </ScrollView>
      {/* {showDeleteDialog && <DeleteExerciseDialog />} */}
    </>
  );
}

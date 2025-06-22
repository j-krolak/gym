import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { WorkoutScreenParamList } from "~/types/navigation";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useWorkoutStore } from "../../store/workoutStore";
import { ExerciseCard } from "../shared/exercise-card";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { AnimatedChevronDown } from "./animated-chevron-down";

type WorkoutProps = StackScreenProps<WorkoutScreenParamList, "Workout">;

export const Workout: React.FC<WorkoutProps> = ({ navigation }) => {
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
    <View className="h-screen">
      <ScrollView
        contentContainerClassName="py-6 min-h-full"
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        <View className="flex gap-3 px-3">
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

        {exercises.length === 0 && (
          <View className="flex h-1/3 items-center justify-end gap-2 py-2">
            <Text className="text-3xl font-semibold">Start your workout</Text>
            <AnimatedChevronDown />
          </View>
        )}
        <View className="mt-6 gap-6 px-6">
          <Button onPress={() => navigation.navigate("AddExercise")}>
            <Text>Add exercises</Text>
          </Button>
          {exercises.length > 0 && (
            <Button variant={"outline"} onPress={handleEndWorkout}>
              <Text>End workout</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

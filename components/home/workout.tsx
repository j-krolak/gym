import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useNavigation } from "@react-navigation/native";
import { useWorkoutStore } from "../../store/workoutStore";
import { ExerciseCard } from "./exercise-card";
import { Exercise } from "~/types/exercise";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export function Workout() {
  const navigator = useNavigation();
  const { exercises, moveDownExercise, moveUpExercise, removeExercises } =
    useWorkoutStore();

  return (
    <>
      <ScrollView
        className="bg-secondary/30 flex-1"
        contentContainerClassName="py-6"
      >
        <View className="p-2 flex gap-5">
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
                exercises.length > 1 && i > 0
                  ? moveUpExercise.bind(null, i)
                  : undefined
              }
              onDelete={removeExercises.bind(null, [exercise.exercise])}
            />
          ))}
        </View>
        <View className="px-6 mt-6">
          <Button onPress={() => navigator.navigate("Add exercises")}>
            <Text>Add exercises</Text>
          </Button>
        </View>
      </ScrollView>
      {/* {showDeleteDialog && <DeleteExerciseDialog />} */}
    </>
  );
}

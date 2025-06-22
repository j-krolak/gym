import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { HistoryScreenParamList } from "~/types/navigation";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ExerciseCard } from "../shared/exercise-card";

type HistoryDetailsProps = StackScreenProps<HistoryScreenParamList, "HistoryDetails">;

export const HistoryDetails: React.FC<HistoryDetailsProps> = ({ route }) => {
  const { workoutsHistory } = useWorkoutsHistoryStore();
  const { workoutIndex } = route.params;

  const workout = workoutsHistory[workoutIndex];

  return (
    <ScrollView className="flex-1">
      <View className="flex gap-4 pb-52 pt-6">
        <View className="flex gap-3 px-3">
          {workout.exercises.map((exercise, i) => (
            <ExerciseCard exerciseLog={exercise} key={i} disabled />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

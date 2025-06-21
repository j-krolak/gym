import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "~/components/ui/text";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { HistoryScreenParamList } from "~/types/navigation";
import { View } from "react-native";

type HistoryDetailsProps = StackScreenProps<HistoryScreenParamList, "HistoryDetails">;

export const HistoryDetails: React.FC<HistoryDetailsProps> = ({ route }) => {
  const { workoutsHistory } = useWorkoutsHistoryStore();
  const { workoutIndex } = route.params;

  const workout = workoutsHistory[workoutIndex];

  return (
    <View className="flex flex-1 gap-4 bg-secondary/30 p-6">
      <Text>{workout.date.toString()}</Text>
    </View>
  );
};

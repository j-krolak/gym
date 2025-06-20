import { Text } from "~/components/ui/text";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { View } from "react-native";

export default function WorkoutsDetails({ route }) {
  const { workoutsHistory } = useWorkoutsHistoryStore();
  const { workoutIndex } = route?.params as { workoutIndex: number };
  const workout = workoutsHistory[workoutIndex];

  console.log(workout);
  return (
    <View className="flex flex-1 gap-4 bg-secondary/30 p-6">
      <Text>{workout.date.toString()}</Text>
    </View>
  );
}

import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { View } from "react-native";

export default function HistoryScreen() {
  const { workoutsHistory, loadHistory } = useWorkoutsHistoryStore();

  useEffect(() => {
    loadHistory();
  }, []);
  console.log(workoutsHistory);

  return (
    <View className="flex flex-1 gap-4 bg-secondary/30 p-6">
      {workoutsHistory?.map((workout) => (
        <Card key={workout.date.toString()}>
          <CardHeader>
            <Text>{workout.date.toString()}</Text>
          </CardHeader>
          <CardContent>
            {workout.exercises.map((exercise) => (
              <Text key={exercise.exercise.id}>{exercise.exercise.name}</Text>
            ))}
          </CardContent>
        </Card>
      ))}
    </View>
  );
}

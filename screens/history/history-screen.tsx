import React, { useEffect, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { HistoryScreenParamList } from "~/types/navigation";
import { Dot } from "lucide-react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type HistoryScreenProps = StackScreenProps<HistoryScreenParamList, "History">;

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { workoutsHistory, loadHistory } = useWorkoutsHistoryStore();
  const sortedWorkoutsHistory = useMemo(
    () => workoutsHistory.sort((a, b) => (a.date < b.date ? 1 : -1)),
    [workoutsHistory],
  );

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 150 }} className="flex-1">
      <View className="flex gap-4 p-4">
        {sortedWorkoutsHistory?.map((workout, i) => (
          <Card key={workout.date.toString()}>
            <CardHeader>
              <View className="flex flex-row items-baseline justify-between">
                <View className="flex flex-row gap-2">
                  <CardTitle>
                    {workout.date.toLocaleDateString("en-GB", {
                      weekday: "long",
                    })}
                  </CardTitle>
                  <View className="flex flex-row">
                    <Ionicons name="flame" color={"red"} size={20} />
                    <Text>
                      {workout.exercises.reduce(
                        (accu, val) => accu + val.sets.length,
                        0,
                      )}
                    </Text>
                  </View>
                </View>

                <Text className="text-muted-foreground">
                  {workout.date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </CardHeader>
            <CardContent>
              <View className="flex w-full flex-row flex-wrap">
                {workout.exercises.map((exercise) => (
                  <View key={exercise.exercise.id} className="w-1/2">
                    <View className="m-2 flex flex-row">
                      <Dot color={"white"} />
                      <Text>{exercise.exercise.name}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onPress={() =>
                  navigation.navigate("HistoryDetails", { workoutIndex: i })
                }
                className="flex flex-row gap-2"
              >
                <Text>View details</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

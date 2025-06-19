import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useNavigation } from "@react-navigation/native";
import { useWorkoutStore } from "../../store/workoutStore";

export function Workout() {
  const navigator = useNavigation();
  const { exercises } = useWorkoutStore();
  console.log(exercises);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-2">
          {exercises.map((exercise) => (
            <View key={exercise.id}>
              <Text>{exercise.name}</Text>
            </View>
          ))}
        </View>
        <View className="px-6">
          <Button onPress={() => navigator.navigate("Add exercises")}>
            <Text>Add exercises</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

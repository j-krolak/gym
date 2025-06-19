import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { createStackNavigator } from "@react-navigation/stack";
import { Workout } from "~/components/home/workout";
import { AddExercises } from "~/components/home/add-exercise";

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="Add exercises" component={AddExercises} />
    </Stack.Navigator>
  );
}

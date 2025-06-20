import { createStackNavigator } from "@react-navigation/stack";
import { AddExercises } from "~/components/home/add-exercise";
import { Workout } from "~/components/home/workout";

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="Add exercises" component={AddExercises} />
    </Stack.Navigator>
  );
}

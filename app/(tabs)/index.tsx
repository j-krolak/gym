import { createStackNavigator } from "@react-navigation/stack";
import { AddExercises } from "~/components/home/add-exercise";
import { Workout } from "~/components/home/workout";
import { WorkoutScreenParamList } from "~/types/navigation";

const Stack = createStackNavigator<WorkoutScreenParamList>();

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen
        name="AddExercise"
        options={{ headerTitle: () => null }}
        component={AddExercises}
      />
    </Stack.Navigator>
  );
}

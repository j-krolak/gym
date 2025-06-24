import { createStackNavigator } from "@react-navigation/stack";
import { AddExercisesScreen } from "~/screens/workout/add-exercise-screen";
import { WorkoutScreen } from "~/screens/workout/workout-screen";
import { WorkoutScreenParamList } from "~/types/navigation";

const Stack = createStackNavigator<WorkoutScreenParamList>();

export default function WorkoutTab() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen
        name="AddExercise"
        options={{ headerTitle: () => null }}
        component={AddExercisesScreen}
      />
    </Stack.Navigator>
  );
}

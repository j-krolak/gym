import { createStackNavigator } from "@react-navigation/stack";
import WorkoutsDetails from "~/components/history/workout-details";
import WorkoutsHistory from "~/components/history/workouts-history";

const Stack = createStackNavigator();

export default function HistoryScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="History" component={WorkoutsHistory} />
      <Stack.Screen name="Workout details" component={WorkoutsDetails} />
    </Stack.Navigator>
  );
}

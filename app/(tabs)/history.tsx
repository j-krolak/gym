import { createStackNavigator } from "@react-navigation/stack";
import { HistoryDetails } from "~/components/history/history-details";
import { WorkoutsHistory } from "~/components/history/workouts-history";
import { HistoryScreenParamList } from "~/types/navigation";

const Stack = createStackNavigator<HistoryScreenParamList>();

export default function HistoryScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="History" component={WorkoutsHistory} />
      <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
    </Stack.Navigator>
  );
}

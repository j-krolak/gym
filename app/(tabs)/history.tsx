import { createStackNavigator } from "@react-navigation/stack";
import { HistoryDetailsScreen } from "~/screens/history/history-details-screen";
import { HistoryScreen } from "~/screens/history/history-screen";
import { HistoryScreenParamList } from "~/types/navigation";

const Stack = createStackNavigator<HistoryScreenParamList>();

export default function HistoryTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="HistoryDetails"
        options={{ title: "" }}
        component={HistoryDetailsScreen}
      />
    </Stack.Navigator>
  );
}

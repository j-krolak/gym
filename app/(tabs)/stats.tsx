import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatsScreen } from "~/screens/stats/stats-screen";

const Stack = createStackNavigator();

export default function StatsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stats" component={StatsScreen} />
    </Stack.Navigator>
  );
}

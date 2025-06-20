import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Stats } from "~/components/stats/stats";

const Stack = createStackNavigator();

export default function StatsScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Stats" component={Stats} />
    </Stack.Navigator>
  );
}

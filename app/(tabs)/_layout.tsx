import { useTheme } from "@react-navigation/native";
import { TabBar } from "~/components/TabBar";
import { Tabs } from "expo-router";
import {
  ChartNoAxesColumn,
  Dumbbell,
  Flame,
  History,
  Ruler,
} from "lucide-react-native";

export const ACTIVE_TABS_COLOR = "#FF4D4D";

export default function RootLayout() {
  const theme = useTheme();
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarInactiveTintColor: theme.colors.text,
        tabBarActiveTintColor: ACTIVE_TABS_COLOR,

        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "stats":
              return (
                <ChartNoAxesColumn
                  color={focused ? ACTIVE_TABS_COLOR : theme.colors.text}
                />
              );
            case "history":
              return (
                <History color={focused ? ACTIVE_TABS_COLOR : theme.colors.text} />
              );
            case "index":
              return <Flame color={focused ? ACTIVE_TABS_COLOR : theme.colors.text} />;
            case "exercises":
              return (
                <Dumbbell color={focused ? ACTIVE_TABS_COLOR : theme.colors.text} />
              );
            case "measure":
              return <Ruler color={focused ? ACTIVE_TABS_COLOR : theme.colors.text} />;
          }
        },
        tabBarShowLabel: false,
      })}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Workout",
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
        }}
      />
      <Tabs.Screen
        name="measure"
        options={{
          title: "Measure",
        }}
      />
    </Tabs>
  );
}

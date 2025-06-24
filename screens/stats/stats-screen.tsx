import { WorkoutsHeatmap } from "~/components/stats/workouts-heatmap";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const StatsScreen = () => {
  return (
    <ScrollView>
      <View className="flex flex-1">
        <WorkoutsHeatmap />
      </View>
    </ScrollView>
  );
};

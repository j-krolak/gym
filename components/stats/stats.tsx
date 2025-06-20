import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { WorkoutsHeatmap } from "./workouts-heatmap";

export const Stats = () => {
  return (
    <ScrollView>
      <View className="flex flex-1">
        <WorkoutsHeatmap />
      </View>
    </ScrollView>
  );
};

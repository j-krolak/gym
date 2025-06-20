import { useEffect, useMemo } from "react";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { View } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const WorkoutsHeatmap = () => {
  const { workoutsHistory, loadHistory } = useWorkoutsHistoryStore();
  useEffect(() => {
    loadHistory();
  }, []);

  const getHeatmapData = () => {
    const workouts = workoutsHistory.map((workout) => ({
      date: workout.date.toISOString().slice(0, 10),
      count: workout.exercises.reduce((accu, exer) => accu + exer.sets.length, 0),
    }));

    return workouts.reduce<{ date: string; count: number }[]>((accu, workout) => {
      const foundedIndex = accu.findIndex((x) => x.date === workout.date);
      if (foundedIndex === -1) {
        return [
          ...accu,
          {
            date: workout.date,
            count: workout.count,
          },
        ];
      }

      accu[foundedIndex].count = accu[foundedIndex].count + workout.count;
      return accu;
    }, []);
  };

  const commitsData = useMemo(getHeatmapData, [workoutsHistory, getHeatmapData]);

  console.log(commitsData);

  return (
    <View>
      <ContributionGraph
        values={commitsData}
        endDate={new Date("2025-06-30")}
        numDays={100}
        width={500}
        height={220}
        tooltipDataAttrs={(val) => {
          console.log(val);
          return {};
        }}
        chartConfig={chartConfig}
      />
    </View>
  );
};

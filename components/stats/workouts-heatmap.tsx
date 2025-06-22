import { useEffect, useMemo } from "react";
import { useWorkoutsHistoryStore } from "~/store/workout-history-store";
import { View } from "react-native";

import HeatmapGraph from "../shared/HeatmapGraph";

const mockData = [
  { date: "2025-05-25", count: 3 },
  { date: "2025-05-26", count: 7 },
  { date: "2025-05-27", count: 0 },
  { date: "2025-05-28", count: 11 },
  { date: "2025-05-29", count: 2 },
  { date: "2025-05-30", count: 8 },
  { date: "2025-05-31", count: 1 },
  { date: "2025-06-01", count: 6 },
  { date: "2025-06-02", count: 10 },
  { date: "2025-06-03", count: 4 },
  { date: "2025-06-04", count: 12 },
  { date: "2025-06-05", count: 5 },
  { date: "2025-06-06", count: 9 },
  { date: "2025-06-07", count: 0 },
  { date: "2025-06-08", count: 7 },
  { date: "2025-06-09", count: 3 },
  { date: "2025-06-10", count: 11 },
  { date: "2025-06-11", count: 2 },
  { date: "2025-06-12", count: 8 },
  { date: "2025-06-13", count: 1 },
  { date: "2025-06-14", count: 6 },
  { date: "2025-06-15", count: 10 },
  { date: "2025-06-16", count: 20 },
  { date: "2025-06-17", count: 12 },
  { date: "2025-06-18", count: 5 },
  { date: "2025-06-19", count: 25 },
  { date: "2025-06-20", count: 0 },
  { date: "2025-06-21", count: 7 },
];

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

  return (
    <View>
      <View className="flex flex-row flex-wrap"></View>
      <HeatmapGraph data={mockData} endDate={new Date()} className="mt-5" />
    </View>
  );
};

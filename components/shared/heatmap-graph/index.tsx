import React from "react";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { View } from "react-native";

type HeatmapGraphProps = {
  data: { date: Date | string; count: number }[];
  endDate: Date;
  weeks?: number;
  className?: string;
};

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const getColorOfPoint = (counter: number): string => {
  if (counter > 15) return "dark:bg-green-500 bg-green-600";
  if (counter > 10) return "dark:bg-green-600 bg-green-500";
  if (counter > 5) return "dark:bg-green-700 bg-green-400";
  if (counter) return "dark:bg-green-800 bg-green-300";
  return "bg-secondary";
};

const HeatmapGraph: React.FC<HeatmapGraphProps> = ({
  data,
  endDate,
  weeks = 24,
  className,
}) => {
  const formattedData = data.map((val) => ({
    date:
      typeof val.date === "string" ? val.date : val.date.toISOString().split("T")[0],
    count: val.count,
  }));

  const weekDayOfEndDate = endDate.getDay();

  const a = (endDate.getDate() - weekDayOfEndDate - 1) / 7;
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (weeks - 1) * 7 - weekDayOfEndDate);

  return (
    <View className={cn("flex items-end self-center", className)}>
      <View className="flex flex-row gap-1">
        {Array.from({ length: Math.floor(weeks / 2) }).map((_, week) => {
          const currentDate = new Date(startDate);
          currentDate.setDate(currentDate.getDate() + week * 2 * 7);
          const monthLabel =
            currentDate.getDate() <= 14
              ? currentDate.toLocaleDateString("en-GB", {
                  month: "short",
                })
              : "";
          return (
            <View className="h-5 w-7" key={week}>
              <Text className="text-left text-xs">{monthLabel}</Text>
            </View>
          );
        })}
      </View>
      <View className={cn("flex flex-row gap-1")}>
        <View className="flex flex-col gap-1">
          {["Mon", "Wed", "Fri"].map((day, i) => (
            <View className="flex h-7 justify-end" key={`day-label-${i}`}>
              <Text className="text-xs">{day}</Text>
            </View>
          ))}
        </View>
        {Array.from({ length: weeks }).map((_, week) => (
          <View className="flex flex-col gap-1" key={week}>
            {Array.from({ length: week === weeks - 1 ? weekDayOfEndDate + 1 : 7 }).map(
              (_, day) => {
                const currentDay = new Date(startDate);
                currentDay.setDate(currentDay.getDate() + week * 7 + day);
                const currentDayFormatted = formatDate(currentDay);

                const counter = formattedData.reduce(
                  (accu, val) =>
                    val.date === currentDayFormatted ? val.count + accu : accu,
                  0,
                );
                console.log(currentDayFormatted);

                return (
                  <View
                    className={cn("h-3 w-3 rounded-full", getColorOfPoint(counter))}
                    key={day}
                  />
                );
              },
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default HeatmapGraph;

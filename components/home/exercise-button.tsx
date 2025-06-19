import React from "react";
import { View, ViewProps } from "react-native";
import { Exercise } from "~/types/exercise";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";

type ExerciseButtonProps = ViewProps & {
  exercise: Exercise;
};

export const ExerciseButton: React.FC<ExerciseButtonProps> = ({
  exercise,
  className,
  ...props
}) => {
  return (
    <View
      className={cn("w-full border-b border-secondary py-4 px-2", className)}
      {...props}
    >
      <Text className="text-xl font-semibold">{exercise.name}</Text>
    </View>
  );
};

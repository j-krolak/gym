import React from "react";
import { cn } from "~/lib/utils";
import { Exercise } from "~/types/exercise";
import { View, ViewProps } from "react-native";

import { Checkbox } from "../ui/checkbox";
import { Text } from "../ui/text";

type ExerciseButtonProps = ViewProps & {
  exercise: Exercise;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
  disabled: boolean;
};

export const ExerciseButton: React.FC<ExerciseButtonProps> = ({
  exercise,
  onCheckedChange,
  checked,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <View
      className={cn(
        "flex w-full flex-row items-center justify-between border-b border-secondary px-2 py-4",
        className,
      )}
      {...props}
      onTouchEnd={() => !disabled && onCheckedChange(!checked)}
    >
      <Text className="text-xl font-semibold">{exercise.name}</Text>
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </View>
  );
};

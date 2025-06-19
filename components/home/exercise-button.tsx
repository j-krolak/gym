import React, { useEffect, useState } from "react";
import { View, ViewProps } from "react-native";
import { Exercise } from "~/types/exercise";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

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
        "w-full border-b border-secondary py-4 px-2 flex flex-row justify-between items-center",
        className
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

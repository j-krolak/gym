import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { exercises } from "~/lib/exercises";

export const GymLogForm: React.FC = () => {
  const route = useRoute();
  const { exercise } = route.params as { exercise: string };
  return (
    <View className="flex-1">
      <Text>{exercise}</Text>
    </View>
  );
};

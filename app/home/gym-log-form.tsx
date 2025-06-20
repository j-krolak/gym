import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text } from "~/components/ui/text";
import { View } from "react-native";

export const GymLogForm: React.FC = () => {
  const route = useRoute();
  const { exercise } = route.params as { exercise: string };
  return (
    <View className="flex-1">
      <Text>{exercise}</Text>
    </View>
  );
};

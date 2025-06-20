import React, { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

type LinearGradientBacgroundProps = PropsWithChildren;

export const LinearGradientBacground: React.FC<LinearGradientBacgroundProps> = ({
  children,
}) => {
  return (
    <LinearGradient
      colors={["rgba(39, 39, 42, 0.4)", "rgba(39, 39, 42, 0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0.5 }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <View className="flex-1 pt-24">{children}</View>
    </LinearGradient>
  );
};

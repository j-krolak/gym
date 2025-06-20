import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react-native";
import { Animated } from "react-native";

export const AnimatedChevronDown = () => {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: +8,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounce]);

  return (
    <Animated.View style={[{ transform: [{ translateY: bounce }] }]}>
      <ChevronDown color={"white"} />
    </Animated.View>
  );
};

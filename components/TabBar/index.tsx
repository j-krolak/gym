import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "~/lib/useColorScheme";
import { BlurView } from "expo-blur";

import { TabBarButton } from "./TabBarButton";

export const TabBar: React.FC<BottomTabBarProps> = ({
  descriptors,
  insets,
  navigation,
  state,
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const bluerViewTint: "dark" | "light" = isDarkColorScheme ? "dark" : "light";

  return (
    <BlurView
      intensity={90}
      tint={bluerViewTint}
      className="absolute bottom-16 flex flex-row self-center overflow-hidden rounded-full border
        border-border"
      experimentalBlurMethod="dimezisBlurView"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            onPress={onPress}
            key={route.name}
            icon={options.tabBarIcon}
            isFocused={isFocused}
          />
        );
      })}
    </BlurView>
  );
};

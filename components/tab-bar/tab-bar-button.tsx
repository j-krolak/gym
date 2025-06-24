import { cn } from "~/lib/utils";
import { Pressable, PressableProps, View } from "react-native";

export type TabBarButtonProps = PressableProps & {
  isFocused: boolean;
  icon:
    | ((props: { focused: boolean; color: string; size: number }) => React.ReactNode)
    | undefined;
};

export const TabBarButton: React.FC<TabBarButtonProps> = ({
  icon,
  isFocused,
  ...props
}) => {
  const Icon = icon;
  return (
    <Pressable {...props}>
      <View className={cn("flex w-full justify-center gap-0 px-5 py-5")}>
        <View>{Icon && <Icon focused={isFocused} color={"white"} size={20} />}</View>
      </View>
    </Pressable>
  );
};

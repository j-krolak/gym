import { ThemeToggle } from "~/components/theme-toggle";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeasureTab() {
  return (
    <SafeAreaView>
      <View className="flex p-6">
        <ThemeToggle />
      </View>
    </SafeAreaView>
  );
}

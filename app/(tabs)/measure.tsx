import { ThemeToggle } from "~/components/ThemeToggle";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeasureScreen() {
  return (
    <SafeAreaView>
      <View className="flex p-6">
        <ThemeToggle />
      </View>
    </SafeAreaView>
  );
}

import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useNavigation } from "@react-navigation/native";

export function Workout() {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-6">
          <Button onPress={() => navigator.navigate("Add exercise")}>
            <Text>Add exercise</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Text } from "../ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { exercises } from "~/lib/exercises";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react-native";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseButton } from "./exercise-button";

export const AddExercise: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <ScrollView>
      <View className="p-6">
        <Input
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
      </View>
      <View className="p-2 rounded-md flex items-center flex-1">
        {exercises.map((exercise) => (
          <ExerciseButton exercise={exercise} />
        ))}
        {/*         
        <View>
          <Label nativeID="Exercise">Select exercise to track</Label>
          <Select
            nativeID="Exercise"
            defaultValue={{
              value: exercises[0].name,
              label: exercises[0].name,
            }}
            className="w-full"
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Select a fruit"
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-[250px]">
              <SelectGroup>
                {exercises.map((exercise, i) => (
                  <SelectItem
                    label={exercise.name}
                    key={i}
                    value={exercise.name}
                  >
                    {exercise.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
        <View className="">
          <Button
            className="flex flex-row gap-2"
            onPress={() => navigation.navigate("Add Exercise")}
          >
            <Text>Start</Text>
          </Button>
        </View> */}
      </View>
    </ScrollView>
  );
};

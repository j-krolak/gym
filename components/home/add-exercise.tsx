import React, { memo, useMemo, useState } from "react";
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
import { FlatList, View } from "react-native";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { exercises } from "~/lib/exercises";
import { Button } from "../ui/button";
import { ArrowRight, Plus } from "lucide-react-native";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseButton } from "./exercise-button";
import { extendTailwindMerge } from "tailwind-merge";
import { Exercise } from "~/types/exercise";
import { enableFreeze } from "react-native-screens";
import { cn } from "~/lib/utils";
import { useWorkoutStore } from "~/store/workoutStore";

type ExerciseOption = {
  exercise: Exercise;
  checked: boolean;
  disabled: boolean;
};

export const AddExercises: React.FC = () => {
  const { addExercises, exercises: exercisesStore } = useWorkoutStore();
  const [search, setSearch] = useState<string>("");
  const navigation = useNavigation();
  const [exerciseOptions, setExerciseOptions] = useState<ExerciseOption[]>(
    exercises.map((exercise) => ({
      exercise: exercise,
      checked: exercisesStore.includes(exercise),
      disabled: exercisesStore.includes(exercise),
    }))
  );

  const searchedExercises = useMemo(
    () =>
      search === ""
        ? exercises
        : exercises.filter((exercise) =>
            exercise.name
              .replaceAll(" ", "")
              .toLowerCase()
              .includes(search.toLocaleLowerCase().replaceAll(" ", ""))
          ),
    [search]
  );

  const handleExerciseCheck = (exercise: Exercise, checked: boolean) => {
    setExerciseOptions((prevExercises) =>
      prevExercises.map((prev) =>
        prev.exercise === exercise
          ? { exercise: exercise, checked: checked, disabled: prev.disabled }
          : prev
      )
    );
  };

  const handleAddExercises = () => {
    addExercises(
      exerciseOptions
        .filter(
          (exercise) =>
            exercise.checked === true &&
            !exercisesStore.includes(exercise.exercise)
        )
        .map((val) => val.exercise)
    );
    navigation.goBack();
  };

  return (
    <View className="flex-1">
      <View
        className={cn(
          "absolute z-50 bottom-5 right-5 ",
          !exerciseOptions.some((val) => val.checked) && "invisible"
        )}
      >
        <Button onPress={handleAddExercises}>
          <Text>Add</Text>
        </Button>
      </View>
      <View className="p-6">
        <Input
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
      </View>
      <View className="p-2  flex-1 w-full ">
        <FlatList
          className="w-full"
          contentContainerClassName="pb-24"
          data={exerciseOptions.filter(({ exercise }) =>
            searchedExercises.includes(exercise)
          )}
          keyExtractor={({ exercise }) => exercise.id}
          renderItem={({ item }) => (
            <ExerciseButton
              exercise={item.exercise}
              key={item.exercise.id}
              onCheckedChange={handleExerciseCheck.bind(null, item.exercise)}
              checked={item.checked}
              disabled={item.disabled}
            />
          )}
        />
      </View>
    </View>
  );
};

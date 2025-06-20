import React, { useMemo, useState } from "react";
import { exercises } from "~/lib/exercises";
import { cn } from "~/lib/utils";
import { useWorkoutStore } from "~/store/workoutStore";
import { Exercise } from "~/types/exercise";
import { useNavigation } from "expo-router";
import { FlatList, View } from "react-native";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { ExerciseButton } from "./exercise-button";

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
      checked: exercisesStore.some((val) => val.exercise.id === exercise.id),
      disabled: exercisesStore.some((val) => val.exercise.id === exercise.id),
    })),
  );

  const searchedExercises = useMemo(
    () =>
      search === ""
        ? exercises
        : exercises.filter((exercise) =>
            exercise.name
              .replaceAll(" ", "")
              .toLowerCase()
              .includes(search.toLocaleLowerCase().replaceAll(" ", "")),
          ),
    [search],
  );

  const handleExerciseCheck = (exercise: Exercise, checked: boolean) => {
    setExerciseOptions((prevExercises) =>
      prevExercises.map((prev) =>
        prev.exercise === exercise
          ? { exercise: exercise, checked: checked, disabled: prev.disabled }
          : prev,
      ),
    );
  };

  const handleAddExercises = () => {
    addExercises(
      exerciseOptions
        .filter(
          (exercise) =>
            exercise.checked === true &&
            !exercisesStore.some((val) => val.exercise === exercise.exercise),
        )
        .map((val) => val.exercise),
    );
    navigation.goBack();
  };

  return (
    <View className="flex-1">
      <View
        className={cn(
          "absolute bottom-5 right-5 z-50",
          !exerciseOptions.some((val) => val.checked && !val.disabled) && "invisible",
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
      <View className="w-full flex-1 p-2">
        <FlatList
          className="w-full"
          contentContainerClassName="pb-24"
          data={exerciseOptions.filter(({ exercise }) =>
            searchedExercises.includes(exercise),
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

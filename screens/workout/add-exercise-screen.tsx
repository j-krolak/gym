import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { exercises } from "~/lib/exercises";
import { cn } from "~/lib/utils";
import { useWorkoutStore } from "~/store/workoutStore";
import { Exercise } from "~/types/exercise";
import { WorkoutScreenParamList } from "~/types/navigation";
import { Plus } from "lucide-react-native";
import { FlatList, Pressable, View } from "react-native";

import { SearchInput } from "../../components/ui/search-input";
import { Text } from "../../components/ui/text";
import { ExerciseButton } from "../../components/workout/exercise-button";

type ExerciseOption = {
  exercise: Exercise;
  checked: boolean;
  disabled: boolean;
};

type AddExerciseProps = StackScreenProps<WorkoutScreenParamList, "AddExercise">;

export const AddExercisesScreen: React.FC<AddExerciseProps> = ({ navigation }) => {
  const { addExercises, exercises: exercisesStore } = useWorkoutStore();
  const [search, setSearch] = useState<string>("");
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

  const handleAddExercises = useCallback(() => {
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
  }, [exerciseOptions, addExercises, navigation, exercisesStore]);

  useLayoutEffect(() => {
    const disabled = !exerciseOptions.some((val) => val.checked && !val.disabled);
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleAddExercises}
          className={cn(
            "flex flex-row items-center justify-center gap-2 px-6",
            disabled && "opacity-50",
          )}
        >
          <Text className="text-lg font-semibold text-blue-500">Add</Text>

          <Plus color={"#3b82f6"} size={17} strokeWidth={2.5} />
        </Pressable>
      ),
    });
  }, [navigation, exerciseOptions, handleAddExercises]);

  return (
    <View className="flex-1">
      <View className="p-6">
        <SearchInput
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
          contentContainerStyle={{ paddingBottom: 150 }}
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

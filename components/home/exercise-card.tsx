import { useWorkoutStore } from "~/store/workoutStore";
import { Exercise, ExerciseLog, ExerciseSet, FieldType } from "~/types/exercise";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react-native";
import { View } from "react-native";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

type ExerciseCardProps = {
  exerciseLog: ExerciseLog;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete: () => void;
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseLog,
  onMoveUp,
  onMoveDown,
  onDelete,
}) => {
  const { addSet, updateSet } = useWorkoutStore();
  const { exercise, sets } = exerciseLog;
  const handleAddingSet = () => {
    addSet(exercise);
  };

  return (
    <Card className="rounded-3xl border-0 bg-secondary/50">
      <CardHeader>
        <View className="flex flex-row items-center justify-between">
          <CardTitle>{exercise.name}</CardTitle>
          <View className="flex flex-row gap-1">
            <Button
              size={"icon"}
              className="bg-transparent"
              onPress={onMoveUp}
              disabled={!onMoveUp}
            >
              <ChevronUp color={"white"} size={20} />
            </Button>
            <Button
              size={"icon"}
              className="bg-transparent"
              onPress={onMoveDown}
              disabled={!onMoveDown}
            >
              <ChevronDown size={20} color={"white"} />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"} className="bg-transparent">
                  <X color={"white"} size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete exercise?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{exercise.name}" from this workout?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <View className="flex flex-row justify-center gap-5">
                    <DialogClose asChild>
                      <Button
                        onPress={onDelete}
                        variant={"destructive"}
                        className="w-1/3"
                      >
                        <Text>Delete</Text>
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="w-1/3">
                        <Text>Cancle</Text>
                      </Button>
                    </DialogClose>
                  </View>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>
        </View>
      </CardHeader>
      <CardContent>
        <View>
          <View className="flex flex-row items-center justify-between border-b border-b-foreground/30 py-4">
            <View className="px-3">
              <Text>Set</Text>
            </View>
            <View className="flex flex-row items-center gap-4">
              {exercise.fields?.time && (
                <View className="flex w-20 flex-row items-baseline gap-1">
                  <Text>Time</Text>
                  <Text className="text-sm text-muted-foreground">(min)</Text>
                </View>
              )}
              {exercise.fields?.weight && (
                <View className="flex w-20 flex-row items-baseline gap-1">
                  <Text>Weight</Text>
                  <Text className="text-sm text-muted-foreground">(kg)</Text>
                </View>
              )}
              {exercise.fields?.reps && <Text className="w-20">Reps</Text>}
              <Text className="w-10">Done</Text>
            </View>
          </View>
          {sets.map((set, i) => (
            <SetRow
              exercise={exercise}
              key={i}
              id={i + 1}
              data={set}
              onDataChange={updateSet.bind(null, exerciseLog, i)}
            />
          ))}
        </View>
      </CardContent>
      <CardFooter>
        <View className="flex w-full items-center justify-center pt-5">
          <Button
            className="flex w-full flex-row gap-2"
            size={"sm"}
            onPress={handleAddingSet}
            variant={"secondary"}
          >
            <Plus size={20} color={"white"} />
            <Text className="text-secondary-foreground">Add set</Text>
          </Button>
        </View>
      </CardFooter>
    </Card>
  );
};

type SetRowProps = {
  id: number;
  exercise: Exercise;
  data: ExerciseSet;
  onDataChange: (data: ExerciseSet) => void;
};

const SetRow: React.FC<SetRowProps> = ({ id, exercise, data, onDataChange }) => {
  const handleInputChange = (
    fieldType: FieldType | "done",
    value: string | boolean,
  ) => {
    if (fieldType === "done") {
      onDataChange({ ...data, done: Boolean(value) });
      return;
    }

    const parsedValue: number = Number(value) ?? 0;

    switch (fieldType) {
      case "reps":
        onDataChange({ ...data, reps: parsedValue });
        break;
      case "time":
        console.log(parsedValue);
        onDataChange({
          ...data,
          time: parsedValue,
        });
        break;
      case "weight":
        onDataChange({ ...data, weight: parsedValue });
        break;
    }
  };

  return (
    <View
      className="flex flex-row items-center justify-between border-b border-dashed border-b-foreground/30
        py-4"
    >
      <View className="px-4">
        <Text className="text-lg">{id}</Text>
      </View>
      <View className="flex flex-row items-center gap-4">
        {exercise.fields?.time && (
          <Input
            placeholder="60"
            className="!w-20 bg-background/50"
            value={data.time === 0 ? "" : data.time.toString()}
            onChangeText={handleInputChange.bind(null, "time")}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
        )}
        {exercise.fields?.weight && (
          <Input
            placeholder="12"
            className="!w-20 bg-background/50"
            value={data.weight === 0 ? "" : data.weight.toString()}
            onChangeText={handleInputChange.bind(null, "weight")}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
        )}
        {exercise.fields?.reps && (
          <Input
            placeholder="12"
            className="!w-20 bg-background/50"
            value={data.reps === 0 ? "" : data.reps.toString()}
            onChangeText={handleInputChange.bind(null, "reps")}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
        )}
        <View className="flex w-10 items-center justify-center">
          <Checkbox
            className="!h-7 !w-7"
            checked={data.done}
            onCheckedChange={handleInputChange.bind(null, "done")}
          />
        </View>
      </View>
    </View>
  );
};

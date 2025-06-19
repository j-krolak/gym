import { Exercise, ExerciseLog } from "~/types/exercise";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { View } from "react-native";
import { Text } from "../ui/text";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  PlusCircle,
  Trash,
  X,
} from "lucide-react-native";
import { useWorkoutStore } from "~/store/workoutStore";
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
  const { addSet } = useWorkoutStore();
  const { exercise, sets } = exerciseLog;
  const handleAddingSet = () => {
    addSet(exercise);
  };

  return (
    <Card>
      <CardHeader>
        <View className="flex flex-row justify-between items-center">
          <CardTitle>{exercise.name}</CardTitle>
          <View>
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
                    Are you sure you want to delete "{exercise.name}" from this
                    workout?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <View className="flex flex-row gap-5 justify-center">
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
          <View className="flex flex-row justify-between items-center border-b-muted py-4 border-b">
            <View className="px-3">
              <Text>Set</Text>
            </View>
            <View className="flex flex-row gap-4 items-center">
              {exercise.fields?.time && (
                <View className="w-20 flex flex-row gap-1 items-baseline">
                  <Text>Time</Text>
                  <Text className="text-sm text-muted-foreground">(min)</Text>
                </View>
              )}
              {exercise.fields?.weight && (
                <View className="w-20 flex flex-row gap-1 items-baseline">
                  <Text>Weight</Text>
                  <Text className="text-sm text-muted-foreground">(kg)</Text>
                </View>
              )}
              {exercise.fields?.reps && <Text className="w-20">Reps</Text>}
              <Text className="w-10">Done</Text>
            </View>
          </View>
          {sets.map((_, i) => (
            <SetRow exercise={exercise} key={i} id={i + 1} />
          ))}
        </View>
      </CardContent>
      <CardFooter>
        <View className="flex flex-col w-full gap-4">
          <View className="flex justify-center items-center w-full ">
            <Button
              className="flex flex-row gap-2"
              size={"sm"}
              onPress={handleAddingSet}
            >
              <Plus size={20} />
              <Text className="text-lg ">Add set</Text>
            </Button>
          </View>
          <View className="flex flex-row gap-6 w-full ">
            <Button
              size={"icon"}
              className="bg-transparent"
              onPress={onMoveUp}
              disabled={!onMoveUp}
            >
              <ChevronUp color={"white"} size={30} />
            </Button>
            <Button
              size={"icon"}
              className="bg-transparent"
              onPress={onMoveDown}
              disabled={!onMoveDown}
            >
              <ChevronDown size={30} color={"white"} />
            </Button>
          </View>
        </View>
      </CardFooter>
    </Card>
  );
};

type SetRowProps = {
  id: number;
  exercise: Exercise;
};
const SetRow: React.FC<SetRowProps> = ({ id, exercise }) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState<boolean>(false);

  return (
    <View className="flex flex-row justify-between items-center border-b-muted py-4 border-b border-dashed ">
      <View className="px-4">
        <Text className="text-lg">{id}</Text>
      </View>
      <View className="flex flex-row gap-4 items-center">
        {exercise.fields?.time && (
          <Input
            placeholder="12"
            className="!w-20"
            value={time}
            onChangeText={setTime}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
        )}
        {exercise.fields?.weight && (
          <Input
            placeholder="12"
            className="!w-20"
            value={weight}
            onChangeText={setWeight}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
        )}
        {exercise.fields?.reps && (
          <Input
            placeholder="12"
            className="!w-20"
            value={reps}
            onChangeText={setReps}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
        )}
        <View className="w-10 flex items-center justify-center">
          <Checkbox
            className="!w-7 !h-7"
            checked={done}
            onCheckedChange={setDone}
          />
        </View>
      </View>
    </View>
  );
};

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { View } from "react-native";

export default function StatsScreen() {
  return (
    <View className="flex-1 gap-5 bg-secondary/30 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Bench Press</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </View>
  );
}

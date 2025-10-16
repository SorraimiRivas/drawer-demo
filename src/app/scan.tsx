import { StatusBar } from "expo-status-bar";
import { ScanLine } from "lucide-react-native";
import React from "react";
import { Platform, View } from "react-native";

export default function Scan() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <StatusBar style={Platform.select({ ios: "light", android: "dark" })} />
      <ScanLine size={300} color={"gray"} strokeWidth={1} />
    </View>
  );
}

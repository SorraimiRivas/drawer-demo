import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

export default function PlantCard({ item }: { item: any }) {
  return (
    <View className="w-[45%] rounded-xl">
      <View className="absolute top-2 right-2 z-10">
        <Ionicons name="heart-outline" size={24} color="gray" />
      </View>
      <View className="w-full h-[200px] bg-gray-50 p-2 rounded-xl">
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
        />
      </View>
      <View className="flex-col justify-center gap-2 items-start mt-4">
        <Text className="text-sm font-medium bg-black text-white rounded-xl px-2 capitalize">
          {item.status}
        </Text>
        <Text className="text-base font-medium">{item.name}</Text>
      </View>
    </View>
  );
}

import DrawerTrigger from "@/components/drawer/drawer-trigger";
import { IconSymbol } from "@/components/icons/icon-symbol";
import { useAnimationContext } from "@/ctx/animation-context";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Favorites() {
  const { drawerOpen } = useAnimationContext();
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white px-6" style={{ paddingTop: top }}>
      <View className="flex-row items-center justify-between">
        <DrawerTrigger
          onPress={() => (drawerOpen.value = !drawerOpen.value)}
          className="bg-gray-300/30 rounded-full p-2"
        >
          <IconSymbol name="text.alignleft" size={24} color="black" />
        </DrawerTrigger>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-5xl font-bold text-orange-500">Favorites</Text>
      </View>
    </View>
  );
}

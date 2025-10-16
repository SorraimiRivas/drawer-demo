import { cn } from "@/lib/utils";
import React from "react";
import { Text } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function ItemList({
  item,
  index,
  xTransform,
  isOpen,
  menuItems,
}: {
  item: any;
  index: number;
  xTransform: number;
  isOpen: SharedValue<boolean>;
  menuItems: any[];
}) {
  const animatedItemsStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isOpen.value ? 0 : -xTransform, {
            duration: 500 + index * 20,
            reduceMotion: ReduceMotion.System,
            easing: Easing.elastic(1),
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={animatedItemsStyle}
      className={cn(
        "flex-row items-center gap-6",
        index === menuItems.length - 3 && "mb-12",
        index === menuItems.length - 1 && "mb-12"
      )}
      key={item.label}
    >
      {item.icon}
      <Text className="text-white text-lg font-semibold">{item.label}</Text>
    </Animated.View>
  );
}

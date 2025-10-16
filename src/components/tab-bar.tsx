import { cn } from "@/lib/utils";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeIcon from "./icons/home";

export default function TabBar(props: BottomTabBarProps) {
  const { state, navigation } = props;
  const { index, routes } = state;
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const paddingX = width * 0.04; // 12% of width
  const itemWidth = (width - paddingX * 2) / routes.length;

  const translateX = useSharedValue(0);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(paddingX + itemWidth * index),
        },
      ],
    };
  }, [index]);

  const onTabPress = (index: number) => {
    navigation.navigate(routes[index].name);
    translateX.value = withSpring(index * itemWidth);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        height: 90,
        paddingHorizontal: paddingX,
        paddingBottom: bottom,
        width,
      }}
    >
      <Animated.View
        className="absolute bottom-0 top-14 items-center"
        style={[{ width: itemWidth }, animatedIndicatorStyle]}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#FF7300",
          }}
        />
      </Animated.View>

      {routes.map((route, index) => {
        const isFocused = props.state.index === index;
        let color = isFocused ? "#FF7300" : "gray";

        if (route.name === "dummy") {
          color = "white";

          return (
            <Pressable
              key={index}
              onPress={() => router.push("/scan")}
              className={cn(
                "mx-4 h-11 w-11 rounded-full items-center justify-center",
                route.name === "dummy" && "bg-orange-500"
              )}
              style={{}}
            >
              <TabBarIcon route={route} color={color} size={24} />
            </Pressable>
          );
        }

        return (
          <Pressable
            key={index}
            onPress={() => onTabPress(index)}
            className={cn(
              "flex-1 h-11 w-11 rounded-full items-center justify-center",
              route.name === "scan" && "bg-orange-500"
            )}
            style={{}}
          >
            <TabBarIcon route={route} color={color} size={24} />
          </Pressable>
        );
      })}
    </View>
  );
}

const TabBarIcon = ({
  route,
  color,
  size,
}: {
  route: RouteProp<any, any>;
  color: string;
  size?: number;
  weight?: string;
}) => {
  switch (route.name) {
    case "index":
      return <HomeIcon width={size} height={size} color={color} />;
    case "favorites":
      return <Feather name="heart" size={size} color={color} />;
    case "dummy":
      return (
        <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
      );
    case "cart":
      return <AntDesign name="shopping-cart" size={size} color={color} />;
    case "profile":
      return <Octicons name="person" size={size} color={color} />;
  }
};

import { useAnimationContext } from "@/ctx/animation-context";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SquareArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  ReduceMotion,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DrawerTrigger from "./drawer-trigger";
import ItemList from "./item-list";

const menuItems = [
  {
    label: "Categories",
    icon: <Ionicons name="grid-outline" size={24} color="white" />,
  },
  {
    label: "Wallet",
    icon: <Ionicons name="wallet-outline" size={24} color="white" />,
  },
  {
    label: "Gift Ideas",
    icon: <Ionicons name="gift-outline" size={24} color="white" />,
  },
  {
    label: "Subscription",
    icon: <MaterialCommunityIcons name="crown" size={24} color="white" />,
  },
  {
    label: "Store Locator",
    icon: <Ionicons name="location-outline" size={24} color="white" />,
  },
  {
    label: "Loyalty Program",
    icon: <Feather name="thumbs-up" size={24} color="white" />,
  },
  {
    label: "Blog & Articles",
    icon: <Ionicons name="newspaper-outline" size={24} color="white" />,
  },
  {
    label: "Help & Support",
    icon: <Ionicons name="heart-outline" size={24} color="white" />,
  },
];

const X_TRANSFORM = 0.9;

export default function Drawer({ children }: { children: React.ReactNode }) {
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle | null>(
    "dark"
  );
  const { top } = useSafeAreaInsets();
  const { drawerOpen } = useAnimationContext();
  const { width, height } = useWindowDimensions();
  const xTransform = width * X_TRANSFORM;
  const closeThreshold = width * 0.2;

  useAnimatedReaction(
    () => drawerOpen.value,
    (current) => {
      runOnJS(setStatusBarStyle)(current ? "light" : "dark");
    }
  );

  const isPanning = useSharedValue(false);
  const panOffset = useSharedValue(0);

  const setDrawer = (open: boolean) => {
    drawerOpen.value = open;
  };

  const progress = useDerivedValue(() => {
    // Combine button state with pan gesture offset
    const baseProgress = drawerOpen.value ? 1 : 0;
    const gestureProgress = panOffset.value / (width * 0.9);
    const totalProgress = baseProgress + gestureProgress;

    if (isPanning.value) {
      return totalProgress;
    }

    return withTiming(baseProgress + gestureProgress, {
      duration: 500,
      reduceMotion: ReduceMotion.System,
      easing: Easing.elastic(1),
    });
  });

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .enabled(drawerOpen.value)
    .onStart(() => {
      isPanning.value = true;
    })
    .onUpdate((e) => {
      if (e.translationX < 0) {
        panOffset.value = e.translationX;
      }
    })
    .onEnd((e) => {
      isPanning.value = false;

      if (
        Math.abs(e.translationX) > closeThreshold ||
        Math.abs(e.velocityX) > 400
      ) {
        // Close the drawer
        runOnJS(setDrawer)(false);
        panOffset.value = withTiming(0, { duration: 1 });
      } else {
        // Snap back to open position
        panOffset.value = withTiming(0, { duration: 1 });
      }
    });

  // Animated content style
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(progress.value, [0, 1], [1, 0.7]) },
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, width * 0.99],
            Extrapolation.CLAMP
          ),
        },
      ],
      borderRadius: interpolate(progress.value, [0, 1], [0, 40]),
    };
  });

  const animatedContentShadowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(progress.value, [0, 1], [1, 0.65]) },
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, width * 0.95],
            Extrapolation.CLAMP
          ),
        },
      ],
      borderRadius: interpolate(progress.value, [0, 1], [0, 40]),
    };
  });

  // Animated logout button
  const animatedLogoutStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(drawerOpen.value ? 0 : -xTransform, {
            duration: 700,
            reduceMotion: ReduceMotion.System,
            easing: Easing.elastic(1),
          }),
        },
      ],
    };
  });

  // Animated left header button
  const animatedLeftHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(drawerOpen.value ? 0 : -xTransform, {
            duration: 500,
            reduceMotion: ReduceMotion.System,
            easing: Easing.elastic(1),
          }),
        },
      ],
    };
  });

  // Animated right header button
  const animatedRightHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(drawerOpen.value ? 0 : xTransform, {
            duration: 500,
            reduceMotion: ReduceMotion.System,
            easing: Easing.elastic(1),
          }),
        },
      ],
    };
  });

  return (
    <View className="h-full relative">
      <StatusBar style={statusBarStyle ?? "auto"} />
      <View
        className="absolute inset-0 z-0 bg-teal-950"
        style={{ paddingTop: top }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pb-3">
          <Animated.View
            className="items-center justify-center h-11 w-11 rounded-full bg-white/20"
            style={animatedLeftHeaderStyle}
            onTouchStart={() => {
              router.push("/profile");
              drawerOpen.value = false;
            }}
          >
            <Octicons name="person" size={24} color="white" />
          </Animated.View>
          <Animated.View style={animatedRightHeaderStyle}>
            <DrawerTrigger
              className=""
              onPress={() => (drawerOpen.value = false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </DrawerTrigger>
          </Animated.View>
        </View>
        {/* Body */}
        <ScrollView
          contentContainerClassName="justify-center h-full"
          showsVerticalScrollIndicator={false}
        >
          <View
            className="flex-col items-start pl-10 gap-6"
            style={{ height: height * 0.7 }}
          >
            {menuItems.map((item, index) => (
              <ItemList
                key={index}
                item={item}
                index={index}
                xTransform={xTransform}
                isOpen={drawerOpen}
                menuItems={menuItems}
              />
            ))}
            {/* Footer */}
            <Animated.View
              className="flex-row items-center justify-center gap-6"
              style={animatedLogoutStyle}
            >
              <SquareArrowLeft size={24} color="white" strokeWidth={2} />
              <Text className="text-white text-lg font-semibold">Logout</Text>
            </Animated.View>
          </View>
        </ScrollView>
      </View>

      {/* Main Content */}
      <View className="flex-1 relative">
        <Animated.View
          className="absolute inset-0 z-40 bg-white/30"
          style={[animatedContentShadowStyle]}
        />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className="flex-1 z-50 overflow-hidden"
            style={[animatedContentStyle]}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

import { AnimationProvider } from "@/ctx/animation-context";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <AnimationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            sheetGrabberVisible: true,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="scan"
            options={{
              presentation: "modal",
              title: "Scan",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </AnimationProvider>
  );
}

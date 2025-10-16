import Drawer from "@/components/drawer";
import TabBar from "@/components/tab-bar";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Drawer>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="favorites" />
        <Tabs.Screen name="dummy" />
        <Tabs.Screen name="cart" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </Drawer>
  );
}

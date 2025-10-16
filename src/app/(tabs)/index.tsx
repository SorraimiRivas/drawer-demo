import DrawerTrigger from "@/components/drawer/drawer-trigger";
import { IconSymbol } from "@/components/icons/icon-symbol";
import PlantCard from "@/components/plant-card";
import { explore } from "@/constants";
import { useAnimationContext } from "@/ctx/animation-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { drawerOpen } = useAnimationContext();
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 px-6 bg-white" style={{ paddingTop: top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <DrawerTrigger
          onPress={() => (drawerOpen.value = drawerOpen.value ? false : true)}
          className="bg-gray-300/30 rounded-full p-2"
        >
          <IconSymbol name="text.alignleft" size={24} color="black" />
        </DrawerTrigger>
        <View className="bg-gray-300/30 rounded-full p-2">
          <IconSymbol name="magnifyingglass" size={24} color="black" />
        </View>
      </View>
      {/* Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
      >
        <View className="flex-1 mt-12">
          <View className="w-full">
            <Text className="text-xl font-bold z-20">Popular</Text>
            <View className="flex-row relative h-[250px] w-3/4 items-center justify-center">
              <View className="items-start z-20 flex-col justify-center">
                <Text className="text-sm text-white font-medium bg-orange-500 rounded-full px-2">
                  BEST SELLER
                </Text>
                <Text className="text-lg font-semibold">Mid-Century Plant</Text>
                <Text className="text-lg font-semibold">Stand</Text>
                <Text className="text-lg font-semibold">$19.99</Text>
              </View>
              <Image
                source={{
                  uri: "https://images-na.ssl-images-amazon.com/images/I/818NsoH1kTL.jpg",
                }}
                className="w-full h-[300px] z-10 absolute -top-12 -right-34"
                resizeMode="contain"
              />
            </View>
          </View>
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-bold">Explore</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color="black"
              />
            </View>
            <View className="flex-row flex-wrap gap-2 mt-4 justify-between">
              {explore.map((item) => (
                <PlantCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

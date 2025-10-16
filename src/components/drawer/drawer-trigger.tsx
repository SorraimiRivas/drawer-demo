import { cn } from "@/lib/utils";
import { Pressable } from "react-native";

export default function DrawerTrigger({
  children,
  className,
  onPress,
}: {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex bg-white/20 rounded-full h-11 w-11 items-center justify-center",
        className
      )}
    >
      {children}
    </Pressable>
  );
}

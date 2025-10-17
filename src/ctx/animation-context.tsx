import React, { createContext, useContext } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface AnimationContextType {
  drawerProgress: SharedValue<number>;
  drawerOpen: SharedValue<boolean>;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const drawerProgress = useSharedValue(0);
  const drawerOpen = useSharedValue(false);

  const value = {
    drawerProgress,
    drawerOpen,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

// Hook to use animation context
export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "useAnimationContext must be used within AnimationProvider"
    );
  }
  return context;
};

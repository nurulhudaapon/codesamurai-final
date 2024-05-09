import React from "react";
import { ScanLine, NotebookTabs } from "lucide-react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => <ScanLine color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ color }) => <NotebookTabs color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}

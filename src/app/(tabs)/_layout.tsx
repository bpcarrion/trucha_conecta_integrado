import { Tabs } from "expo-router";
import { Text } from "react-native";

import { colores } from "@/theme/colores";

const icono = (emoji: string) => () => <Text style={{ fontSize: 20 }}>{emoji}</Text>;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colores.primario,
        headerStyle: { backgroundColor: colores.primario },
        headerTintColor: colores.sobrePrimario,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Inicio", tabBarIcon: icono("🏠") }}
      />
      <Tabs.Screen
        name="lotes"
        options={{ title: "Lotes", tabBarIcon: icono("🐟") }}
      />
      <Tabs.Screen
        name="reservas"
        options={{ title: "Mis reservas", tabBarIcon: icono("📋") }}
      />
    </Tabs>
  );
}

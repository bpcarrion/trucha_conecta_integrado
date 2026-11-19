import { Stack } from "expo-router";

import { ReservasProvider } from "@/context/ReservasContext";
import { colores } from "@/theme/colores";

export default function RootLayout() {
  return (
    <ReservasProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.primario },
          headerTintColor: colores.sobrePrimario,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="lote/[id]" options={{ title: "Detalle del lote" }} />
      </Stack>
    </ReservasProvider>
  );
}

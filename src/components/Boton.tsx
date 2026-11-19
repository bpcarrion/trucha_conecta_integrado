import { Pressable, StyleSheet, Text } from "react-native";

import { colores } from "@/theme/colores";

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: "primario" | "borde" | "peligro";
};

export function Boton({ titulo, onPress, variante = "primario" }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.boton,
        variante === "borde" && styles.borde,
        variante === "peligro" && styles.peligro,
        pressed && styles.presionado,
      ]}
    >
      <Text style={[styles.texto, variante === "borde" && styles.textoBorde]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: colores.primario,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  borde: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colores.primario,
  },
  peligro: { backgroundColor: colores.error },
  presionado: { opacity: 0.7 },
  texto: { color: colores.sobrePrimario, fontSize: 16, fontWeight: "600" },
  textoBorde: { color: colores.primario },
});

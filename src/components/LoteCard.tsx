import { Pressable, StyleSheet, Text, View } from "react-native";

import { ETIQUETA_ESTADO } from "@/data/lotes";
import type { Lote } from "@/models/tipos";
import { colores } from "@/theme/colores";

type Props = {
  lote: Lote;
  onPress: () => void;
};

export function LoteCard({ lote, onPress }: Props) {
  const agotado = lote.disponible === 0;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionado]}
    >
      <View style={styles.fila}>
        <Text style={styles.codigo}>{lote.codigo}</Text>
        <Text style={[styles.estado, agotado && styles.agotado]}>
          {agotado ? "Agotado" : ETIQUETA_ESTADO[lote.estado]}
        </Text>
      </View>
      <Text style={styles.producto}>{lote.producto}</Text>
      <Text style={styles.detalle}>
        Llegada estimada: {lote.llegada} · Origen: {lote.origen}
      </Text>
      <Text style={styles.disponible}>
        Disponible: {lote.disponible.toLocaleString("es")} de{" "}
        {lote.cantidadTotal.toLocaleString("es")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 16,
    gap: 4,
  },
  presionado: { opacity: 0.7 },
  fila: { flexDirection: "row", justifyContent: "space-between" },
  codigo: { fontSize: 18, fontWeight: "700", color: colores.texto },
  estado: { fontSize: 12, fontWeight: "700", color: colores.primario },
  agotado: { color: colores.error },
  producto: { fontSize: 15, color: colores.texto },
  detalle: { fontSize: 13, color: colores.textoSuave },
  disponible: { fontSize: 14, fontWeight: "600", color: colores.exito, marginTop: 4 },
});

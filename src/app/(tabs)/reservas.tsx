import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Boton } from "@/components/Boton";
import { useReservas } from "@/context/ReservasContext";
import type { Reserva } from "@/models/tipos";
import { colores } from "@/theme/colores";

export default function ReservasScreen() {
  const router = useRouter();
  const { reservas, cancelar } = useReservas();

  const totalGeneral = reservas.reduce((suma, r) => suma + r.total, 0);

  function confirmarCancelar(reserva: Reserva) {
    Alert.alert("Cancelar reserva", `¿Cancelar la reserva del lote ${reserva.codigo}?`, [
      { text: "No", style: "cancel" },
      { text: "Sí, cancelar", style: "destructive", onPress: () => cancelar(reserva.id) },
    ]);
  }

  return (
    <View style={styles.pantalla}>
      <FlatList
        data={reservas}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.codigo}>{item.codigo}</Text>
            <Text style={styles.producto}>{item.producto}</Text>
            <Text style={styles.detalle}>
              {item.cantidad.toLocaleString("es")} unidades · Total estimado: $
              {item.total.toFixed(2)}
            </Text>
            <Pressable onPress={() => confirmarCancelar(item)} accessibilityRole="button">
              <Text style={styles.cancelar}>Cancelar reserva</Text>
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.textoVacio}>Aún no tienes reservas.</Text>
            <Boton titulo="Ver lotes disponibles" onPress={() => router.push("/lotes")} />
          </View>
        }
        contentContainerStyle={styles.lista}
      />
      {reservas.length > 0 ? (
        <View style={styles.pie}>
          <Text style={styles.total}>Total estimado: ${totalGeneral.toFixed(2)}</Text>
          <Text style={styles.nota}>
            La reserva no reemplaza los permisos sanitarios ni los trámites de
            importación.
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  lista: { padding: 16 },
  separador: { height: 12 },
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 16,
    gap: 4,
  },
  codigo: { fontSize: 18, fontWeight: "700", color: colores.texto },
  producto: { fontSize: 15, color: colores.texto },
  detalle: { fontSize: 14, color: colores.textoSuave },
  cancelar: { fontSize: 15, fontWeight: "700", color: colores.error, marginTop: 8 },
  vacio: { gap: 16, marginTop: 32 },
  textoVacio: { textAlign: "center", color: colores.textoSuave, fontSize: 16 },
  pie: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.superficie,
    gap: 4,
  },
  total: { fontSize: 17, fontWeight: "700", color: colores.texto },
  nota: { fontSize: 12, color: colores.textoSuave },
});

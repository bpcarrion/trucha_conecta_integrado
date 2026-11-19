import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Boton } from "@/components/Boton";
import { useReservas } from "@/context/ReservasContext";
import { LOTES } from "@/data/lotes";
import { colores } from "@/theme/colores";

export default function InicioScreen() {
  const router = useRouter();
  const { reservas } = useReservas();
  const lotesConStock = LOTES.filter((l) => l.disponible > 0).length;

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      <Image
        source={require("../../../assets/images/banner.png")}
        style={styles.banner}
        resizeMode="cover"
        accessibilityLabel="Banner de TruchaConecta"
      />

      <Text style={styles.titulo}>TruchaConecta Ecuador</Text>
      <Text style={styles.subtitulo}>
        Reserva ovas de trucha importadas desde España y planifica tu producción
        con anticipación.
      </Text>

      <View style={styles.resumen}>
        <View style={styles.dato}>
          <Text style={styles.numero}>{lotesConStock}</Text>
          <Text style={styles.etiqueta}>lotes con stock</Text>
        </View>
        <View style={styles.dato}>
          <Text style={styles.numero}>{reservas.length}</Text>
          <Text style={styles.etiqueta}>mis reservas</Text>
        </View>
      </View>

      <Boton titulo="Ver lotes disponibles" onPress={() => router.push("/lotes")} />
      <Boton
        titulo="Ver mis reservas"
        variante="borde"
        onPress={() => router.push("/reservas")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 14 },
  banner: { width: "100%", height: 160, borderRadius: 12 },
  titulo: { fontSize: 26, fontWeight: "800", color: colores.primario },
  subtitulo: { fontSize: 15, color: colores.textoSuave, lineHeight: 22 },
  resumen: { flexDirection: "row", gap: 12 },
  dato: {
    flex: 1,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  numero: { fontSize: 28, fontWeight: "800", color: colores.acento },
  etiqueta: { fontSize: 13, color: colores.textoSuave },
});

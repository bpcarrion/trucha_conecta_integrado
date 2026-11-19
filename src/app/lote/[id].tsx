import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { Boton } from "@/components/Boton";
import { CampoTexto } from "@/components/CampoTexto";
import { useReservas } from "@/context/ReservasContext";
import { ETIQUETA_ESTADO, LOTES } from "@/data/lotes";
import { colores } from "@/theme/colores";

export default function DetalleLoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { reservas, agregar } = useReservas();

  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState<string | undefined>();

  const lote = LOTES.find((l) => l.id === id);

  if (!lote) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoVacio}>Este lote no existe.</Text>
      </View>
    );
  }

  // Lo que queda realmente: stock del lote menos lo que ya reservé yo.
  const yaReservado = reservas
    .filter((r) => r.loteId === lote.id)
    .reduce((suma, r) => suma + r.cantidad, 0);
  const disponible = lote.disponible - yaReservado;

  const cantidadNumero = Number(cantidad);
  const totalEstimado =
    Number.isInteger(cantidadNumero) && cantidadNumero > 0
      ? cantidadNumero * lote.precioUnitario
      : 0;

  function reservar() {
    if (!lote) return;
    if (!/^\d+$/.test(cantidad.trim()) || cantidadNumero <= 0) {
      setError("Escribe una cantidad entera mayor que 0.");
      return;
    }
    if (cantidadNumero > disponible) {
      setError(`Solo quedan ${disponible.toLocaleString("es")} disponibles.`);
      return;
    }
    setError(undefined);
    agregar({
      loteId: lote.id,
      codigo: lote.codigo,
      producto: lote.producto,
      cantidad: cantidadNumero,
      total: totalEstimado,
    });
    Alert.alert("Reserva registrada", `Reservaste ${cantidadNumero.toLocaleString("es")} unidades del lote ${lote.codigo}.`);
    router.replace("/reservas");
  }

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      <Text style={styles.codigo}>{lote.codigo}</Text>
      <Text style={styles.producto}>{lote.producto}</Text>

      <View style={styles.ficha}>
        <Fila etiqueta="Origen" valor={lote.origen} />
        <Fila etiqueta="Llegada estimada" valor={lote.llegada} />
        <Fila etiqueta="Estado" valor={ETIQUETA_ESTADO[lote.estado]} />
        <Fila etiqueta="Precio por unidad" valor={`$${lote.precioUnitario.toFixed(3)}`} />
        <Fila etiqueta="Disponible" valor={`${disponible.toLocaleString("es")} de ${lote.cantidadTotal.toLocaleString("es")}`} />
      </View>

      {disponible > 0 ? (
        <>
          <CampoTexto
            etiqueta="Cantidad a reservar"
            value={cantidad}
            onChangeText={(texto) => {
              setCantidad(texto);
              setError(undefined);
            }}
            error={error}
            placeholder="5000"
            keyboardType="number-pad"
          />
          <Text style={styles.total}>Total estimado: ${totalEstimado.toFixed(2)}</Text>
          <Boton titulo="Reservar" onPress={reservar} />
        </>
      ) : (
        <Text style={styles.agotado}>Este lote ya no tiene unidades disponibles.</Text>
      )}

      <Text style={styles.nota}>
        La reserva digital no reemplaza los permisos sanitarios ni los trámites
        de importación vigentes en Ecuador.
      </Text>
    </ScrollView>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.filaEtiqueta}>{etiqueta}</Text>
      <Text style={styles.filaValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 14 },
  centro: { flex: 1, alignItems: "center", justifyContent: "center" },
  textoVacio: { color: colores.textoSuave, fontSize: 16 },
  codigo: { fontSize: 24, fontWeight: "800", color: colores.primario },
  producto: { fontSize: 16, color: colores.texto },
  ficha: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  fila: { flexDirection: "row", justifyContent: "space-between" },
  filaEtiqueta: { color: colores.textoSuave, fontSize: 14 },
  filaValor: { color: colores.texto, fontSize: 14, fontWeight: "600" },
  total: { fontSize: 16, fontWeight: "700", color: colores.texto },
  agotado: { color: colores.error, fontSize: 15, fontWeight: "600" },
  nota: { fontSize: 12, color: colores.textoSuave },
});

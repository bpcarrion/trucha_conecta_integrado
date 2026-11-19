import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import { LoteCard } from "@/components/LoteCard";
import { LOTES } from "@/data/lotes";
import { colores } from "@/theme/colores";

export default function LotesScreen() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  // La lista sale de los datos locales y se filtra según lo que escribe el usuario.
  const texto = busqueda.trim().toLowerCase();
  const lotes = LOTES.filter(
    (l) =>
      l.codigo.toLowerCase().includes(texto) ||
      l.producto.toLowerCase().includes(texto),
  );

  return (
    <View style={styles.pantalla}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar por código o producto"
        placeholderTextColor={colores.textoSuave}
        value={busqueda}
        onChangeText={setBusqueda}
        autoCapitalize="none"
        accessibilityLabel="Buscar lotes"
      />
      <FlatList
        data={lotes}
        keyExtractor={(lote) => lote.id}
        renderItem={({ item }) => (
          <LoteCard
            lote={item}
            onPress={() =>
              router.push({ pathname: "/lote/[id]", params: { id: item.id } })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay lotes que coincidan con tu búsqueda.</Text>
        }
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  buscador: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colores.texto,
  },
  lista: { padding: 16 },
  separador: { height: 12 },
  vacio: { textAlign: "center", color: colores.textoSuave, marginTop: 32 },
});

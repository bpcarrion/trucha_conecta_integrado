# TruchaConecta Ecuador

Aplicación móvil que conecta a un importador de ovas de trucha desde España con pequeños y medianos productores acuícolas de Ecuador. Permite ver los lotes disponibles, sus precios y fechas estimadas de llegada, y reservar cantidades con anticipación.

Proyecto integrador · Programación Móvil (DS4AC1-313) · Período 2026-II · Entrega 1

## Integrantes
- Bryan Carrion
- Marlon Moreno
- Paul Quishpe

## Pantallas
1. **Inicio:** banner, resumen y accesos rápidos.
2. **Lotes:** lista con búsqueda (FlatList con datos locales).
3. **Detalle del lote:** ficha del lote y formulario de reserva con validación.
4. **Mis reservas:** lista de reservas con total estimado y opción de cancelar.

## Tecnologías
React Native con Expo, TypeScript y Expo Router. Los datos de esta entrega son locales (`src/data/lotes.ts`).

## Cómo ejecutarlo
```bash
npm install
npx expo start -c
```
Escanea el código QR con Expo Go desde un celular conectado a la misma red Wi-Fi.

## Nota
La reserva digital no reemplaza los permisos sanitarios ni los trámites de importación vigentes en Ecuador.
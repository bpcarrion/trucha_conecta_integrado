import type { Lote } from "@/models/tipos";

// Datos locales de ejemplo (Entrega 1). En la Entrega 2 vendrán de Supabase.
export const LOTES: Lote[] = [
  {
    id: "1",
    codigo: "LOTE-ESP-001",
    producto: "Ova embrionada de trucha arcoíris",
    origen: "España",
    cantidadTotal: 200000,
    disponible: 150000,
    llegada: "2026-12-15",
    estado: "planificado",
    precioUnitario: 0.045,
  },
  {
    id: "2",
    codigo: "LOTE-ESP-002",
    producto: "Ova embrionada de trucha arcoíris",
    origen: "España",
    cantidadTotal: 100000,
    disponible: 60000,
    llegada: "2027-01-20",
    estado: "planificado",
    precioUnitario: 0.047,
  },
  {
    id: "3",
    codigo: "LOTE-ESP-003",
    producto: "Ova de trucha arcoíris certificada",
    origen: "España",
    cantidadTotal: 50000,
    disponible: 20000,
    llegada: "2026-12-02",
    estado: "en_transito",
    precioUnitario: 0.05,
  },
  {
    id: "4",
    codigo: "LOTE-ESP-004",
    producto: "Alevines de trucha arcoíris",
    origen: "España",
    cantidadTotal: 20000,
    disponible: 12000,
    llegada: "2027-02-10",
    estado: "planificado",
    precioUnitario: 0.18,
  },
  {
    id: "5",
    codigo: "LOTE-ESP-005",
    producto: "Ova embrionada de trucha arcoíris",
    origen: "España",
    cantidadTotal: 80000,
    disponible: 0,
    llegada: "2026-11-25",
    estado: "recibido",
    precioUnitario: 0.045,
  },
];

export const ETIQUETA_ESTADO = {
  planificado: "Planificado",
  en_transito: "En tránsito",
  recibido: "Recibido",
} as const;

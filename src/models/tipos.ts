export type EstadoLote = "planificado" | "en_transito" | "recibido";

/** Un lote de ovas de trucha que el importador trae desde España. */
export interface Lote {
  id: string;
  codigo: string;
  producto: string;
  origen: string;
  cantidadTotal: number;
  disponible: number;
  llegada: string; // fecha estimada, texto AAAA-MM-DD
  estado: EstadoLote;
  precioUnitario: number; // USD por ova
}

/** Una reserva que hace el productor sobre un lote. */
export interface Reserva {
  id: string;
  loteId: string;
  codigo: string;
  producto: string;
  cantidad: number;
  total: number;
}

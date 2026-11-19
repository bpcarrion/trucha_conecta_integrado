import { createContext, useContext, useState, type ReactNode } from "react";

import type { Reserva } from "@/models/tipos";

type ReservasCtx = {
  reservas: Reserva[];
  agregar: (reserva: Omit<Reserva, "id">) => void;
  cancelar: (id: string) => void;
};

const Contexto = createContext<ReservasCtx | null>(null);

// Guarda las reservas en memoria con useState mientras la app está abierta.
export function ReservasProvider({ children }: { children: ReactNode }) {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  function agregar(reserva: Omit<Reserva, "id">) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setReservas((anteriores) => [...anteriores, { id, ...reserva }]);
  }

  function cancelar(id: string) {
    setReservas((anteriores) => anteriores.filter((r) => r.id !== id));
  }

  return (
    <Contexto.Provider value={{ reservas, agregar, cancelar }}>
      {children}
    </Contexto.Provider>
  );
}

export function useReservas(): ReservasCtx {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useReservas debe usarse dentro de ReservasProvider");
  return ctx;
}

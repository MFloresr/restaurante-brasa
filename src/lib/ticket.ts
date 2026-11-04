// Ticket (comanda) del pedido para llevar. Se guarda en el navegador (localStorage) solo para que funcione:
// es almacenamiento estrictamente necesario, no lleva datos personales y no sale del dispositivo.

export type Linea = { id: string; cantidad: number };
export type PlatoResumen = { id: string; nombre: string; precio: number; unidad: string; categoria: string; alergenos: string[]; vegetariano: boolean; vegano: boolean };

const CLAVE = 'brasa:ticket';

export const leerTicket = (): Linea[] => {
  try { const v = localStorage.getItem(CLAVE); return v ? (JSON.parse(v) as Linea[]) : []; } catch { return []; }
};
export function guardarTicket(lineas: Linea[]) {
  try { localStorage.setItem(CLAVE, JSON.stringify(lineas)); } catch { /* sin almacenamiento: el ticket no se conserva */ }
  document.dispatchEvent(new CustomEvent('brasa:ticket'));
}
export function sumar(id: string, delta = 1) {
  const lineas = leerTicket();
  const l = lineas.find((x) => x.id === id);
  if (l) l.cantidad += delta; else if (delta > 0) lineas.push({ id, cantidad: delta });
  guardarTicket(lineas.filter((x) => x.cantidad > 0));
}
export const totalUnidades = () => leerTicket().reduce((s, l) => s + l.cantidad, 0);

let carta: Promise<PlatoResumen[]> | null = null;
export const cargarCarta = () => (carta ??= fetch('/datos/carta.json').then((r) => r.json()));

export const formatoEuros = (n: number) => `${new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)} €`;

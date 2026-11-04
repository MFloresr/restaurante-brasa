import type { CollectionEntry } from 'astro:content';

export type Plato = CollectionEntry<'platos'>;

export const NBSP = ' ';
const nf2 = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const euros = (n: number) => `${nf2.format(n)}${NBSP}€`;

export const CATEGORIAS: { id: string; nombre: string; color: string }[] = [
  { id: 'picar', nombre: 'Para picar', color: 'var(--c-picar)' },
  { id: 'brasa', nombre: 'A la brasa', color: 'var(--c-brasa)' },
  { id: 'arroces', nombre: 'Arroces', color: 'var(--c-arroces)' },
  { id: 'postres', nombre: 'Postres', color: 'var(--c-postres)' },
  { id: 'bebidas', nombre: 'Bebidas', color: 'var(--c-bebidas)' },
];
export const NOMBRE_CATEGORIA = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c.nombre]));

export const NOMBRE_ALERGENO: Record<string, string> = {
  gluten: 'Gluten',
  crustaceos: 'Crustáceos',
  huevos: 'Huevos',
  pescado: 'Pescado',
  cacahuetes: 'Cacahuetes',
  soja: 'Soja',
  lacteos: 'Lácteos',
  'frutos-secos': 'Frutos de cáscara',
  apio: 'Apio',
  mostaza: 'Mostaza',
  sesamo: 'Sésamo',
  sulfitos: 'Sulfitos',
  altramuces: 'Altramuces',
  moluscos: 'Moluscos',
};

export const sinIva = (precio: number, iva = 10) => precio / (1 + iva / 100);

/** Datos mínimos de cada plato para el ticket (se sirven en /datos/carta.json). */
export function resumenPlato(p: Plato) {
  const d = p.data;
  return { id: p.id, nombre: d.nombre, precio: d.precio, unidad: d.unidad, categoria: d.categoria, alergenos: d.alergenos, vegetariano: d.vegetariano, vegano: d.vegano };
}

// Datos mínimos de la carta para el ticket y el pedido, servidos como archivo estático.
import type { APIRoute } from 'astro';
import { getPlatos } from '../../lib/contenido';
import { resumenPlato } from '../../lib/util';

export const GET: APIRoute = async () => {
  const platos = await getPlatos();
  return new Response(JSON.stringify(platos.map(resumenPlato)), { headers: { 'Content-Type': 'application/json' } });
};

// Capa de acceso al contenido. Las páginas solo llaman a estas funciones.
// Hoy leen los archivos de src/content; para pasar al CMS (Sanity) basta con reescribir este archivo
// y devolver la misma forma de datos con consultas GROQ, sin tocar las páginas ni los componentes.
import { getCollection } from 'astro:content';

export async function getPlatos() {
  return (await getCollection('platos')).sort((a, b) => a.data.orden - b.data.orden);
}
export const getDestacados = async () => (await getPlatos()).filter((p) => p.data.destacado && p.data.foto);

export async function getEntradas() {
  return (await getCollection('blog')).sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}
export const getMenuDia = async () => (await getCollection('menuDia')).sort((a, b) => a.data.orden - b.data.orden);
export const getOpiniones = () => getCollection('opiniones');
export const getPreguntas = async (tema?: string) => {
  const todas = await getCollection('preguntas');
  return tema ? todas.filter((p) => p.data.tema === tema) : todas;
};

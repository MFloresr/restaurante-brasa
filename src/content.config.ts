// Esquemas del contenido. Cada colección equivale a un tipo de documento del futuro CMS (Sanity):
// platos, entradas del blog y datos sueltos (menú del día, opiniones, preguntas).
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIAS = ['picar', 'brasa', 'arroces', 'postres', 'bebidas'] as const;
// Los 14 alérgenos de declaración obligatoria (Reglamento UE 1169/2011)
export const ALERGENOS = ['gluten', 'crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'lacteos', 'frutos-secos', 'apio', 'mostaza', 'sesamo', 'sulfitos', 'altramuces', 'moluscos'] as const;

const platos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/platos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      categoria: z.enum(CATEGORIAS),
      precio: z.number(),
      unidad: z.string(),
      descripcion: z.string(),
      alergenos: z.array(z.enum(ALERGENOS)).default([]),
      vegetariano: z.boolean().default(false),
      vegano: z.boolean().default(false),
      foto: image().optional(),
      fotoAlt: z.string().optional(),
      destacado: z.boolean().default(false),
      orden: z.number(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({ titulo: z.string(), resumen: z.string(), fecha: z.coerce.date(), categoria: z.string(), foto: image(), fotoAlt: z.string(), minutos: z.number() }),
});

const menuDia = defineCollection({
  loader: file('src/content/datos/menu-dia.json'),
  schema: z.object({ dia: z.string(), primeros: z.array(z.string()), segundos: z.array(z.string()), postres: z.array(z.string()), orden: z.number() }),
});

const opiniones = defineCollection({
  loader: file('src/content/datos/opiniones.json'),
  schema: z.object({ nombre: z.string(), contexto: z.string(), texto: z.string() }),
});

const preguntas = defineCollection({
  loader: file('src/content/datos/preguntas.json'),
  schema: z.object({ tema: z.enum(['reservas', 'pedidos', 'alergias', 'grupos', 'general']), pregunta: z.string(), respuesta: z.string() }),
});

export const collections = { platos, blog, menuDia, opiniones, preguntas };

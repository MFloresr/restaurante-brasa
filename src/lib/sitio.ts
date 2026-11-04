// Datos del restaurante. En producción vendrían del CMS (un documento "Ajustes del sitio").
// Todo lo marcado como ejemplo o entre corchetes lo sustituye el cliente con sus datos reales.

export type Horario = { etiqueta: string; tramos: { abre: string; cierra: string }[] };

export const sitio = {
  nombre: 'Brasa Nova',
  eslogan: 'Cocina a la brasa y arroces de temporada',
  descripcion:
    'Restaurante de cocina mediterránea a la brasa: arroces, carnes, producto de temporada y tapas para compartir. Reserva mesa o pide para llevar desde la web.',
  url: 'https://www.brasanova.example',
  // Datos de ejemplo
  telefono: '+34935000000',
  telefonoVisible: '935 00 00 00',
  whatsapp: '34600000000',
  email: 'hola@brasanova.example',
  direccion: { calle: 'Carrer de Mostra, 14', cp: '08012', ciudad: 'Barcelona', provincia: 'Barcelona' },
  mapa: 'https://www.openstreetmap.org/search?query=Barcelona',
  endpointFormularios: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
  iva: 10, // IVA de la restauración en España; el cliente lo confirma con su asesor
  pedidos: { minutosPreparacion: 25, pedidoMinimo: 10 },
  reservas: { maxPersonas: 10, turnos: { comida: ['13:00', '13:30', '14:00', '14:30', '15:00'], cena: ['20:30', '21:00', '21:30', '22:00', '22:30'] } },
  horarios: [
    { etiqueta: 'Martes a jueves', tramos: [{ abre: '13:00', cierra: '16:00' }, { abre: '20:00', cierra: '23:30' }] },
    { etiqueta: 'Viernes y sábados', tramos: [{ abre: '13:00', cierra: '16:30' }, { abre: '20:00', cierra: '00:30' }] },
    { etiqueta: 'Domingos', tramos: [{ abre: '13:00', cierra: '17:00' }] },
    { etiqueta: 'Lunes', tramos: [] },
  ] as Horario[],
  semana: {
    0: [['13:00', '17:00']],
    1: [],
    2: [['13:00', '16:00'], ['20:00', '23:30']],
    3: [['13:00', '16:00'], ['20:00', '23:30']],
    4: [['13:00', '16:00'], ['20:00', '23:30']],
    5: [['13:00', '16:30'], ['20:00', '23:59']],
    6: [['13:00', '16:30'], ['20:00', '23:59']],
  } as Record<number, string[][]>,
  responsableLegal: {
    razonSocial: '[Razón social del cliente]',
    nif: '[NIF]',
    registro: '[Datos del Registro Mercantil]',
    domicilio: 'Carrer de Mostra, 14, 08012 Barcelona',
    licencia: '[Licencia de actividad del local]',
  },
};

export const menu = [
  { href: '/carta/', texto: 'Carta' },
  { href: '/menu-del-dia/', texto: 'Menú del día' },
  { href: '/reservar/', texto: 'Reservar' },
  { href: '/grupos/', texto: 'Grupos' },
  { href: '/alergenos/', texto: 'Alérgenos' },
  { href: '/nosotros/', texto: 'Nosotros' },
  { href: '/contacto/', texto: 'Contacto' },
];

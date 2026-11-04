# Brasa Nova: web de restaurante tipo TPV (ejemplo)

Web de un restaurante hecha con Astro 7, pensada como punto de partida para un cliente real. La idea de diseño es que **la web es la pantalla de un TPV**: barra de estado con reloj y «abierto/cerrado», teselas de colores por categoría y un ticket de papel térmico que se va armando. Todo el contenido (carta, menú del día, opiniones, blog, datos legales) es de ejemplo y sale de archivos que equivalen a los documentos de un CMS, para pasarla a Sanity sin rehacer las páginas.

## Qué incluye (20 páginas)

- **Portada** con tres modos grandes: reservar mesa, pedir para llevar y menú del día.
- **Carta TPV** (`/carta/`): 30 platos en 5 categorías con teselas de color. Tocar un plato lo añade al ticket; el botón «i» abre el detalle con foto, ingredientes y alérgenos. Filtros por vegetariano, vegano y «sin este alérgeno». Ticket con desglose de IVA, pedido mínimo y barra fija en móvil. Los filtros quedan en la dirección.
- **Pedido para llevar**: datos de recogida con franjas calculadas según el horario y el tiempo de preparación, y confirmación con número de pedido (demostración, no cobra).
- **Reservar mesa**: día, comensales con selector, hora por turnos (comida y cena), zona y aviso de día cerrado.
- **Menú del día**, **Grupos y celebraciones** (menús cerrados y formulario), **Alérgenos** (tabla de los 14 alérgenos por plato con resaltado), **Nosotros**, **Contacto** y **Cuaderno de cocina** (3 artículos).
- Aviso legal, condiciones de pedido, privacidad y cookies (plantillas), créditos de las fotos, 404, sitemap y datos estructurados (Restaurant y Menu).

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Platos (30) | `src/content/platos/*.json` |
| Menú del día, opiniones, preguntas | `src/content/datos/*.json` |
| Blog | `src/content/blog/*.md` |
| Datos del restaurante (horario, IVA, turnos) | `src/lib/sitio.ts` |
| Esquemas del contenido y alérgenos | `src/content.config.ts` |
| Acceso al contenido (aquí entra el CMS) | `src/lib/contenido.ts` |
| Ticket (localStorage) | `src/lib/ticket.ts` |
| Diseño | `src/styles/global.css` |
| Fotos | `src/assets/fotos/` · créditos en `src/lib/creditos.json` |

## Pasar el contenido a un CMS (Sanity)

Las páginas solo llaman a `src/lib/contenido.ts`. Hay que crear los tipos `plato`, `menuDia`, `entrada`, `opinion`, `pregunta` y un documento único `ajustes`, con los mismos campos que `src/content.config.ts`, y reescribir `contenido.ts` con consultas GROQ. Un webhook de Sanity que lance un nuevo despliegue al publicar completa el circuito. El restaurante podría cambiar un precio o marcar un plato como agotado desde el CMS.

## Alérgenos: lo importante

Cada plato declara sus alérgenos entre los 14 de declaración obligatoria (Reglamento UE 1169/2011). **Los datos de esta demo son inventados**: el cliente debe verificarlos plato por plato con su cocina y mantenerlos al día cada vez que cambie una receta o un proveedor. La web avisa de que no puede garantizar la ausencia total de trazas.

## Datos de salud (alergias)

Una alergia indicada en un formulario es un dato de salud (categoría especial del RGPD). Cómo se trata:

- El campo «Alergias o intolerancias» es **opcional**.
- Solo si el visitante escribe algo aparece una **casilla de consentimiento explícito**, distinta de la de privacidad, que pasa a ser obligatoria.
- La política de privacidad lo explica.

## Cobrar de verdad (pendiente)

Hoy el pedido no cobra nada ni se envía a ninguna cocina. Para operar de verdad hace falta:

1. **Recibir la comanda**: una función en servidor (`PUBLIC_FORM_ENDPOINT` ya recibe el pedido como JSON) que la envíe al TPV o a una pantalla de cocina, con **precios recalculados en el servidor**, no los del navegador.
2. **Pago online** (por ejemplo, Stripe Checkout) o pago al recoger.
3. **Control de capacidad**: limitar pedidos por franja y marcar platos agotados.
4. **Reservas**: guardar las solicitudes y confirmarlas (o conectar un gestor de reservas).

## Antes de entregar al cliente

- [ ] Sustituir datos del restaurante, carta, precios, alérgenos verificados, horarios y fotos propias.
- [ ] Confirmar el IVA aplicable (aquí, 10 %) con su asesor.
- [ ] Rellenar y revisar aviso legal, condiciones de pedido y privacidad con su asesor.
- [ ] Decidir dónde se guardan reservas y pedidos (UE, con contrato de encargado) y los plazos de conservación.
- [ ] Si se añade analítica, mapa embebido o vídeos: actualizar la página de cookies y añadir un aviso con aceptar y rechazar.
- [ ] Cambiar el dominio en `astro.config.mjs`, `sitio.ts` y `robots.txt`.
- [ ] Quitar la franja amarilla «Web de demostración» del pie (`Pie.astro`).

## Fotos

Proceden de Wikimedia Commons (CC0, CC BY y CC BY-SA), con autor y licencia en `/creditos/`. Los platos sin foto se muestran solo como tesela de color, como en un TPV real. Para producción conviene sustituirlas por fotos propias.

## Calidad

Probada con axe-core (WCAG 2.2 A y AA y buenas prácticas): sin violaciones en las 19 páginas, en ordenador y móvil. La web no pone cookies ni contacta con dominios externos; solo guarda el ticket en el navegador para que funcione. Prueba de extremo a extremo (carta, ticket, filtros, detalle, pedido, reserva con consentimiento condicional y alérgenos) en `webs-clientes/_herramientas/flujo-restaurante.cjs`.

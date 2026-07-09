# Nueva misión desbloqueada 🕸️

Invitación al cine en formato de mini-cómic interactivo (portada + 4 viñetas + ticket + pregunta final). HTML, CSS y JavaScript puro, sin frameworks ni build step.

## Estructura de archivos

```
SPIDERMAN/
├── index.html          # Estructura de las 9 pantallas (portada, 4 viñetas, ticket, pregunta, aceptado, rechazado)
├── styles.css          # Estética cómic: bordes gruesos, halftone, globos, animaciones
├── app.js              # Navegación entre viñetas, confeti, WhatsApp, telaraña animada
├── config.js           # ← ÚNICO archivo que necesitas editar para personalizar textos/datos
├── assets/img/         # ← Aquí pones tu propia imagen para el efecto "columpio" (opcional)
└── README.md
```

No hay backend, ni dependencias, ni paso de compilación. Abrir `index.html` (o servirlo con cualquier servidor estático) es suficiente.

## Cómo personalizar (fecha, hora, cine, nombres, WhatsApp)

Abre **`config.js`** y edita solo estos valores:

```js
window.invitation = {
  movie: "Spider-Man",
  date: "Sábado 20 de julio",
  time: "19:30",
  place: "Supercines",
  plan: "Película + canguil",
  inviterName: "Tu nombre",
  guestName: "Invitado especial",

  // Número de WhatsApp en formato internacional, SIN "+", espacios ni guiones.
  // Ejemplo Ecuador: "593987654321"  |  Ejemplo México: "5215512345678"
  // Si lo dejas vacío (""), el botón abre el selector de contactos de WhatsApp.
  whatsappNumber: "",

  whatsappMessage: "Acepto la misión, vamos a ver Spider-Man 🕷️🍿",
};
```

- `date`, `time`, `place`, `plan` → se muestran en el ticket final (viñeta 5).
- `inviterName` → si lo cambias (distinto de `"Tu nombre"`), la pregunta final se personaliza a `"¿Aceptas ir al cine con {inviterName}?"`.
- `guestName` → aparece como "Para: {guestName}" en el ticket.
- `whatsappNumber` / `whatsappMessage` → arman el link `https://wa.me/...` del botón "Confirmar por WhatsApp" en la pantalla de aceptación.

No necesitas tocar `index.html`, `styles.css` ni `app.js` para estos cambios.

### Cambios opcionales de texto

Si quieres editar las frases de las viñetas, los diálogos o las onomatopeyas ("THWIP!", "POW!", "TAP!"), están directamente en `index.html`, dentro de cada `<section class="screen" ...>`.

## Efecto "columpio" (imagen que cruza la pantalla)

De fondo, detrás de las tarjetas, hay un elemento que cuelga de un hilo de telaraña y cruza la pantalla de lado a lado en bucle (cada ~10 segundos). Por defecto no se ve nada porque no trae ninguna imagen incluida — es un espacio en blanco listo para tu propio dibujo.

Para activarlo:

1. Consigue un PNG con **fondo transparente** de la figura que quieras que se columpie (tú la descargas; yo no incluyo ni enlazo imágenes de Spider-Man por temas de derechos de autor — ver nota abajo).
2. Guárdalo exactamente como:
   ```
   assets/img/spiderman-swing.png
   ```
3. Listo, no hay que tocar código. Al recargar la página, la imagen aparece colgando del hilo y cruzando la pantalla.

Si el archivo no existe, la web funciona igual — el hilo y la imagen simplemente no aparecen (no se rompe nada, no se ve un ícono roto).

Recomendaciones para la imagen: recorte ajustado a la figura, ancho ~300-500px, peso ligero (<300 KB), y una pose que se vea bien tanto viajando hacia la izquierda como hacia la derecha (el mismo archivo se usa en ambos sentidos, no se voltea automáticamente).

**Nota sobre derechos de autor:** si usas una imagen real de Spider-Man (arte oficial, capturas, fan art del traje reconocible), ten en cuenta que es propiedad de Marvel/Disney. Para una invitación privada que solo verá una persona el riesgo práctico es mínimo, pero si vas a subir la página a un dominio público (GitHub Pages, Netlify, etc.) técnicamente estás redistribuyendo esa imagen. La decisión y el archivo son tuyos — el código solo te deja el espacio listo.

## Probarlo en local

No necesitas nada especial, pero por CORS/fetch de fuentes es mejor usar un servidor local en vez de abrir el archivo directo con `file://`:

```bash
# Con Python
python -m http.server 8080

# o con Node
npx serve .
```

Luego abre `http://localhost:8080`.

## Desplegar

### GitHub Pages
1. Crea un repositorio nuevo y sube estos archivos (`git init`, `git add .`, `git commit`, `git push`).
2. En GitHub: **Settings → Pages → Source**, selecciona la rama `main` y carpeta `/ (root)`.
3. En un par de minutos la web queda publicada en `https://<tu-usuario>.github.io/<repo>/`.

### Netlify
1. Ve a [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**.
2. Arrastra la carpeta del proyecto (o conecta el repositorio de GitHub para despliegue automático en cada push).
3. Netlify detecta que es un sitio estático y lo publica sin configuración adicional.

### Vercel
1. Ve a [vercel.com/new](https://vercel.com/new) e importa el repositorio de GitHub.
2. Framework preset: **Other / Static**. No hay build command ni output directory que configurar.
3. Deploy — listo.

Cualquiera de las tres opciones es gratuita y suficiente para este proyecto (sin backend).

## Notas de diseño

- Fuente de títulos/onomatopeyas: **Bangers** (Google Fonts, genérica de cómic, sin relación con ningún personaje registrado).
- Todos los íconos (carrete, asiento, silueta, telaraña) son SVG dibujados a mano en el propio HTML — no hay imágenes ni assets con copyright.
- Animaciones: entrada de viñeta con zoom leve, aparición progresiva de globos/botones, telaraña de fondo con balanceo sutil, confeti + trazo de telaraña al aceptar la misión.
- Respeta `prefers-reduced-motion`: si el usuario tiene animaciones reducidas activadas en su sistema, se desactivan los efectos no esenciales.

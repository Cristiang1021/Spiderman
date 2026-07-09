# AGENTS.md

## Proyecto
Crear una landing page interactiva, romántica y divertida para invitar a alguien al cine a ver Spider-Man.

La idea es que la página funcione como una invitación especial tipo “misión secreta”, con estética cinematográfica inspirada en superhéroes arácnidos, sin usar logos oficiales, imágenes protegidas o personajes exactos de Spider-Man.

## Objetivo
Construir una web responsive, principalmente pensada para móvil, donde una persona pueda enviar un enlace a alguien que le gusta para invitarle al cine.

La experiencia debe sentirse como:
- Una entrada de cine digital.
- Una misión secreta desbloqueada.
- Una invitación tierna, divertida y no demasiado intensa.

## Estilo visual
Usar una estética moderna, premium y cinematográfica.

Referencias visuales:
- Fondo oscuro.
- Ciudad nocturna desenfocada.
- Luces rojas y azules.
- Telarañas sutiles.
- Efectos tipo glassmorphism.
- Tarjeta central estilo boleto de cine.
- Botones grandes y claros.
- Animaciones suaves.

Evitar:
- Estilo infantil.
- Diseño sobrecargado.
- Logos oficiales de Spider-Man.
- Imágenes con copyright.
- Personajes exactos o trajes reconocibles.
- Demasiado texto en pantalla.

## Flujo de la página

### 1. Pantalla inicial
Mostrar una pantalla de bienvenida con el texto:

“Nueva misión desbloqueada”

Debajo:

“Tienes una invitación especial…”

Debe haber una animación suave de entrada, como fade-in o slide-up.

### 2. Secuencia de frases
Mostrar frases una por una, como si la web estuviera contando una pequeña historia:

- “Hay una película pendiente…”
- “Una ciudad que salvar…”
- “Un asiento vacío en el cine…”
- “Y una persona que debería acompañarme…”

Las frases deben aparecer con animaciones suaves.

### 3. Ticket de cine
Mostrar una tarjeta central estilo boleto digital.

Contenido del boleto:

Película: Spider-Man  
Fecha: [fecha]  
Hora: [hora]  
Lugar: [cine]  
Plan: película + canguil

El ticket debe verse elegante, con bordes redondeados, sombra suave, textura sutil y detalles decorativos tipo entrada de cine.

### 4. Pregunta final
Mostrar el texto principal:

“¿Aceptas ir conmigo al cine?”

Debajo colocar dos botones:

- “Sí, acepto la misión”
- “Necesito pensarlo…”

### 5. Respuesta al aceptar
Cuando el usuario toque “Sí, acepto la misión”, mostrar una pantalla o modal de confirmación:

“Misión aceptada 🕷️🍿”

Debajo:

“Prepárate para la película, el canguil y una buena excusa para pasarla bien.”

Opcional:
- Mostrar confeti.
- Mostrar una pequeña animación de telarañas.
- Abrir WhatsApp con un mensaje predeterminado.

Mensaje sugerido para WhatsApp:

“Acepto la misión, vamos a ver Spider-Man 🕷️🍿”

### 6. Respuesta al rechazar o pensarlo
Cuando el usuario toque “Necesito pensarlo…”, mostrar algo divertido, sin presionar:

“El multiverso respetará tu decisión… aunque el Spider-Sense esperaba un sí 😔”

Añadir un botón secundario:

“Bueno, acepto la misión”

## Requisitos funcionales

- Debe ser responsive.
- Optimizar primero para móvil.
- Debe cargar rápido.
- No usar backend obligatorio.
- Puede hacerse con HTML, CSS y JavaScript puro.
- También puede hacerse con React, Next.js o Vite si el contexto lo requiere.
- La respuesta del usuario puede manejarse solo en frontend.
- Si se usa WhatsApp, generar link con mensaje prellenado.

## Animaciones
Usar animaciones sutiles:

- Fade-in.
- Slide-up.
- Glow suave.
- Movimiento leve de partículas.
- Aparición progresiva de frases.
- Efecto hover/tap en botones.
- Confeti al aceptar.

No usar animaciones exageradas ni pesadas.

## Textos principales

Título superior:

“Nueva misión desbloqueada”

Frase principal:

“¿Aceptas ir conmigo al cine?”

Texto narrativo:

“Tienes una nueva misión.

La ciudad está tranquila, el multiverso parece estable… pero hay una película pendiente.

Spider-Man llega al cine, y hay un asiento que no debería quedarse vacío.

Por eso, esta invitación es oficialmente para ti.”

Datos del boleto:

Película: Spider-Man  
Fecha: [fecha]  
Hora: [hora]  
Lugar: [cine]  
Plan: película + canguil

Botón positivo:

“Sí, acepto la misión”

Botón secundario:

“Necesito pensarlo…”

Confirmación:

“Misión aceptada 🕷️🍿”

## Personalización
Dejar fácil de editar estas variables:

```js
const invitation = {
  movie: "Spider-Man",
  date: "Sábado 20 de julio",
  time: "19:30",
  place: "Supercines",
  plan: "Película + canguil",
  inviterName: "Tu nombre",
  guestName: "Invitado especial",
  whatsappNumber: "",
  whatsappMessage: "Acepto la misión, vamos a ver Spider-Man 🕷️🍿"
};
(() => {
  "use strict";

  /* ---------------------------------------------
   * 0. Reduced motion support
   * ------------------------------------------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------
   * 1. Rellenar datos desde config.js
   * ------------------------------------------- */
  function fillInvitationData() {
    const data = window.invitation || {};
    const guest = data.guestName || "Invitado especial";

    setText("ticket-movie", data.movie || "Spider-Man");
    setText("ticket-date", data.date || "Por confirmar");
    setText("ticket-time", data.time || "Por confirmar");
    setText("ticket-place", data.place || "Por confirmar");
    setText("ticket-plan", data.plan || "Película + canguil");
    setText("ticket-guest", "Para: " + guest);
    setText(
      "ticket-code",
      "#SM-" + String(hashCode(guest + (data.date || ""))).padStart(4, "0")
    );

    setText(
      "question-text",
      data.inviterName && data.inviterName !== "Tu nombre"
        ? `¿Aceptas ir al cine con ${data.inviterName}?`
        : "¿Aceptas ir conmigo al cine?"
    );

    const whatsappBtn = document.getElementById("btn-whatsapp");
    const message = data.whatsappMessage || "Acepto la misión, vamos a ver Spider-Man 🕷️🍿";
    const encoded = encodeURIComponent(message);
    const number = (data.whatsappNumber || "").replace(/\D/g, "");
    whatsappBtn.href = number
      ? `https://wa.me/${number}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 10000;
  }

  /* ---------------------------------------------
   * 2. Navegación entre viñetas
   * ------------------------------------------- */
  const screens = Array.from(document.querySelectorAll(".screen"));
  const app = document.getElementById("app");
  const pageCounter = document.getElementById("page-counter");

  // Orden principal del cómic (las pantallas de respuesta se navegan aparte)
  const order = ["cover", "panel1", "panel2", "panel3", "panel4", "ticket", "question"];
  const pageLabels = {
    cover: "PORTADA",
    panel1: "PÁG. 1/6",
    panel2: "PÁG. 2/6",
    panel3: "PÁG. 3/6",
    panel4: "PÁG. 4/6",
    ticket: "PÁG. 5/6",
    question: "PÁG. 6/6",
  };

  function showScreen(name) {
    screens.forEach((screen) => {
      const isTarget = screen.dataset.screen === name;
      screen.classList.toggle("is-active", isTarget);
      screen.setAttribute("aria-hidden", isTarget ? "false" : "true");
      if (isTarget) playReveal(screen);
    });

    pageCounter.textContent = pageLabels[name] || "";
    pageCounter.style.display = pageLabels[name] ? "block" : "none";

    if (name === "accepted") celebrate();
    handleScreenAudio(name);

    app.scrollTop = 0;
  }

  function playReveal(scope) {
    const items = scope.querySelectorAll(".reveal");
    items.forEach((el) => {
      el.classList.remove("is-visible");
      const delay = prefersReducedMotion ? 0 : Number(el.dataset.delay || 0);
      window.requestAnimationFrame(() => {
        setTimeout(() => el.classList.add("is-visible"), delay);
      });
    });
  }

  // Botones con [data-next] avanzan a la siguiente viñeta en `order`
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = btn.closest(".screen").dataset.screen;
      const idx = order.indexOf(current);
      const next = order[idx + 1];
      if (next) showScreen(next);
    });
  });

  document
    .getElementById("btn-accept")
    .addEventListener("click", () => showScreen("accepted"));

  document
    .getElementById("btn-decline")
    .addEventListener("click", () => showScreen("declined"));

  document
    .getElementById("btn-decline-accept")
    .addEventListener("click", () => showScreen("accepted"));

  document.getElementById("btn-restart").addEventListener("click", () => {
    showScreen("cover");
  });

  /* ---------------------------------------------
   * 3. Partículas de fondo (ciudad nocturna)
   * ------------------------------------------- */
  function buildParticles() {
    if (prefersReducedMotion) return;
    const container = document.getElementById("particles");
    const count = window.innerWidth < 600 ? 12 : 22;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "particle";
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 8}s`;
      dot.style.animationDuration = `${8 + Math.random() * 10}s`;
      dot.style.opacity = String(0.2 + Math.random() * 0.5);
      container.appendChild(dot);
    }
  }

  /* ---------------------------------------------
   * 4. Confeti (canvas ligero, sin dependencias)
   * ------------------------------------------- */
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let confettiParticles = [];
  let confettiRAF = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const confettiColors = ["#e8352c", "#2b6cff", "#ffd75e", "#f5f7fb"];

  function celebrate() {
    if (prefersReducedMotion) return;
    confettiParticles = Array.from({ length: 110 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 10,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: -1.5 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotationSpeed: -6 + Math.random() * 12,
    }));

    const start = performance.now();
    const duration = 3200;

    function frame(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = now - start;

      confettiParticles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < duration) {
        confettiRAF = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(confettiRAF);
      }
    }

    cancelAnimationFrame(confettiRAF);
    confettiRAF = requestAnimationFrame(frame);
  }

  /* ---------------------------------------------
   * 5. Sonido: música de fondo en loop + efecto al "pensarlo"
   * ------------------------------------------- */
  const audioTheme = document.getElementById("audio-theme");
  const audioSad = document.getElementById("audio-sad");
  const soundToggle = document.getElementById("sound-toggle");

  let audioMuted = false;
  let audioUnlocked = false;

  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    if (!audioMuted) {
      audioTheme.volume = 0.55;
      audioTheme.play().catch(() => {});
    }
  }
  document.addEventListener("pointerdown", unlockAudio, { once: true });

  function handleScreenAudio(name) {
    if (name === "declined") {
      audioTheme.pause();
      if (!audioMuted) {
        audioSad.currentTime = 0;
        audioSad.play().catch(() => {});
      }
    } else {
      audioSad.pause();
      if (audioUnlocked && !audioMuted) {
        audioTheme.play().catch(() => {});
      }
    }
  }

  audioSad.addEventListener("ended", () => {
    if (audioUnlocked && !audioMuted) {
      audioTheme.play().catch(() => {});
    }
  });

  soundToggle.addEventListener("click", () => {
    unlockAudio();
    audioMuted = !audioMuted;
    soundToggle.textContent = audioMuted ? "🔇" : "🔊";
    soundToggle.setAttribute("aria-pressed", String(audioMuted));
    soundToggle.setAttribute(
      "aria-label",
      audioMuted ? "Activar música" : "Silenciar música"
    );

    if (audioMuted) {
      audioTheme.pause();
      audioSad.pause();
    } else {
      const current = document.querySelector(".screen.is-active");
      handleScreenAudio(current ? current.dataset.screen : "cover");
    }
  });

  /* ---------------------------------------------
   * 6. Init
   * ------------------------------------------- */
  fillInvitationData();
  buildParticles();
  showScreen("cover");
})();

// ============================================================
// TRÓPIKA — interruptor de sabor (Mango en lata / Piña en tetrapak)
// Autocontenido: solo agrega <script src="script.js"></script>
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const showcase = document.querySelector(".showcase");
  const chips = document.querySelectorAll(".chip-sabor");
  const tituloPalabra = document.querySelector(".palabra-sabor");
  const caption = document.querySelector(".visual-caption");

  if (!showcase || !chips.length) return;

  // Contenido que cambia según el sabor activo
  const contenido = {
    mango: {
      palabra: "envase",
      caption: "Lata 330 ml — mango de altura",
      datos: {
        ml: "330 ml",
        fruta: "62%",
        azucar: "Sin añadir"
      },
      acento1: "--mango-1",
      acento2: "--mango-2",
      glow: "--mango-glow"
    },
    pina: {
      palabra: "formato",
      caption: "Tetrapak 1 L — piña recién exprimida",
      datos: {
        ml: "1 L",
        fruta: "70%",
        azucar: "Sin añadir"
      },
      acento1: "--pina-1",
      acento2: "--pina-2",
      glow: "--pina-glow"
    }
  };

  function aplicarSabor(sabor) {
    const data = contenido[sabor];
    if (!data) return;

    // 1. Actualiza el atributo que controla qué envase se ve (CSS puro)
    showcase.setAttribute("data-sabor", sabor);

    // 2. Cambia las variables de acento activo → todo lo que usa
    //    var(--acento-1/2/glow) transiciona solo, vía CSS.
    const raiz = document.documentElement;
    raiz.style.setProperty("--acento-1", `var(${data.acento1})`);
    raiz.style.setProperty("--acento-2", `var(${data.acento2})`);
    raiz.style.setProperty("--acento-glow", `var(${data.glow})`);

    // 3. Textos dinámicos
    if (tituloPalabra) tituloPalabra.textContent = data.palabra;
    if (caption) caption.textContent = data.caption;

    // 4. Datos rápidos (330ml/62%/... vs 1L/70%/...)
    Object.entries(data.datos).forEach(([clave, valor]) => {
      const el = document.querySelector(`[data-dato="${clave}"]`);
      if (el) el.textContent = valor;
    });

    // 5. Color del divisor "cáscara" según el sabor
    const cascara = document.querySelector(".cascara-path");
    if (cascara) {
      cascara.style.fill = "var(--bg-alt)";
    }

    // 6. Marca visualmente el chip activo + accesibilidad
    chips.forEach((chip) => {
      const esEsteActivo = chip.dataset.sabor === sabor;
      chip.classList.toggle("activo", esEsteActivo);
      chip.setAttribute("aria-selected", esEsteActivo ? "true" : "false");
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => aplicarSabor(chip.dataset.sabor));
  });

  // Los botones del CTA también cambian el sabor activo antes de "pedir"
  document.querySelectorAll("[data-sabor-cta]").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      aplicarSabor(boton.dataset.saborCta);
    });
  });

  // Estado inicial
  aplicarSabor("mango");
});

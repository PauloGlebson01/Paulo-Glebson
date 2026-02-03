/* ===============================
   SOFTPOWER – SCRIPT OFICIAL
   Menu | Dark/Light | Reveal | Carousel | Share Modal
================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     MENU LATERAL
  ================================================== */
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("open");
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        sidebar.classList.remove("open");
      }
    });

    // Fecha ao clicar nos links
    document.querySelectorAll(".sidebar-nav a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    });
  }

  /* ==================================================
     DARK / LIGHT MODE
  ================================================== */
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "dark";

  document.body.classList.add(savedTheme);

  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";

    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";

      document.body.classList.remove("dark", "light");
      document.body.classList.add(newTheme);

      localStorage.setItem("theme", newTheme);
      themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
    });
  }

  /* ==================================================
     SCROLL REVEAL
  ================================================== */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("load", revealOnScroll);
  window.addEventListener("scroll", revealOnScroll);

  /* ==================================================
     PORTFÓLIO – CAROUSEL AUTOMÁTICO
  ================================================== */
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = track?.querySelectorAll("img") || [];
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    if (!track || slides.length <= 1) return;

    let index = 0;
    let interval;
    const delay = 5000;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const nextSlide = () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    };

    const prevSlide = () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    const startAuto = () => {
      interval = setInterval(nextSlide, delay);
    };

    const stopAuto = () => {
      clearInterval(interval);
    };

    nextBtn?.addEventListener("click", () => {
      stopAuto();
      nextSlide();
      startAuto();
    });

    prevBtn?.addEventListener("click", () => {
      stopAuto();
      prevSlide();
      startAuto();
    });

    ["mouseenter", "touchstart"].forEach(evt =>
      carousel.addEventListener(evt, stopAuto)
    );

    ["mouseleave", "touchend"].forEach(evt =>
      carousel.addEventListener(evt, startAuto)
    );

    startAuto();
  });

  /* ==================================================
     COMPARTILHAMENTO – CARTÃO DIGITAL
  ================================================== */
  const cardLink = "https://paulo-glebson.vercel.app";

  const shareBtn = document.getElementById("shareBtn");
  const shareModal = document.getElementById("shareModal");
  const closeShare = document.getElementById("closeShare");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const shareLinkBtn = document.getElementById("shareLinkBtn");

  shareBtn?.addEventListener("click", () => {
    shareModal.style.display = "flex";
  });

  closeShare?.addEventListener("click", () => {
    shareModal.style.display = "none";
  });

  shareModal?.addEventListener("click", (e) => {
    if (e.target === shareModal) {
      shareModal.style.display = "none";
    }
  });

  copyLinkBtn?.addEventListener("click", async () => {
    const message = `Confira meu cartão digital profissional: ${cardLink}`;
    try {
      await navigator.clipboard.writeText(message);
      alert("Mensagem copiada com sucesso!");
    } catch {
      alert("Erro ao copiar o link.");
    }
  });

  shareLinkBtn?.addEventListener("click", async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Cartão Digital Profissional",
        text: "Confira meu cartão digital profissional:",
        url: cardLink
      });
    } else {
      const fallback = `Confira meu cartão digital profissional: ${cardLink}`;
      await navigator.clipboard.writeText(fallback);
      alert("Compartilhamento não suportado. Link copiado!");
    }
  });

});

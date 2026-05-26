const revealElements = document.querySelectorAll(
  ".section-heading, .cv-card, .metric-card, .strength-card, .timeline-card, .credential-card, .final-note, .footer"
);

revealElements.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const timeline = document.querySelector("[data-experience-timeline]");

if (timeline) {
  const selectors = Array.from(timeline.querySelectorAll(".timeline-selector"));
  const cards = Array.from(timeline.querySelectorAll("[data-timeline-card]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setActiveCard = (cardId) => {
    cards.forEach((card) => {
      card.classList.toggle("is-active", card.id === cardId);
    });

    selectors.forEach((selector) => {
      const isActive = selector.dataset.target === cardId;
      selector.classList.toggle("is-active", isActive);

      if (isActive) {
        selector.setAttribute("aria-current", "step");
      } else {
        selector.removeAttribute("aria-current");
      }
    });
  };

  selectors.forEach((selector) => {
    selector.addEventListener("click", () => {
      const targetCard = document.getElementById(selector.dataset.target);

      if (!targetCard) {
        return;
      }

      setActiveCard(targetCard.id);
      targetCard.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "center"
      });
    });
  });

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCard(entry.target.id);
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-25% 0px -35% 0px"
    }
  );

  cards.forEach((card) => timelineObserver.observe(card));
}

const revealElements = document.querySelectorAll(
  ".section-heading, .hero-copy, .hero-visual, .proof-card, .principle-card, .case-card, .competency-card, .next-chapter, .footer"
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

const revealElements = document.querySelectorAll(
  ".section-heading, .profile-card, .experience-card, .impact-card, .metric, .outcome-card, .skills-card, .quote-section"
);

revealElements.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));

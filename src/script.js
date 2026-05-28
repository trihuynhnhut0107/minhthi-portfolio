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

const pdfDialog = document.querySelector(".pdf-dialog");
const pdfDialogTitle = document.querySelector("#pdf-dialog-title");
const pdfDialogFrame = document.querySelector(".pdf-dialog-frame");
const pdfExternalLink = document.querySelector(".pdf-external-link");
const pdfCloseButton = document.querySelector(".pdf-dialog-close");

if (pdfDialog && pdfDialogTitle && pdfDialogFrame && pdfExternalLink && pdfCloseButton) {
  document.querySelectorAll(".pdf-card").forEach((card) => {
    card.addEventListener("click", () => {
      pdfDialogTitle.textContent = card.dataset.title;
      pdfDialogFrame.src = card.dataset.pdf;
      pdfExternalLink.href = card.dataset.link;
      pdfDialog.showModal();
    });
  });

  pdfCloseButton.addEventListener("click", () => pdfDialog.close());

  pdfDialog.addEventListener("click", (event) => {
    if (event.target === pdfDialog) {
      pdfDialog.close();
    }
  });

  pdfDialog.addEventListener("close", () => {
    pdfDialogFrame.src = "";
  });
}

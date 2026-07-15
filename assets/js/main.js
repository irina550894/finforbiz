document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        item.classList.toggle("is-open");
    });
});

document.querySelectorAll("[data-carousel]").forEach((viewport) => {
    const id = viewport.dataset.carousel;
    const track = viewport.querySelector(".carousel-track");
    const slides = Array.from(viewport.querySelectorAll(".carousel-slide"));
    const dotsContainer = document.querySelector(`[data-carousel-dots="${id}"]`);
    const prevButton = document.querySelector(`[data-carousel-prev="${id}"]`);
    const nextButton = document.querySelector(`[data-carousel-next="${id}"]`);
    let currentIndex = 0;
    let startX = 0;
    let isPointerDown = false;

    if (!track || slides.length === 0) return;

    const dots = slides.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Показать слайд ${index + 1}`);
        dot.addEventListener("click", () => setSlide(index));
        dotsContainer?.appendChild(dot);
        return dot;
    });

    function setSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === currentIndex);
        });
    }

    prevButton?.addEventListener("click", () => setSlide(currentIndex - 1));
    nextButton?.addEventListener("click", () => setSlide(currentIndex + 1));

    viewport.addEventListener("pointerdown", (event) => {
        isPointerDown = true;
        startX = event.clientX;
        viewport.setPointerCapture?.(event.pointerId);
    });

    viewport.addEventListener("pointerup", (event) => {
        if (!isPointerDown) return;
        const deltaX = event.clientX - startX;
        isPointerDown = false;
        if (Math.abs(deltaX) > 42) {
            setSlide(currentIndex + (deltaX < 0 ? 1 : -1));
        }
    });

    viewport.addEventListener("pointercancel", () => {
        isPointerDown = false;
    });

    setSlide(0);
});

const portfolioGalleries = {
    calculators: {
        title: "Калькуляторы",
        items: [
            {
                src: "./assets/images/portfolio/calculator-kpi.jpg",
                caption: "Калькулятор KPI"
            },
            {
                src: "./assets/images/portfolio/calculator-taxes-1.jpg",
                caption: "Налоговый калькулятор"
            },
            {
                src: "./assets/images/portfolio/calculator-taxes-2.jpg",
                caption: "Сравнение налоговой нагрузки"
            }
        ]
    },
    models: {
        title: "Финансовые модели",
        items: [
            {
                src: "./assets/images/portfolio/financial-model-1.jpg",
                caption: "Финансовая модель: экран 1"
            },
            {
                src: "./assets/images/portfolio/financial-model-2.jpg",
                caption: "Финансовая модель: экран 2"
            },
            {
                src: "./assets/images/portfolio/financial-model-3.jpg",
                caption: "Финансовая модель: экран 3"
            },
            {
                src: "./assets/images/portfolio/financial-model-4.jpg",
                caption: "Финансовая модель: экран 4"
            }
        ]
    }
};

const portfolioModal = document.querySelector("#portfolio-modal");
const portfolioModalTitle = document.querySelector("#portfolio-modal-title");
const portfolioModalImage = document.querySelector("#portfolio-modal-image");
const portfolioModalCaption = document.querySelector("#portfolio-modal-caption");
const portfolioModalCounter = document.querySelector("#portfolio-modal-counter");
const portfolioPrev = document.querySelector("[data-gallery-prev]");
const portfolioNext = document.querySelector("[data-gallery-next]");
let activeGallery = null;
let activeGalleryIndex = 0;
let modalStartX = 0;

function renderPortfolioModal() {
    if (!activeGallery || !portfolioModalImage) return;

    const item = activeGallery.items[activeGalleryIndex];
    portfolioModalTitle.textContent = activeGallery.title;
    portfolioModalImage.src = item.src;
    portfolioModalImage.alt = item.caption;
    portfolioModalCaption.textContent = item.caption;
    portfolioModalCounter.textContent = `${activeGalleryIndex + 1} / ${activeGallery.items.length}`;
}

function setPortfolioSlide(index) {
    if (!activeGallery) return;
    activeGalleryIndex = (index + activeGallery.items.length) % activeGallery.items.length;
    renderPortfolioModal();
}

function openPortfolioGallery(galleryId) {
    activeGallery = portfolioGalleries[galleryId];
    if (!activeGallery || !portfolioModal) return;

    activeGalleryIndex = 0;
    renderPortfolioModal();
    portfolioModal.classList.add("is-open");
    portfolioModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closePortfolioGallery() {
    if (!portfolioModal) return;

    portfolioModal.classList.remove("is-open");
    portfolioModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeGallery = null;
}

document.querySelectorAll("[data-gallery]").forEach((button) => {
    button.addEventListener("click", () => openPortfolioGallery(button.dataset.gallery));
});

document.querySelectorAll("[data-gallery-close]").forEach((button) => {
    button.addEventListener("click", closePortfolioGallery);
});

portfolioPrev?.addEventListener("click", () => setPortfolioSlide(activeGalleryIndex - 1));
portfolioNext?.addEventListener("click", () => setPortfolioSlide(activeGalleryIndex + 1));

portfolioModal?.addEventListener("pointerdown", (event) => {
    modalStartX = event.clientX;
});

portfolioModal?.addEventListener("pointerup", (event) => {
    if (!activeGallery) return;
    const deltaX = event.clientX - modalStartX;
    if (Math.abs(deltaX) > 48) {
        setPortfolioSlide(activeGalleryIndex + (deltaX < 0 ? 1 : -1));
    }
});

document.addEventListener("keydown", (event) => {
    if (!activeGallery) return;
    if (event.key === "Escape") closePortfolioGallery();
    if (event.key === "ArrowLeft") setPortfolioSlide(activeGalleryIndex - 1);
    if (event.key === "ArrowRight") setPortfolioSlide(activeGalleryIndex + 1);
});

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formNote.textContent = "Visual prototype is ready. Real email and Telegram delivery will be connected during the backend stage.";
        formNote.classList.add("is-success");
    });
}

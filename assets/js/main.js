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

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formNote.textContent = "Visual prototype is ready. Real email and Telegram delivery will be connected during the backend stage.";
        formNote.classList.add("is-success");
    });
}

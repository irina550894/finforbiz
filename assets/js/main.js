document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        item.classList.toggle("is-open");
    });
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

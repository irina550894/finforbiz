const defaultPortfolioGalleries = {
    reports: {
        title: "Отчеты",
        items: [
            {
                src: "./assets/images/portfolio/dashboard-report-01.jpg",
                caption: "Дашборд: отчет 1"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-02.jpg",
                caption: "Дашборд: отчет 2"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-03.jpg",
                caption: "Дашборд: отчет 3"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-04.jpg",
                caption: "Дашборд: отчет 4"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-05.jpg",
                caption: "Дашборд: отчет 5"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-06.jpg",
                caption: "Дашборд: отчет 6"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-07.jpg",
                caption: "Дашборд: отчет 7"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-08.jpg",
                caption: "Дашборд: отчет 8"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-09.jpg",
                caption: "Дашборд: отчет 9"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-10.jpg",
                caption: "Дашборд: отчет 10"
            },
            {
                src: "./assets/images/portfolio/dashboard-report-11.jpg",
                caption: "Дашборд: отчет 11"
            }
        ]
    },
    calculators: {
        title: "Калькуляторы",
        items: [
            {
                src: "./assets/images/portfolio/calculator-kpi.jpg",
                caption: "Калькулятор KPI",
                externalUrl: "https://kpicalk.finforbiz.pro/",
                externalLabel: "Открыть калькулятор"
            },
            {
                src: "./assets/images/portfolio/calculator-taxes-1.jpg",
                caption: "Налоговый калькулятор",
                externalUrl: "https://ncalk.finforbiz.pro/",
                externalLabel: "Открыть калькулятор"
            },
            {
                src: "./assets/images/portfolio/calculator-taxes-2.jpg",
                caption: "Сравнение налоговой нагрузки",
                externalUrl: "https://ncalk.finforbiz.pro/",
                externalLabel: "Открыть калькулятор"
            }
        ]
    },
    models: {
        title: "Финансовые модели",
        externalUrl: "https://finmodel.finforbiz.pro/",
        externalLabel: "Открыть модель",
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
    },
    automation: {
        title: "Сервисы под задачи",
        items: [
            {
                src: "./assets/images/portfolio/service-projects.png",
                caption: "Сервис проектов: общая сводка"
            },
            {
                type: "video",
                src: "./assets/videos/portfolio/service-projects.mp4",
                poster: "./assets/images/portfolio/service-projects.png",
                caption: "Сервис проектов: видеообзор"
            }
        ]
    }
};

let portfolioGalleries = { ...defaultPortfolioGalleries };

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function fetchJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }
    return response.json();
}

function renderServices(services) {
    const grid = document.querySelector("[data-services-grid]");
    if (!grid || !Array.isArray(services) || services.length === 0) return;

    grid.innerHTML = services.map((service) => {
        const cardClass = service.featured ? "price-card featured" : "price-card";
        const buttonClass = service.ctaStyle === "primary" ? "btn btn-primary" : "btn btn-secondary";
        const period = service.period ? ` <small>${escapeHtml(service.period)}</small>` : "";
        const items = Array.isArray(service.items) ? service.items : [];

        return `
            <article class="${cardClass}">
                <span class="tag">${escapeHtml(service.tag)}</span>
                <h3>${escapeHtml(service.title)}</h3>
                <strong class="price">${escapeHtml(service.price)}${period}</strong>
                ${service.description ? `<p class="price-card__description">${escapeHtml(service.description)}</p>` : ""}
                <ul>
                    ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
                <a class="${buttonClass}" href="${escapeHtml(service.ctaHref || "#contacts")}">${escapeHtml(service.ctaLabel || "Обсудить")}</a>
            </article>
        `;
    }).join("");
}

function renderCases(cases) {
    const track = document.querySelector("[data-cases-track]");
    if (!track || !Array.isArray(cases) || cases.length === 0) return;

    track.innerHTML = cases.map((item) => {
        const hasDetailedLayout = item.action || item.resultValue || item.ownerBenefit;
        const body = hasDetailedLayout
            ? `
                ${item.action ? `<p class="case-card__detail"><strong>Что сделала:</strong> ${escapeHtml(item.action)}</p>` : ""}
                ${item.resultValue ? `
                    <div class="case-card__result">
                        <strong>${escapeHtml(item.resultValue)}</strong>
                        ${item.resultLabel ? `<span>${escapeHtml(item.resultLabel)}</span>` : ""}
                    </div>
                ` : ""}
                ${item.ownerBenefit ? `<p class="case-card__detail"><strong>Для собственника:</strong> ${escapeHtml(item.ownerBenefit)}</p>` : ""}
            `
            : `<p>${escapeHtml(item.description)}</p>`;

        return `
            <article class="case-card carousel-slide">
                <span>${escapeHtml(item.category)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                ${body}
            </article>
        `;
    }).join("");
}

function renderReviews(reviews) {
    const track = document.querySelector("[data-reviews-track]");
    if (!track || !Array.isArray(reviews) || reviews.length === 0) return;

    track.innerHTML = reviews.map((item) => `
        <article class="case-card review-card carousel-slide">
            <span>${escapeHtml(item.label || "Отзыв")}</span>
            <blockquote>"${escapeHtml(item.quote)}"</blockquote>
            <cite>${escapeHtml(item.author)}${item.role ? `, ${escapeHtml(item.role)}` : ""}</cite>
        </article>
    `).join("");
}

function renderPortfolio(portfolioItems) {
    const grid = document.querySelector("[data-portfolio-grid]");
    if (!grid || !Array.isArray(portfolioItems) || portfolioItems.length === 0) return;

    const galleries = {};

    grid.innerHTML = portfolioItems.map((item) => {
        const isGallery = item.type === "gallery" && Array.isArray(item.images) && item.images.length > 0;
        const themeClass = item.theme === "gradient" ? " gradient" : "";
        const wideClass = item.wide ? " wide" : "";

        if (isGallery) {
            galleries[item.id] = {
                title: item.galleryTitle || item.title,
                items: item.images,
                externalUrl: item.externalUrl || "",
                externalLabel: item.externalLabel || "Открыть"
            };

            return `
                <button class="portfolio-card${themeClass}${wideClass} portfolio-action" type="button" data-gallery="${escapeHtml(item.id)}">
                    <span>${escapeHtml(item.label)}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.description)}</p>
                    <strong>${escapeHtml(item.actionLabel || "Смотреть примеры")}</strong>
                </button>
            `;
        }

        const metrics = Array.isArray(item.metrics) && item.metrics.length > 0
            ? `<div class="mini-table" aria-hidden="true">
                ${item.metrics.map((metric) => `<span>${escapeHtml(metric.label)}</span><strong>${escapeHtml(metric.value)}</strong>`).join("")}
            </div>`
            : "";

        return `
            <article class="portfolio-card${wideClass} portfolio-placeholder">
                <span>${escapeHtml(item.label)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
                ${metrics}
            </article>
        `;
    }).join("");

    portfolioGalleries = Object.keys(galleries).length > 0 ? galleries : { ...defaultPortfolioGalleries };
}

async function hydrateContentFromJson() {
    const loaders = [
        fetchJson("./data/services.json").then(renderServices),
        fetchJson("./data/cases.json").then(renderCases),
        fetchJson("./data/reviews.json").then(renderReviews),
        fetchJson("./data/portfolio.json").then(renderPortfolio)
    ];

    await Promise.allSettled(loaders);
}

function initFaq() {
    document.querySelectorAll(".faq-item button").forEach((button) => {
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");
            item.classList.toggle("is-open");
        });
    });
}

function initCarousels() {
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
        if (dotsContainer) dotsContainer.innerHTML = "";

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
}

function initPortfolioModal() {
    const portfolioModal = document.querySelector("#portfolio-modal");
    const portfolioModalTitle = document.querySelector("#portfolio-modal-title");
    const portfolioModalImage = document.querySelector("#portfolio-modal-image");
    const portfolioModalVideo = document.querySelector("#portfolio-modal-video");
    const portfolioModalCaption = document.querySelector("#portfolio-modal-caption");
    const portfolioModalCounter = document.querySelector("#portfolio-modal-counter");
    const portfolioModalLink = document.querySelector("#portfolio-modal-link");
    const portfolioPrev = document.querySelector("[data-gallery-prev]");
    const portfolioNext = document.querySelector("[data-gallery-next]");
    let activeGallery = null;
    let activeGalleryIndex = 0;
    let modalStartX = 0;

    function renderPortfolioModal() {
        if (!activeGallery || !portfolioModalImage) return;

        const item = activeGallery.items[activeGalleryIndex];
        const isVideo = item.type === "video" || /\.(mp4|webm|ogg)$/i.test(item.src || "");
        portfolioModalTitle.textContent = activeGallery.title;
        portfolioModalImage.hidden = isVideo;
        portfolioModalImage.style.display = isVideo ? "none" : "";
        portfolioModalImage.src = isVideo ? "" : item.src;
        portfolioModalImage.alt = isVideo ? "" : item.caption;
        if (portfolioModalVideo) {
            portfolioModalVideo.hidden = !isVideo;
            portfolioModalVideo.style.display = isVideo ? "" : "none";
            if (isVideo) {
                portfolioModalVideo.src = item.src;
                if (item.poster) {
                    portfolioModalVideo.poster = item.poster;
                } else {
                    portfolioModalVideo.removeAttribute("poster");
                }
                portfolioModalVideo.setAttribute("aria-label", item.caption);
            } else {
                portfolioModalVideo.pause();
                portfolioModalVideo.removeAttribute("src");
                portfolioModalVideo.removeAttribute("poster");
                portfolioModalVideo.removeAttribute("aria-label");
                portfolioModalVideo.load();
            }
        }
        portfolioModalCaption.textContent = item.caption;
        portfolioModalCounter.textContent = `${activeGalleryIndex + 1} / ${activeGallery.items.length}`;

        if (portfolioModalLink) {
            const externalUrl = item.externalUrl || activeGallery.externalUrl;
            const externalLabel = item.externalLabel || activeGallery.externalLabel || "Открыть";

            if (externalUrl) {
                portfolioModalLink.href = externalUrl;
                portfolioModalLink.textContent = externalLabel;
                portfolioModalLink.hidden = false;
            } else {
                portfolioModalLink.hidden = true;
                portfolioModalLink.removeAttribute("href");
            }
        }
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
        if (portfolioModalVideo) {
            portfolioModalVideo.pause();
        }
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
}

function initContactForm() {
    const contactForm = document.querySelector("#contact-form");
    const formNote = document.querySelector("#form-note");

    if (contactForm && formNote) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const submitButton = contactForm.querySelector("button[type=\"submit\"]");
            const formData = new FormData(contactForm);
            const payload = {
                name: String(formData.get("name") || "").trim(),
                phone: String(formData.get("phone") || "").trim(),
                email: String(formData.get("email") || "").trim(),
                industry: String(formData.get("industry") || "").trim(),
                revenue: String(formData.get("revenue") || "").trim(),
                consent: formData.get("consent") === "on"
            };

            formNote.classList.remove("is-success", "is-error");

            if (!payload.name || !payload.phone || !payload.email || !payload.consent) {
                formNote.textContent = "Заполните имя, телефон, email и подтвердите согласие.";
                formNote.classList.add("is-error");
                return;
            }

            submitButton.disabled = true;
            formNote.textContent = "Отправляем заявку...";

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json().catch(() => ({}));

                if (!response.ok || !result.ok) {
                    throw new Error(result.message || "Не удалось отправить заявку.");
                }

                contactForm.reset();
                formNote.textContent = "Заявка отправлена. Я свяжусь с вами в ближайшее время.";
                formNote.classList.add("is-success");
            } catch (error) {
                formNote.textContent = "Не удалось отправить заявку. Напишите напрямую в Telegram или на email.";
                formNote.classList.add("is-error");
            } finally {
                submitButton.disabled = false;
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await hydrateContentFromJson();
    initFaq();
    initCarousels();
    initPortfolioModal();
    initContactForm();
});

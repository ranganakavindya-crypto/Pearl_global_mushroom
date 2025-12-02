// CONFIG: replace with your real WhatsApp number (no +, no spaces)
const WHATSAPP_NUMBER = "94776265638"; // example: "919999999999"

// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => loader && loader.remove(), 400);
    }, 800);
});

// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });
}

// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Animated counters
const counters = document.querySelectorAll(".number");
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    const triggerPoint = window.innerHeight * 0.85;

    counters.forEach((counter) => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < triggerPoint) {
            const target = +counter.dataset.target;
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 80));

            const update = () => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        }
    });

    countersAnimated = true;
}

window.addEventListener("scroll", animateCounters);
animateCounters();

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const varietyCards = document.querySelectorAll(".variety-card");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;

        varietyCards.forEach((card) => {
            const category = card.dataset.category;
            const show = filter === "all" || category === filter;
            card.style.display = show ? "block" : "none";
            card.style.opacity = show ? "1" : "0";
        });
    });
});

// Scroll reveal
const revealElements = document.querySelectorAll(
    ".section-header, .about-grid, .card, .timeline-step, .gallery-item, .contact-grid"
);

revealElements.forEach((el) => el.classList.add("reveal"));

function handleReveal() {
    const trigger = window.innerHeight * 0.85;
    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < trigger) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", handleReveal);
handleReveal();

// Hero parallax effect
const globeOrbit = document.getElementById("globeOrbit");
if (globeOrbit) {
    window.addEventListener("mousemove", (e) => {
        const rect = globeOrbit.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / 40;
        const y = (e.clientY - (rect.top + rect.height / 2)) / 40;
        globeOrbit.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Contact form -> WhatsApp
function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();
    const variety = document.getElementById("variety").value;
    const quantity = document.getElementById("quantity").value;
    const message = document.getElementById("message").value.trim();

    const textLines = [
        "*New Pearl Global mushroom order*",
        "",
        `Name: ${name}`,
        `Customer Phone: ${phone}`,
        `Location: ${location}`,
        `Variety: ${variety}`,
        `Quantity: ${quantity} kg`,
    ];

    if (message) textLines.push(`Notes: ${message}`);

    const text = encodeURIComponent(textLines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    window.open(url, "_blank");
    e.target.reset();

    return false;

}




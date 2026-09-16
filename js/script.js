// ===============================
// Scroll Effects
// (navbar, progress bar, back-to-top, hero parallax
// share one passive, rAF-throttled listener)
// ===============================

const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");
const scrollProgress = document.querySelector("#scroll-progress");
const backToTop = document.querySelector("#back-to-top");

let scrollTicking = false;

function updateScrollEffects() {

    scrollTicking = false;

    const scrollY = window.scrollY;

    if (navbar) {
        navbar.classList.toggle("scrolled", scrollY > 50);
    }

    if (backToTop) {
        backToTop.classList.toggle("show", scrollY > 600);
    }

    if (scrollProgress) {

        const scrollTop =
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrollPercent =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        scrollProgress.style.width = `${scrollPercent}%`;

    }

    if (hero && window.innerWidth > 768 && scrollY <= hero.offsetHeight) {
        hero.style.backgroundPosition =
            `center calc(50% + ${scrollY * 0.08}px)`;
    }

}

function onScroll() {

    if (scrollTicking) return;

    scrollTicking = true;
    requestAnimationFrame(updateScrollEffects);

}

window.addEventListener("scroll", onScroll, { passive: true });

// Apply the correct state on initial load
updateScrollEffects();


// ===============================
// Scroll Reveal
// ===============================

const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

reveals.forEach(section => {
    observer.observe(section);
});


// ===============================
// Mobile Navigation
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const expanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!expanded)
        );
        
        menuToggle.setAttribute(
    "aria-label",
    expanded ? "Open Menu" : "Close Menu"
);
    });

}

// Close menu after clicking a navigation link
if (navLinks) {
    const navLinks_allLinks = navLinks.querySelectorAll("a");
    navLinks_allLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 992) {
                // Dropdown parent links toggle their own menu instead
                if (link.hasAttribute("aria-haspopup")) return;
                navLinks.classList.remove("show");
                closeAllDropdowns();
                if (menuToggle) {
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open Menu");
                }
            }
        });
    });
}

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (
        window.innerWidth <= 992 &&
        navLinks &&
        !event.target.closest(".navbar")
    ) {
        navLinks.classList.remove("show");
        closeAllDropdowns();
        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open Menu");
        }
    }
});


// ===============================
// Dropdowns (mobile + desktop + keyboard)
// ===============================

const dropdowns = document.querySelectorAll(".dropdown");

function setDropdownState(dropdown, open) {

    dropdown.classList.toggle("open", open);

    const dropdownLink = dropdown.querySelector(":scope > a");

    if (dropdownLink && dropdownLink.hasAttribute("aria-haspopup")) {
        dropdownLink.setAttribute("aria-expanded", String(open));
    }

}

function closeAllDropdowns() {
    dropdowns.forEach(dropdown => setDropdownState(dropdown, false));
}

dropdowns.forEach(dropdown => {

    const dropdownLink = dropdown.querySelector(":scope > a");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    if (!dropdownLink || !dropdownMenu) return;

    // Touch / small screens: first tap opens the dropdown,
    // a second tap follows the parent link
    dropdownLink.addEventListener("click", (event) => {

        if (window.innerWidth <= 992) {

            const isOpen = dropdown.classList.contains("open");

            if (isOpen) return;

            event.preventDefault();

            // Close other dropdowns
            dropdowns.forEach(item => {
                if (item !== dropdown) setDropdownState(item, false);
            });

            // Open the selected dropdown
            setDropdownState(dropdown, true);

        }

    });

    // Keyboard: opening the menu when focus enters, closing when it leaves
    dropdown.addEventListener("focusin", () => {
        if (window.innerWidth > 992) setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("focusout", (event) => {
        if (
            window.innerWidth > 992 &&
            !dropdown.contains(event.relatedTarget)
        ) {
            setDropdownState(dropdown, false);
        }
    });

    // Keep aria-expanded accurate while hovering on desktop
    dropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth > 992) setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth > 992) setDropdownState(dropdown, false);
    });

    // Choosing an item closes the dropdown again (mobile panel)
    dropdownMenu.querySelectorAll("a").forEach(item => {
        item.addEventListener("click", () => {
            setDropdownState(dropdown, false);
        });
    });

});

// Escape closes dropdowns and the mobile menu
document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    const openDropdown = document.querySelector(".dropdown.open");

    if (openDropdown) {
        closeAllDropdowns();
        const link = openDropdown.querySelector(":scope > a");
        if (link) link.focus();
        return;
    }

    if (
        navLinks &&
        navLinks.classList.contains("show") &&
        menuToggle
    ) {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open Menu");
        menuToggle.focus();
    }

});

// Clicking outside the navbar closes desktop dropdowns
document.addEventListener("click", (event) => {

    if (window.innerWidth > 992 && !event.target.closest(".navbar")) {
        closeAllDropdowns();
    }

});
// ===============================
// Be Still Scripture Rotation
// ===============================

const stillQuote = document.querySelector("#still-quote");
const stillReference = document.querySelector("#still-reference");
const stillThought = document.querySelector("#still-thought");
const quoteDots = document.querySelectorAll(".quote-dots button");

const stillScriptures = [

    {
        quote: "Come to Me, all who labor and are heavy laden, and I will give you rest.",
        reference: "Matthew 11:28",
        message: "You were never created to carry alone what Christ is asking you to surrender."
    },

    {
        quote: "Be still, and know that I am God.",
        reference: "Psalm 46:10",
        message: "Not every battle is won by movement. Some victories begin when you become still enough to trust God."
    },

    {
        quote: "In quietness and in confidence shall be your strength.",
        reference: "Isaiah 30:15",
        message: "Your strength is not measured by how much you can endure, but by how deeply you can trust."
    },

    {
        quote: "My presence shall go with thee, and I will give thee rest.",
        reference: "Exodus 33:14",
        message: "You do not need to know everything about the road ahead when you know Who is walking with you."
    },

    {
        quote: "He leads me beside still waters. He restores my soul.",
        reference: "Psalm 23:2–3",
        message: "Sometimes God slows your journey because your soul needs restoration more than your plans need speed."
    }

];


let currentScripture = 0;

function changeStillScripture() {

    if (!stillQuote || !stillReference || !stillThought) return;

    currentScripture =
        (currentScripture + 1) % stillScriptures.length;

    stillQuote.style.opacity = "0";
    stillReference.style.opacity = "0";
    stillThought.style.opacity = "0";

    setTimeout(() => {

        stillQuote.textContent =
            `“${stillScriptures[currentScripture].quote}”`;

        stillReference.textContent =
            stillScriptures[currentScripture].reference;
            stillThought.textContent =
             stillScriptures[currentScripture].message;
        quoteDots.forEach(dot => {
            dot.classList.remove("active");
        });

        if (quoteDots[currentScripture]) {
            quoteDots[currentScripture].classList.add("active");
        }

        stillQuote.style.opacity = "1";
        stillReference.style.opacity = "1";
        stillThought.style.opacity = "1";

    }, 500);
}
if (stillQuote && stillReference && stillThought) {
    setInterval(changeStillScripture, 6000);
}
quoteDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentScripture = index;

        stillQuote.textContent =
            `“${stillScriptures[index].quote}”`;

        stillReference.textContent =
            stillScriptures[index].reference;

        stillThought.textContent =
            stillScriptures[index].message;

        quoteDots.forEach(item => {
            item.classList.remove("active");
        });

        dot.classList.add("active");

    });

});
// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        const href = this.getAttribute("href");

        if (href === "#") {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});
// ===============================
// Back to Top Button
// (scroll visibility is handled in updateScrollEffects)
// ===============================

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// ===============================
// Contact Form Submission
// ===============================

const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector("#form-success");

if (contactForm && formSuccess) {

    contactForm.addEventListener("input", () => {
    formSuccess.classList.remove("show");
});

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                contactForm.reset();
                formSuccess.classList.add("show");

            } else {

                alert(
                    "Your message could not be sent. Please try again."
                );

            }

        } catch (error) {

            alert(
                "There was a problem sending your message. Please try again."
            );

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

        }

    });

}
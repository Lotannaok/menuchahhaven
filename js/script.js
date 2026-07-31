// ===============================
// Navbar Scroll Effect
// ===============================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}


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
// ===============================
// Mobile Dropdowns
// ===============================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

    const dropdownLink = dropdown.querySelector(":scope > a");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    if (!dropdownLink || !dropdownMenu) return;

    dropdownLink.addEventListener("click", (event) => {

        if (window.innerWidth <= 992) {

            event.preventDefault();

            const isOpen = dropdown.classList.contains("open");

            // Close other dropdowns
            dropdowns.forEach(item => {
                item.classList.remove("open");
            });

            // Open the selected dropdown
            if (!isOpen) {
                dropdown.classList.add("open");
            }
        }

    });

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

        const target = document.querySelector(this.getAttribute("href"));

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
// Gentle Hero Parallax
// ===============================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero || window.innerWidth <= 768) return;

    const scrollPosition = window.scrollY;

    if (scrollPosition <= hero.offsetHeight) {
        hero.style.backgroundPosition =
            `center calc(50% + ${scrollPosition * 0.08}px)`;
    }

});
// ===============================
// Scroll Progress Indicator
// ===============================

const scrollProgress = document.querySelector("#scroll-progress");

window.addEventListener("scroll", () => {

    if (!scrollProgress) return;

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

});
// ===============================
// Back to Top Button
// ===============================

const backToTop = document.querySelector("#back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

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
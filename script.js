
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("year").textContent =
        new Date().getFullYear();

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    });

    const elements = document.querySelectorAll(
        ".hero .col-lg-7, .hero .col-lg-5, #about .content-card, #skills .skill-card, #projects .project-card, .timeline-item, .contact-box"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {
        elements.forEach(function (element) {
            element.classList.add("reveal");
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }

    const sections = document.querySelectorAll("main section[id], body > section[id]");
    const links = document.querySelectorAll(".navbar .nav-link[href^='#']");

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                links.forEach(function (link) {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: "-20% 0px -65% 0px"
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    const menu = document.getElementById("navbarMenu");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            if (menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });
});

/* =========================================
   BETTIE-CLAUDIE O. AMADI
   SOCIAL MEDIA PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            const isExpanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            menuToggle.setAttribute(
                "aria-label",
                isExpanded ? "Open navigation menu" : "Close navigation menu"
            );

            navLinks.classList.toggle("open");
        });

        // Close the mobile menu after a navigation link is selected.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close the mobile menu when switching to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }


    // 2. Portfolio Filtering
    const filterButtons = document.querySelectorAll(".filter-button");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter = button.dataset.filter;

            // Highlight the selected filter.
            filterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
            });

            button.classList.add("active");

            // Display projects matching the selected category.
            portfolioCards.forEach(function (card) {

                const category = card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }

            });

        });

    });


    // 3. Automatically Update the Copyright Year
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 4. Smooth Navigation for Older Browsers
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                // Keep the browser address bar in sync with the section.
                if (window.location.hash !== targetId) {
                    history.pushState(null, "", targetId);
                }
            }

        });

    });

});

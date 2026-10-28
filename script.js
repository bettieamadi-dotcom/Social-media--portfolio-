/* =========================================
   BETTIE AMADI — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------
       1. MOBILE NAVIGATION
    ------------------------------------- */

    const menuToggle = document.getElementById("menu-toggle");
    const mainNavigation = document.getElementById("main-navigation");
    const navigationLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !mainNavigation) return;

        menuToggle.classList.remove("is-open");
        mainNavigation.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNavigation.classList.toggle("is-open");

            menuToggle.classList.toggle("is-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        mainNavigation.querySelectorAll(".nav-contact").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", function (event) {
            const clickedInsideMenu = mainNavigation.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

    }


    /* -------------------------------------
       2. PORTFOLIO FILTERS
    ------------------------------------- */

    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter = button.dataset.filter;

            // Update the selected filter button.
            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);

                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            // Show or hide projects according to their category.
            projectCards.forEach(function (card) {

                const projectCategory = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === projectCategory;

                card.classList.toggle("is-hidden", !shouldShow);

                if (shouldShow) {
                    card.removeAttribute("aria-hidden");
                } else {
                    card.setAttribute("aria-hidden", "true");
                }

            });

        });

    });


    /* -------------------------------------
       3. ACTIVE NAVIGATION LINKS
    ------------------------------------- */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window && sections.length > 0) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const currentSectionId = entry.target.id;

                    navigationLinks.forEach(function (link) {

                        const linkTarget = link.getAttribute("href");

                        const isCurrent =
                            linkTarget === "#" + currentSectionId;

                        link.classList.toggle("active", isCurrent);

                    });

                });

            },
            {
                root: null,
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    /* -------------------------------------
       4. AUTOMATIC FOOTER YEAR
    ------------------------------------- */

    const currentYearElement = document.getElementById("current-year");

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    /* -------------------------------------
       5. IMAGE ERROR HANDLING
    ------------------------------------- */

    const portfolioImages = document.querySelectorAll(
        ".project-image, .hero-image, .about-image"
    );

    portfolioImages.forEach(function (img) {

        img.addEventListener("error", function () {

            console.warn(
                "Image could not be loaded. Check its filename and path:",
                img.getAttribute("src")
            );

            img.classList.add("image-load-error");

        });

        img.addEventListener("load", function () {
            img.classList.remove("image-load-error");
        });

    });


    /* -------------------------------------
       6. SMOOTH INTERNAL NAVIGATION
    ------------------------------------- */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL in sync with the selected section.
            if (history.replaceState) {
                history.replaceState(null, "", targetId);
            }

        });

    });


    /* -------------------------------------
       7. EXTERNAL LINKS
    ------------------------------------- */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(function (link) {
        link.setAttribute("rel", "noopener noreferrer");
    });


    /* -------------------------------------
       8. PROJECT CARD KEYBOARD SUPPORT
    ------------------------------------- */

    projectCards.forEach(function (card) {

        const projectLink = card.querySelector(".project-image-link");

        if (!projectLink) return;

        projectLink.setAttribute(
            "aria-label",
            projectLink.getAttribute("aria-label") ||
            "Open project image"
        );

    });


    /* -------------------------------------
       9. READY
    ------------------------------------- */

    console.info("Bettie Amadi's portfolio interactions are ready.");

});

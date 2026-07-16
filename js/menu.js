function initMenu() {
    const menuButton = document.querySelector(".menu-btn");
    const closeButton = document.querySelector(".close-btn");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!menuButton || !closeButton || !navMenu) return;

    function openMenu() {
        navMenu.classList.add("is-open");
        document.body.classList.add("menu-open");

        navMenu.setAttribute("aria-hidden", "false");
        menuButton.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        navMenu.classList.remove("is-open");
        document.body.classList.remove("menu-open");

        navMenu.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");
    }

    menuButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            navMenu.classList.contains("is-open")
        ) {
            closeMenu();
        }
    });
}

function loadMenu() {
    const menuComponent = document.querySelector("#menu-component");

    if (!menuComponent) return;

    const menuPath = menuComponent.dataset.menu;

    if (!menuPath) {
        console.error("Menu path is missing.");
        return;
    }

    fetch(menuPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Menu could not be loaded.");
            }

            return response.text();
        })
        .then((html) => {
            menuComponent.innerHTML = html;

            const isProjectPage = window.location.pathname.includes("/projects/");
            const homePath = isProjectPage ? "../index.html" : "./index.html";

            document.querySelectorAll("[data-section]").forEach((link) => {
                const section = link.dataset.section;
                link.href = `${homePath}#${section}`;
            });

            initMenu();
        })
        .catch((error) => {
            console.error(error);
        });
}

function loadFooter() {
    const footerComponent = document.querySelector("#footer-component");

    if (!footerComponent) return;

    const footerPath = footerComponent.dataset.footer;

    if (!footerPath) {
        console.error("Footer path is missing.");
        return;
    }

    fetch(footerPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Footer could not be loaded.");
            }

            return response.text();
        })
        .then((html) => {
            footerComponent.innerHTML = html;

            const isProjectPage = window.location.pathname.includes("/projects/");

            const assetsPath = isProjectPage
                ? "../assets/images/home/footer-logo.svg"
                : "./assets/images/home/footer-logo.svg";

            const logo = document.querySelector("[data-footer-logo]");

            if (logo) {
                logo.src = assetsPath;
            }

            const homePath = isProjectPage
                ? "../index.html"
                : "./index.html";

            document
                .querySelectorAll("#footer-component [data-section]")
                .forEach((link) => {
                    const section = link.dataset.section;
                    link.href = `${homePath}#${section}`;
                });

            const scrollTopLink = document.querySelector("[data-scroll-top]");

            if (scrollTopLink) {
                if (isProjectPage) {
                    scrollTopLink.href = "../index.html#hero";
                } else {
                    scrollTopLink.href = "#hero";

                    scrollTopLink.addEventListener("click", (e) => {
                        e.preventDefault();

                        document.querySelector("#hero")?.scrollIntoView({
                            behavior: "smooth",
                        });
                    });
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

loadMenu();
loadFooter();
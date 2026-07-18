window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        document.body.classList.add("is-loaded");
    });
});

window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        document.body.classList.add("is-loaded");
    });
});

const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-project, .reveal-cta"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.05,
        rootMargin: "0px 0px -5% 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});



const aboutSection = document.querySelector(".section-about");
const aboutSticky = document.querySelector(".about-sticky");

let aboutScrollDistance = 0;

function setAboutSectionHeight() {
    if (!aboutSection || !aboutSticky) {
        return;
    }

    if (window.innerWidth > 767) {
        aboutSection.style.height = "";
        aboutScrollDistance = aboutSection.offsetHeight - window.innerHeight;
        return;
    }

    const isLandscape = window.innerWidth > window.innerHeight;

    aboutScrollDistance = isLandscape ? 140 : 220;

    const stickyHeight = aboutSticky.offsetHeight;

    aboutSection.style.height = `${stickyHeight + aboutScrollDistance}px`;
}

function updateAboutSection() {
    if (!aboutSection) {
        return;
    }

    const sectionRect = aboutSection.getBoundingClientRect();

    let progress;

    if (window.innerWidth <= 767) {
        progress = Math.min(
            Math.max(-sectionRect.top / aboutScrollDistance, 0),
            1
        );
    } else {
        const scrollDistance = aboutSection.offsetHeight - window.innerHeight;

        if (scrollDistance <= 0) {
            aboutSection.classList.remove("is-second-text");
            return;
        }

        progress = Math.min(
            Math.max(-sectionRect.top / scrollDistance, 0),
            1
        );
    }

    if (progress >= 0.4) {
        aboutSection.classList.add("is-second-text");
    } else {
        aboutSection.classList.remove("is-second-text");
    }
}

function initializeAboutSection() {
    setAboutSectionHeight();
    updateAboutSection();
}

window.addEventListener("scroll", updateAboutSection, {
    passive: true
});

window.addEventListener("resize", initializeAboutSection);

window.addEventListener("load", initializeAboutSection);

initializeAboutSection();


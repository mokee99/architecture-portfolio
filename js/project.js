document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const heroReveal = document.querySelector(".hero-reveal");
    const revealElements = document.querySelectorAll(".reveal");

    body.classList.add("animations-ready");

    if (heroReveal) {
        requestAnimationFrame(() => {
            heroReveal.classList.add("is-visible");
        });
    }

    if (!revealElements.length) {
        return;
    }

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
            threshold: 0.15,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});
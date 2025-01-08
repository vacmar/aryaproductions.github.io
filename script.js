document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('nav a[href^="#"]');
    const offset = 60;
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // Fade-in effect for the products section
    const productSection = document.querySelector("#products");
    if (!productSection) {
        console.error("#products section not found");
        return;
    }

    const fadeElements = productSection.querySelectorAll(".product");
    if (fadeElements.length === 0) {
        console.error("No .product elements found inside #products");
        return;
    }

    console.log(`${fadeElements.length} .product elements found`);

    const observerOptions = {
        root: null,
        threshold: 0.2,
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log(`Observed element: ${entry.target.className}, isIntersecting: ${entry.isIntersecting}`);
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active"); // Remove active class when out of view
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add("fade-in"); // Add the fade-in class to the products
        fadeInObserver.observe(el);
        console.log(`Observing element: ${el.className}`);
    });

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY) {
            // Scrolling up
            navbar.style.transform = "translateY(0)";
        } else {
            // Scrolling down
            navbar.style.transform = "translateY(-100%)";
        }

        lastScrollY = currentScrollY;
    });
});

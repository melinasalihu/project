document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
        navMenu.setAttribute("aria-expanded", navMenu.classList.contains("active"));
    });

    // Header Scroll Effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Stats Counter Animation
    const animateStats = () => {
        const stats = document.querySelectorAll(".stat-number");
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"));
            let count = 0;
            const speed = 2000 / target; // Adjust speed based on target
            const updateCount = () => {
                if (count < target) {
                    count += Math.ceil(target / 100);
                    stat.textContent = count > target ? target : count;
                    setTimeout(updateCount, speed);
                }
            };
            updateCount();
        });
    };

    const statsObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                statsObserver.disconnect();
            }
        },
        { threshold: 0.5 }
    );

    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) statsObserver.observe(heroStats);

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".testimonial-dots .dot");
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
    };

    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                currentIndex = parseInt(dot.getAttribute("data-slide"));
                showTestimonial(currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Accessibility: Keyboard Navigation for Interactive Elements
    document.querySelectorAll(".nav-link, .dot").forEach(element => {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                element.click();
            }
        });
    });
});





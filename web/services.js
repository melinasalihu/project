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

     //Service Filtering
     const filterButtons = document.querySelectorAll(".filter-btn");
     const serviceCards = document.querySelectorAll(".service-card");
     const filterContainer = document.createElement("div");
     filterContainer.classList.add("filter-container");
    lterContainer.innerHTML = `
    //  <button class="filter-btn active" data-filter="all">All</button>
         <button class="filter-btn" data-filter="analysis">Analysis</button>
         <button class="filter-btn" data-filter="consulting">Consulting</button>
         <button class="filter-btn" data-filter="risk">Risk</button>
         <button class="filter-btn" data-filter="investment">Investment</button>
          <button class="filter-btn" data-filter="tax">Tax</button>
      <button class="filter-btn" data-filter="training">Training</button>
    `;
     document.querySelector(".services-grid").prepend(filterContainer);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            serviceCards.forEach(card => {
                const category = card.getAttribute("data-category");
                card.style.display = (filter === "all" || category === filter) ? "block" : "none";
                if (filter === "all" || category === filter) {
                    card.classList.add("fade-in");
                }
            });
        });
    });

    // Service Search
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    searchContainer.innerHTML = `
        <input type="text" id="service-search" placeholder="Search services..." aria-label="Search services">
    `;
    document.querySelector(".services-grid").prepend(searchContainer);

    const serviceSearch = document.getElementById("service-search");
    serviceSearch.addEventListener("input", () => {
        const query = serviceSearch.value.toLowerCase();
        serviceCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            card.style.display = (title.includes(query) || description.includes(query)) ? "block" : "none";
            if (title.includes(query) || description.includes(query)) {
                card.classList.add("fade-in");
            }
        });
    });

    // Pricing Toggle
    const pricingToggle = document.createElement("div");
    pricingToggle.classList.add("pricing-toggle");
    pricingToggle.innerHTML = `
        <button class="toggle-btn active" data-period="monthly">Monthly</button>
        <button class="toggle-btn" data-period="yearly">Yearly</button>
    `;
    document.querySelector(".services-grid").prepend(pricingToggle);

    const toggleButtons = document.querySelectorAll(".toggle-btn");
    const pricingElements = document.querySelectorAll(".service-pricing");
    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const period = button.getAttribute("data-period");
            toggleButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            pricingElements.forEach(pricing => {
                const monthlyText = pricing.getAttribute("data-monthly");
                const yearlyText = pricing.getAttribute("data-yearly");
                pricing.querySelector("span").textContent = period === "monthly" ? monthlyText : yearlyText;
            });
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            item.classList.toggle("active");
            const answer = item.querySelector(".faq-answer");
            answer.style.maxHeight = item.classList.contains("active") ? `${answer.scrollHeight}px` : "0";
            const icon = question.querySelector("i");
            icon.classList.toggle("fa-plus");
            icon.classList.toggle("fa-minus");
        });
    });

    // Process Step Animation
    const processSteps = document.querySelectorAll(".process-step");
    const processObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.3 }
    );

    processSteps.forEach(step => processObserver.observe(step));

  

    images.forEach(img => imageObserver.observe(img));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Accessibility: Keyboard Navigation
    document.querySelectorAll(".nav-link, .filter-btn, .toggle-btn, .faq-question").forEach(element => {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                element.click();
            }
        });
    });
});



// Toggle buttons for pricing
const monthlyBtn = document.querySelector('#monthly-btn');
const yearlyBtn = document.querySelector('#yearly-btn');
const prices = document.querySelectorAll('.price'); // sigurohu që t’i japësh class="price" div-it të çmimit

monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');
    prices.forEach(price => {
        const monthly = price.getAttribute('data-monthly');
        price.textContent = monthly;
    });
});

// yearlyBtn.addEventListener('click', () => {
//     yearlyBtn.classList.add('active');
//     monthlyBtn.classList.remove('active');
//     prices.forEach(price => {
//         const yearly = price.getAttribute('data-yearly');
//         price.textContent = yearly;
//     });
// });


// const searchInput = document.querySelector('#search-input');
// const serviceCards = document.querySelectorAll('.service-card'); // Sigurohu që secila kartë e shërbimit ka class="service-card"

// searchInput.addEventListener('input', () => {
//     const query = searchInput.value.toLowerCase();
//     serviceCards.forEach(card => {
//         const text = card.textContent.toLowerCase();
//         if (text.includes(query)) {
//             card.style.display = 'block';
//         } else {
//             card.style.display = 'none';
//         }
//     }) });













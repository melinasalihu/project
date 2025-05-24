// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 1000)
})

// Mobile Navigation
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Header scroll effect
const header = document.getElementById("header")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Trigger counter animation when hero stats come into view
      if (entry.target.classList.contains("hero-stats")) {
        animateCounters()
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .hero-stats").forEach((el) => {
  observer.observe(el)
})

// Testimonials slider
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".testimonial-card")
    this.dots = document.querySelectorAll(".dot")
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.startAutoPlay()
  }

  setupEventListeners() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
        this.resetAutoPlay()
      })
    })
  }

  goToSlide(slideIndex) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove("active")
    this.dots[this.currentSlide].classList.remove("active")

    // Update current slide
    this.currentSlide = slideIndex

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add("active")
    this.dots[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval)
    this.startAutoPlay()
  }
}

// Initialize testimonial slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".testimonials-slider")) {
    new TestimonialSlider()
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    const speed = scrolled * 0.5
    heroBackground.style.transform = `translateY(${speed}px)`
  }
})

// Form validation and submission
function setupFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Basic validation
      let isValid = true
      const requiredFields = this.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (isValid) {
        // Simulate form submission
        this.innerHTML =
          '<div class="success-message"><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.</div>'

        // Reset form after 3 seconds
        setTimeout(() => {
          location.reload()
        }, 3000)
      } else {
        alert("Please fill in all required fields.")
      }
    })
  })
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", setupFormValidation)

// Add scroll-triggered animations
function addScrollAnimations() {
  const animatedElements = document.querySelectorAll(".service-card, .feature-item, .testimonial-card")

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    animationObserver.observe(el)
  })
}

// Initialize scroll animations
document.addEventListener("DOMContentLoaded", addScrollAnimations)

// Utility function for smooth page transitions
function initPageTransitions() {
  const links = document.querySelectorAll('a[href$=".html"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const href = this.getAttribute("href")

      document.body.style.opacity = "0"
      document.body.style.transition = "opacity 0.3s ease"

      setTimeout(() => {
        window.location.href = href
      }, 300)
    })
  })
}

// Initialize page transitions
document.addEventListener("DOMContentLoaded", initPageTransitions)

// Add dynamic year to footer
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector(".footer-bottom p")
  if (yearElement) {
    const currentYear = new Date().getFullYear()
    yearElement.innerHTML = yearElement.innerHTML.replace("2025", currentYear)
  }
})

// About Page Specific JavaScript

// Enhanced counter animation for statistics
function animateStatistics() {
  const statNumbers = document.querySelectorAll(".statistics-numbers .stat-number")

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateCounter(entry.target, target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((stat) => {
    observer.observe(stat)
  })
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 20)
}

// Enhanced testimonials slider for about page
class AboutTestimonialSlider {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".testimonials-section .testimonial-card")
    this.dots = document.querySelectorAll(".testimonials-section .dot")
    this.autoPlayInterval = null
    this.isPlaying = true

    if (this.slides.length > 0) {
      this.init()
    }
  }

  init() {
    this.setupEventListeners()
    this.startAutoPlay()
    this.setupKeyboardNavigation()
  }

  setupEventListeners() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
        this.resetAutoPlay()
      })
    })

    // Pause on hover
    const slider = document.querySelector(".testimonials-slider")
    if (slider) {
      slider.addEventListener("mouseenter", () => this.pauseAutoPlay())
      slider.addEventListener("mouseleave", () => this.resumeAutoPlay())
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.previousSlide()
        this.resetAutoPlay()
      } else if (e.key === "ArrowRight") {
        this.nextSlide()
        this.resetAutoPlay()
      }
    })
  }

  goToSlide(slideIndex) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove("active")
    this.dots[this.currentSlide].classList.remove("active")

    // Update current slide
    this.currentSlide = slideIndex

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add("active")
    this.dots[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  previousSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 6000)
    this.isPlaying = true
  }

  pauseAutoPlay() {
    clearInterval(this.autoPlayInterval)
    this.isPlaying = false
  }

  resumeAutoPlay() {
    if (!this.isPlaying) {
      this.startAutoPlay()
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay()
    this.startAutoPlay()
  }
}

// Team card hover effects
function initTeamCardEffects() {
  const teamCards = document.querySelectorAll(".team-card")

  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Scroll animations for about page elements
function initAboutScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".company-text, .company-image, .team-card, .statistics-content, .statistics-numbers",
  )

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(50px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })
}

// Play button functionality for company video
function initVideoPlayButton() {
  const playButton = document.querySelector(".play-button")

  if (playButton) {
    playButton.addEventListener("click", () => {
      // Add your video modal or video play functionality here
      console.log("Video play functionality would be implemented here")

      // Example: Show a modal with embedded video
      showVideoModal()
    })
  }
}

function showVideoModal() {
  // Create modal for video
  const modal = document.createElement("div")
  modal.className = "video-modal"
  modal.innerHTML = `
    <div class="video-modal-content">
      <span class="video-close">&times;</span>
      <iframe width="800" height="450" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              frameborder="0" allowfullscreen>
      </iframe>
    </div>
  `

  document.body.appendChild(modal)

  // Close modal functionality
  const closeBtn = modal.querySelector(".video-close")
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal)
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal)
    }
  })
}

// Initialize all about page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize statistics animation
  animateStatistics()

  // Initialize testimonials slider
  new AboutTestimonialSlider()

  // Initialize team card effects
  initTeamCardEffects()

  // Initialize scroll animations
  initAboutScrollAnimations()

  // Initialize video play button
  initVideoPlayButton()

  // Add smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Add CSS for video modal
const videoModalStyles = `
  .video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
  
  .video-modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }
  
  .video-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 30px;
    cursor: pointer;
    z-index: 10001;
  }
  
  .video-modal iframe {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 200px;
  }
  
  @media (max-width: 768px) {
    .video-modal iframe {
      width: 90vw;
      height: 50vw;
    }
  }
`

// Inject video modal styles
const styleSheet = document.createElement("style")
styleSheet.textContent = videoModalStyles
document.head.appendChild(styleSheet)
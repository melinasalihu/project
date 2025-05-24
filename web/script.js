
// window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 1000)

 


const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})


document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})


const header = document.getElementById("header")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})


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


const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      
      if (entry.target.classList.contains("hero-stats")) {
        animateCounters()
      }
    }
  })
}, observerOptions)


document.querySelectorAll(".service-card, .hero-stats").forEach((el) => {
  observer.observe(el)
})


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
    this.slides[this.currentSlide].classList.remove("active")
    this.dots[this.currentSlide].classList.remove("active")

    this.currentSlide = slideIndex

    
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


document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".testimonials-slider")) {
    new TestimonialSlider()
  }
})


window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    const speed = scrolled * 0.5
    heroBackground.style.transform = `translateY(${speed}px)`
  }
})


function setupFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      
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
      
        this.innerHTML =
          '<div class="success-message"><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.</div>'

        
        setTimeout(() => {
          location.reload()
        }, 3000)
      } else {
        alert("Please fill in all required fields.")
      }
    })
  })
}


document.addEventListener("DOMContentLoaded", setupFormValidation)

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


document.addEventListener("DOMContentLoaded", addScrollAnimations)


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


document.addEventListener("DOMContentLoaded", initPageTransitions)


document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector(".footer-bottom p")
  if (yearElement) {
    const currentYear = new Date().getFullYear()
    yearElement.innerHTML = yearElement.innerHTML.replace("2025", currentYear)
  }
})


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

    this.slides[this.currentSlide].classList.remove("active")
    this.dots[this.currentSlide].classList.remove("active")

    
    this.currentSlide = slideIndex

  
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


function initVideoPlayButton() {
  const playButton = document.querySelector(".play-button")

  if (playButton) {
    playButton.addEventListener("click", () => {
     
      console.log("Video play functionality would be implemented here")

      
      showVideoModal()
    })
  }
}

function showVideoModal() {
  
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


document.addEventListener("DOMContentLoaded", () => {

  animateStatistics()


  new AboutTestimonialSlider()

  
  initTeamCardEffects()

 
  initAboutScrollAnimations()

  
  initVideoPlayButton()

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


const styleSheet = document.createElement("style")
styleSheet.textContent = videoModalStyles
document.head.appendChild(styleSheet)

function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")


      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

      
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}


function initServiceCardEffects() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}


class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm")
    this.submitBtn = this.form?.querySelector('button[type="submit"]')
    this.init()
  }

  init() {
    if (!this.form) return

    this.setupEventListeners()
    this.setupRealTimeValidation()
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))

    const scheduleBtn = document.getElementById("scheduleBtn")
    if (scheduleBtn) {
      scheduleBtn.addEventListener("click", (e) => {
        e.preventDefault()
        this.openScheduleModal()
      })
    }
  }

  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input))
      input.addEventListener("input", () => this.clearFieldError(input))
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const isRequired = field.hasAttribute("required")
    let isValid = true
    let errorMessage = ""

    
    this.clearFieldError(field)

    
    if (isRequired && !value) {
      isValid = false
      errorMessage = "This field is required"
    }

    
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = "Please enter a valid email address"
      }
    }

    
    if (field.type === "tel" && value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
        isValid = false
        errorMessage = "Please enter a valid phone number"
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage)
    }

    return isValid
  }

  showFieldError(field, message) {
    field.classList.add("error")
    const errorElement = document.createElement("span")
    errorElement.className = "field-error"
    errorElement.textContent = message
    field.parentNode.appendChild(errorElement)
  }

  clearFieldError(field) {
    field.classList.remove("error")
    const errorElement = field.parentNode.querySelector(".field-error")
    if (errorElement) {
      errorElement.remove()
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll("input[required], select[required], textarea[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    return isValid
  }

  async handleSubmit(e) {
    e.preventDefault()

    if (!this.validateForm()) {
      this.showNotification("Please fix the errors above", "error")
      return
    }

    this.setLoadingState(true)

    try {
      
      await this.submitForm()
      this.showSuccessMessage()
    } catch (error) {
      this.showNotification("Something went wrong. Please try again.", "error")
    } finally {
      this.setLoadingState(false)
    }
  }

  async submitForm() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  setLoadingState(loading) {
    this.form.classList.toggle("loading", loading)
    this.submitBtn.disabled = loading
  }

  showSuccessMessage() {
    this.form.innerHTML = `
      <div class="success-message">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
        <button type="button" class="btn btn-primary" onclick="location.reload()">Send Another Message</button>
      </div>
    `
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <i class="fas fa-${type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      <span>${message}</span>
      <button type="button" class="notification-close">&times;</button>
    `

    document.body.appendChild(notification)

   
    setTimeout(() => {
      notification.remove()
    }, 5000)

   
    notification.querySelector(".notification-close").addEventListener("click", () => {
      notification.remove()
    })
  }

  openScheduleModal() {
    const modal = document.createElement("div")
    modal.className = "schedule-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Schedule Free Consultation</h3>
          <button type="button" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>Choose your preferred time for a free 30-minute consultation:</p>
          <div class="time-slots">
            <button type="button" class="time-slot">Today 2:00 PM</button>
            <button type="button" class="time-slot">Today 4:00 PM</button>
            <button type="button" class="time-slot">Tomorrow 10:00 AM</button>
            <button type="button" class="time-slot">Tomorrow 2:00 PM</button>
            <button type="button" class="time-slot">Tomorrow 4:00 PM</button>
            <button type="button" class="time-slot">Custom Time</button>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-primary">Confirm Appointment</button>
            <button type="button" class="btn btn-secondary modal-cancel">Cancel</button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)

   
    const closeModal = () => modal.remove()
    modal.querySelector(".modal-close").addEventListener("click", closeModal)
    modal.querySelector(".modal-cancel").addEventListener("click", closeModal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal()
    })

    
    modal.querySelectorAll(".time-slot").forEach((slot) => {
      slot.addEventListener("click", () => {
        modal.querySelectorAll(".time-slot").forEach((s) => s.classList.remove("selected"))
        slot.classList.add("selected")
      })
    })
  }
}


function initPageScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .process-step, .contact-card, .form-content, .form-sidebar",
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


document.addEventListener("DOMContentLoaded", () => {
 
  initFAQAccordion()

  
  initServiceCardEffects()

 
  new ContactForm()


  initPageScrollAnimations()
})


const additionalStyles = `
  .field-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 5px;
    display: block;
  }
  
  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  .success-message {
    text-align: center;
    padding: 60px 40px;
  }
  
  .success-icon {
    font-size: 4rem;
    color: #10b981;
    margin-bottom: 20px;
  }
  
  .success-message h3 {
    font-size: 2rem;
    color: var(--text-dark);
    margin-bottom: 15px;
  }
  
  .success-message p {
    color: var(--text-light);
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--white);
    padding: 15px 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  }
  
  .notification-error {
    border-left: 4px solid #ef4444;
  }
  
  .notification-info {
    border-left: 4px solid var(--primary-color);
  }
  
  .notification i {
    font-size: 1.2rem;
  }
  
  .notification-error i {
    color: #ef4444;
  }
  
  .notification-info i {
    color: var(--primary-color);
  }
  
  .notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-light);
    margin-left: 10px;
  }
  
  .schedule-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
  
  .modal-content {
    background: var(--white);
    border-radius: var(--border-radius);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    padding: 25px 30px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h3 {
    margin: 0;
    color: var(--text-dark);
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-light);
  }
  
  .modal-body {
    padding: 30px;
  }
  
  .modal-body p {
    margin-bottom: 25px;
    color: var(--text-light);
  }
  
  .time-slots {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .time-slot {
    padding: 12px 20px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--white);
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }
  
  .time-slot:hover {
    border-color: var(--primary-color);
    background: var(--light-gray);
  }
  
  .time-slot.selected {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: var(--white);
  }
  
  .modal-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .notification {
      right: 10px;
      left: 10px;
      top: 10px;
    }
    
    .modal-content {
      margin: 20px;
      width: calc(100% - 40px);
    }
    
    .time-slots {
      grid-template-columns: 1fr;
    }
    
    .modal-actions {
      flex-direction: column;
    }
  }
`


const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)


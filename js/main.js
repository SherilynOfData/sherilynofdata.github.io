// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      // Change the icon when menu is toggled
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        feather.replace(icon, { type: "x" })
      } else {
        feather.replace(icon, { type: "menu" })
      }
    })
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  const body = document.body

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    body.classList.add("dark-theme")
  }

  function toggleTheme() {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme")
      localStorage.setItem("theme", "light")
    } else {
      body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme)
  }

  // Header scroll effect
  const header = document.querySelector(".header")

  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)

  // Initialize scroll state on page load
  handleScroll()

  // Contact form submission (if on contact page)
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const formData = new FormData(contactForm)
      const formStatus = document.getElementById("form-status")

      // Disable button and show loading state
      submitBtn.disabled = true
      submitBtn.textContent = "Sending..."

      // Simulate form submission with a timeout
      setTimeout(() => {
        // Show success message
        if (formStatus) {
          formStatus.textContent = "Thank you for your message. I'll get back to you soon."
          formStatus.classList.add("success-message")
          formStatus.style.display = "block"
        }

        // Reset form
        contactForm.reset()

        // Reset button
        submitBtn.disabled = false
        submitBtn.textContent = "Send Message"

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.style.display = "none"
          }
        }, 5000)
      }, 1500)
    })
  }
})

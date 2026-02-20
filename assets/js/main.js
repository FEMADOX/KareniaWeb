/* ============================================================
   Karen Brito – main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar: cambio de fondo al hacer scroll ──
  const navbar = document.getElementById('navbar')
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // ── Hamburger / menú mobile ──
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open')
      navLinks.classList.toggle('open')
    })
    // Cerrar al hacer clic en un link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open')
        navLinks.classList.remove('open')
      })
    })
  }

  // ── Smooth scroll para links internos ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        e.preventDefault()
        const offset = navbar ? navbar.offsetHeight : 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  })

  // ── Reveal on scroll ──
  const revealEls = document.querySelectorAll('.reveal')
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  revealEls.forEach(el => revealObserver.observe(el))

  // ── Contadores en stats ──
  const counters = document.querySelectorAll('.stat-number')
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10)
    const suffix = el.dataset.suffix || ''
    const duration = 1800
    const start = performance.now()
    const update = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(ease * target) + suffix
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  counters.forEach(c => counterObserver.observe(c))

  // ── Año dinámico ──
  const yearEl = document.getElementById('current-year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

})

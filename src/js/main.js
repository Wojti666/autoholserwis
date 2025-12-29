// ========================================
// AUTO HOL SERWIS - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
	// Initialize Lucide icons
	lucide.createIcons()

	// ========================================
	// MOBILE MENU
	// ========================================
	// const hamburger = document.getElementById('hamburger')
	// const mobileMenu = document.getElementById('mobile-menu')
	// const mobileLinks = document.querySelectorAll('.mobile-link')

	// hamburger.addEventListener('click', function () {
	// 	this.classList.toggle('active')
	// 	mobileMenu.classList.toggle('active')
	// })

	// // Close mobile menu when clicking a link
	// mobileLinks.forEach(link => {
	// 	link.addEventListener('click', function () {
	// 		hamburger.classList.remove('active')
	// 		mobileMenu.classList.remove('active')
	// 	})
	// })

	// // ========================================
	// // SMOOTH SCROLLING
	// // ========================================
	// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	// 	anchor.addEventListener('click', function (e) {
	// 		e.preventDefault()
	// 		const target = document.querySelector(this.getAttribute('href'))
	// 		if (target) {
	// 			const headerOffset = 72 // Navigation height
	// 			const elementPosition = target.getBoundingClientRect().top
	// 			const offsetPosition = elementPosition + window.pageYOffset - headerOffset

	// 			window.scrollTo({
	// 				top: offsetPosition,
	// 				behavior: 'smooth',
	// 			})
	// 		}
	// 	})
	// })

	// ========================================
	// NAVIGATION SCROLL EFFECT
	// ========================================
	// const navigation = document.getElementById('navigation')
	// let lastScroll = 0

	// window.addEventListener('scroll', function () {
	// 	const currentScroll = window.pageYOffset

	// 	if (currentScroll > 100) {
	// 		navigation.style.background = 'hsla(0, 0%, 7% / 0.95)'
	// 	} else {
	// 		navigation.style.background = 'hsla(0, 0%, 7% / 0.9)'
	// 	}

	// 	lastScroll = currentScroll
	// })

	// ========================================
	// GALLERY SLIDER
	// ========================================
	const galleryTrack = document.getElementById('gallery-track')
	const galleryPrev = document.getElementById('gallery-prev')
	const galleryNext = document.getElementById('gallery-next')
	const galleryDots = document.getElementById('gallery-dots')
	const slides = document.querySelectorAll('.gallery-slide')

	let currentSlide = 0
	const totalSlides = slides.length

	// Create dots
	for (let i = 0; i < totalSlides; i++) {
		const dot = document.createElement('div')
		dot.classList.add('gallery-dot')
		if (i === 0) dot.classList.add('active')
		dot.addEventListener('click', () => goToSlide(i))
		galleryDots.appendChild(dot)
	}

	const dots = document.querySelectorAll('.gallery-dot')

	function updateSlider() {
		galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`
		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === currentSlide)
		})
	}

	function goToSlide(index) {
		currentSlide = index
		updateSlider()
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides
		updateSlider()
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
		updateSlider()
	}

	galleryNext.addEventListener('click', nextSlide)
	galleryPrev.addEventListener('click', prevSlide)

	// Auto-slide every 4 seconds
	let autoSlide = setInterval(nextSlide, 4000)

	// Pause auto-slide on hover
	const gallerySlider = document.querySelector('.gallery-slider')
	gallerySlider.addEventListener('mouseenter', () => clearInterval(autoSlide))
	gallerySlider.addEventListener('mouseleave', () => {
		autoSlide = setInterval(nextSlide, 4000)
	})

	// Touch/Swipe support
	let touchStartX = 0
	let touchEndX = 0

	gallerySlider.addEventListener('touchstart', e => {
		touchStartX = e.changedTouches[0].screenX
	})

	gallerySlider.addEventListener('touchend', e => {
		touchEndX = e.changedTouches[0].screenX
		handleSwipe()
	})

	function handleSwipe() {
		const swipeThreshold = 50
		const diff = touchStartX - touchEndX

		if (diff > swipeThreshold) {
			nextSlide()
		} else if (diff < -swipeThreshold) {
			prevSlide()
		}
	}

	// ========================================
	// SCROLL ANIMATIONS
	// ========================================
	const animatedElements = document.querySelectorAll('.animate-on-scroll')

	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1,
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible')
			}
		})
	}, observerOptions)

	animatedElements.forEach(el => observer.observe(el))

	// ========================================
	// CONTACT FORM
	// ========================================
	const contactForm = document.getElementById('contact-form')

	contactForm.addEventListener('submit', function (e) {
		e.preventDefault()

		// Get form data
		const formData = new FormData(this)
		const data = Object.fromEntries(formData)

		// Simple validation
		if (!data.name || !data.email || !data.message) {
			alert('Proszę wypełnić wszystkie wymagane pola.')
			return
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			alert('Proszę podać prawidłowy adres email.')
			return
		}

		// Simulate form submission
		const submitBtn = this.querySelector('button[type="submit"]')
		const originalText = submitBtn.innerHTML
		submitBtn.innerHTML = '<span>Wysyłanie...</span>'
		submitBtn.disabled = true

		setTimeout(() => {
			alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.')
			this.reset()
			submitBtn.innerHTML = originalText
			submitBtn.disabled = false
		}, 1500)
	})

	// ========================================
	// KEYBOARD NAVIGATION
	// ========================================
	document.addEventListener('keydown', function (e) {
		// Gallery keyboard navigation
		if (
			document.activeElement.closest('.gallery-slider') ||
			document.activeElement === galleryPrev ||
			document.activeElement === galleryNext
		) {
			if (e.key === 'ArrowLeft') {
				prevSlide()
			} else if (e.key === 'ArrowRight') {
				nextSlide()
			}
		}

		// Close mobile menu with Escape
		// if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
		// 	hamburger.classList.remove('active')
		// 	mobileMenu.classList.remove('active')
		// }
	})
})

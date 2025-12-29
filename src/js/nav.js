// ========================================
// AUTO HOL SERWIS - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
	// Initialize Lucide icons
	lucide.createIcons()

	// ========================================
	// MOBILE MENU
	// ========================================
	const hamburger = document.getElementById('hamburger')
	const mobileMenu = document.getElementById('mobile-menu')
	const mobileLinks = document.querySelectorAll('.mobile-link')

	hamburger.addEventListener('click', function () {
		this.classList.toggle('active')
		mobileMenu.classList.toggle('active')
	})

	// Close mobile menu when clicking a link
	mobileLinks.forEach(link => {
		link.addEventListener('click', function () {
			hamburger.classList.remove('active')
			mobileMenu.classList.remove('active')
		})
	})

	// ========================================
	// SMOOTH SCROLLING
	// ========================================
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const target = document.querySelector(this.getAttribute('href'))
			if (target) {
				const headerOffset = 72 // Navigation height
				const elementPosition = target.getBoundingClientRect().top
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		})
	})

	// ========================================
	// NAVIGATION SCROLL EFFECT
	// ========================================
	const navigation = document.getElementById('navigation')
	let lastScroll = 0

	window.addEventListener('scroll', function () {
		const currentScroll = window.pageYOffset

		if (currentScroll > 100) {
			navigation.style.background = 'hsla(0, 0%, 7% / 0.95)'
		} else {
			navigation.style.background = 'hsla(0, 0%, 7% / 0.9)'
		}

		lastScroll = currentScroll
	})



	// ========================================
	// KEYBOARD NAVIGATION
	// ========================================
	document.addEventListener('keydown', function (e) {
		
		// Close mobile menu with Escape
		if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
			hamburger.classList.remove('active')
			mobileMenu.classList.remove('active')
		}
	})
})

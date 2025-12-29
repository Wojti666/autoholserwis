/* ========================================
   CENNIK PAGE - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
	// Initialize Lucide icons
	lucide.createIcons()

	// Scroll Animations
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
				observer.unobserve(entry.target)
			}
		})
	}, observerOptions)

	animatedElements.forEach(el => {
		observer.observe(el)
	})
})

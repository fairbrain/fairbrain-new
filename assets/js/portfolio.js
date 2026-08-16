document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('portfolio-gallery');
    const buttons = document.querySelectorAll('section.sticky button');

    if (!gallery) return;

    // Helper function to render a category
    function loadCategory(categoryKey) {
        // Clear gallery content
        gallery.innerHTML = '';

        const images = PORTFOLIO_IMAGES[categoryKey] || [];

        if (images.length === 0) {
            gallery.innerHTML = `
                <div class="col-span-full text-center py-20 px-4">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-gray-500 font-semibold text-lg">No projects in this category yet.</p>
                    <p class="text-gray-400 text-sm mt-1">We are updating our creative gallery. Check back soon!</p>
                </div>
            `;
            return;
        }

        // Generate and append cards
        images.forEach((imgFilename) => {
            const imgPath = `assets/images/portfolio/${categoryKey}/${imgFilename}`;
            const cardLink = document.createElement('a');
            cardLink.href = imgPath;
            cardLink.setAttribute('data-fancybox', 'portfolio');
            // Format nice title caption (e.g. Logo - 1)
            const cleanName = imgFilename.split('.')[0].replace(/-/g, ' ');
            cardLink.setAttribute('data-caption', `${categoryKey.toUpperCase()} - ${cleanName}`);
            cardLink.className = 'block overflow-hidden relative group';

            cardLink.innerHTML = `
                <img src="${imgPath}" alt="${categoryKey} project" class="w-full object-cover portfolio-card object-cover h-64" loading="lazy">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span class="text-white text-xs font-bold uppercase tracking-widest border border-white px-4 py-2 rounded-md bg-black/10">View Project</span>
                </div>
            `;

            gallery.appendChild(cardLink);
        });

        // Re-initialize GSAP entry animations for new cards
        gsap.from("#portfolio-gallery a", {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.03,
            ease: "power2.out"
        });

        // Rebind Fancybox for new elements
        if (typeof Fancybox !== 'undefined') {
            Fancybox.unbind("[data-fancybox]");
            Fancybox.bind("[data-fancybox]", {});
        }
    }

    // Bind event listeners to tabs
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            if (!category) return;

            // Reset all buttons to inactive styling (brand-purple)
            buttons.forEach((b) => {
                b.className = "bg-brand-purple text-white px-5 py-2.5 rounded hover:-translate-y-0.5 transition-transform font-bold text-xs shadow-sm uppercase tracking-wider";
            });

            // Set clicked button to active styling (brand-orange)
            btn.className = "bg-brand-orange text-white px-5 py-2.5 rounded hover:-translate-y-0.5 transition-transform font-bold text-xs shadow-md uppercase tracking-wider";

            // Load clicked category
            loadCategory(category);
        });
    });

    // Load initial category (logo)
    loadCategory('logo');
});

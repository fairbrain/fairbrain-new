document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        closeMobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    }

    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' custom-swiper-bullet w-3 h-3 rounded-full mx-1"></span>';
                },
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });

        const packagesSwiper = new Swiper('.packages-swiper', {
            loop: false,
            slidesPerView: 1,
            spaceBetween: 24,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.packages-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' custom-swiper-bullet w-3 h-3 rounded-full mx-1"></span>';
                },
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }

    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // custom options
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    gsap.from("#header .logo", { opacity: 0, scale: 0, duration: 1, delay: 0.2, ease: "power2.inOut" });
    gsap.from("#header nav a", { opacity: 0, y: -50, duration: 1, delay: 0.2, stagger: 0.2, ease: "power2.inOut" });
    gsap.from("#header .login", { opacity: 0, scale: 0, duration: 1, delay: 0.3, ease: "power2.inOut" });

    let homePortfolioParagraph = SplitText.create("#homeportfolio .head-portfolio p", {
        type: "words",
    });

    let homePortfolioTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#homeportfolio .head-portfolio",
            start: "top 90%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
        }
    });

    homePortfolioTl.from("#homeportfolio .head-portfolio img", {
        opacity: 0,
        filter: "blur(50px)",
        duration: 1.2,
        ease: "power2.out"
    });

    homePortfolioTl.from(homePortfolioParagraph.words, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
    }, "-=0.6");

    let gridImages = gsap.utils.toArray(".home-portfolio-grid img");

    gridImages.forEach(img => {
        gsap.from(img, {
            opacity: 0,
            filter: "blur(50px)",
            y: 40,
            scrollTrigger: {
                trigger: img,
                start: "top 80%",
                end: "bottom 30%",
                toggleActions: "play reverse play reverse",
            },
            ease: "power3.out",
            duration: 0.8
        });
    });

    // HOME ABOUT US SECTION

    let aboutUsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#homeaboutus .about-head",
            start: "top 90%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
        }
    });

    aboutUsTl.from("#homeaboutus .about-head", {
        opacity: 0,
        filter: "blur(50px)",
        duration: 1.2,
        ease: "back.inOut"
    });


    let aboutUsDesc = SplitText.create("#homeaboutus .about-desc", {
        type: "words",
        mask: "words"
    });


    aboutUsTl.from(aboutUsDesc.words, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
    }, "-=0.6");

    // PACKAGING SECTION

    let packDesc = SplitText.create("#homepackaging .pack-desc", {
        type: "words",
        mask: "words"
    });

    let homePackagingTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#homepackaging",
            start: "top 90%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
        }
    });

    homePackagingTl.from("#homepackaging .pack-head", {
        opacity: 0,
        filter: "blur(50px)",
        duration: 1.2,
        ease: "back.inOut"
    })

    homePackagingTl.from(packDesc.words, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
    });

    homePackagingTl.from("#homepackaging .swiper-slide", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
    });

    // STATS SECTION ANIMATION
    let statsItems = document.querySelectorAll("#homestats .stat-item");

    let statsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#homestats",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    statsItems.forEach((item, index) => {
        let targetValue = parseInt(item.getAttribute("data-target"));
        let counterElement = item.querySelector(".counter");
        let progressRing = item.querySelector(".progress-ring");

        let circumference = 282.74;
        let offset = circumference - (circumference * targetValue) / 100;

        let obj = { val: 0 };

        // Staggered start time
        let startTime = index * 0.2;

        statsTl.to(obj, {
            val: targetValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
                counterElement.innerHTML = Math.round(obj.val);
            }
        }, startTime);

        statsTl.to(progressRing, {
            strokeDashoffset: offset,
            duration: 2,
            ease: "power2.out"
        }, startTime);
    });

    gsap.from("footer", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "back.inOut",
        scrollTrigger: {
            trigger: "footer",
            start: "top bottom",
            toggleActions: "play none none reverse",
        }
    });

    // GENERAL PAGE ANIMATION

    // Login Page
    if (document.querySelector('main[style*="login-bg.jpg"]')) {
        gsap.from("main[style*='login-bg.jpg'] > div > div", { opacity: 0, scale: 0.9, y: 30, duration: 1, delay: 0.2, ease: "back.out(1.5)" });
    }

    // Portfolio, Service, About, Contact (Banner Sections)
    if (document.querySelector('main > section.bg-\\[\\#F0E6FF\\]') || document.querySelector('main > section.relative.py-12.lg\\:py-20')) {
        let bannerSection = document.querySelector('main > section:first-of-type');
        if (bannerSection) {
            gsap.from(bannerSection.querySelectorAll('h2, h3, img'), {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.2
            });
        }
    }

    // Generic section content staggered entry for inner pages
    let contentSections = document.querySelectorAll('main > section:not(:first-of-type)');
    contentSections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // DYNAMIC HOME PORTFOLIO GRID IMAGE ROTATION
    const homePortfolioLinks = document.querySelectorAll('.home-portfolio-link');
    if (homePortfolioLinks.length > 0 && typeof PORTFOLIO_IMAGES !== 'undefined') {
        // Compile a flat array of all image paths across all categories
        const imagePool = [];
        Object.keys(PORTFOLIO_IMAGES).forEach(category => {
            const files = PORTFOLIO_IMAGES[category];
            files.forEach(file => {
                imagePool.push({
                    category: category,
                    file: file,
                    path: `assets/images/portfolio/${category}/${file}`
                });
            });
        });

        if (imagePool.length > 0) {
            // Keep track of which images are currently visible to avoid duplicates
            const getVisiblePaths = () => {
                const paths = [];
                document.querySelectorAll('.home-portfolio-link').forEach(link => {
                    paths.push(link.getAttribute('href'));
                });
                return paths;
            };

            // Periodically swap a random slot with an unused image
            setInterval(() => {
                // Pick a random card slot (0 to 11)
                const randomIndex = Math.floor(Math.random() * homePortfolioLinks.length);
                const cardLink = homePortfolioLinks[randomIndex];
                const imgEl = cardLink.querySelector('img');

                if (imgEl) {
                    const visiblePaths = getVisiblePaths();
                    // Filter pool for images that are NOT currently visible
                    const availablePool = imagePool.filter(item => !visiblePaths.includes(item.path));
                    
                    if (availablePool.length > 0) {
                        const randomImage = availablePool[Math.floor(Math.random() * availablePool.length)];
                        
                        // Smooth GSAP cross-fade transition
                        gsap.to(imgEl, {
                            opacity: 0,
                            duration: 0.6,
                            onComplete: () => {
                                // Update src and lightbox links
                                imgEl.src = randomImage.path;
                                cardLink.href = randomImage.path;
                                
                                // Format nicer text for the lightbox caption
                                const cleanName = randomImage.file.split('.')[0].replace(/-/g, ' ');
                                cardLink.setAttribute('data-caption', `${randomImage.category.toUpperCase()} - ${cleanName}`);
                                
                                gsap.to(imgEl, {
                                    opacity: 1,
                                    duration: 0.6
                                });
                            }
                        });
                    }
                }
            }, 4000); // changes one random slot every 4 seconds
        }
    }

});

// Background Slideshow for Hero Section
class BackgroundSlideshow {
    constructor(container, interval = 3000) {
        this.container = container;
        this.slides = container.querySelectorAll('.hero-bg-slide');
        this.currentSlide = 0;
        this.interval = interval;
        this.startSlideshow();
    }

    startSlideshow() {
        setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }

    nextSlide() {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Move to next slide
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
    }
}

// Goals Section Slideshow
class GoalsSlideshow {
    constructor(container, interval = 4000) {
        this.container = container;
        this.slides = container.querySelectorAll('.goals-slide');
        this.indicators = container.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.interval = interval;
        this.isPaused = false;
        
        this.initializeSlideshow();
        this.setupEventListeners();
        this.startSlideshow();
    }

    initializeSlideshow() {
        // Ensure first slide is active
        this.slides[0].classList.add('active');
        this.indicators[0].classList.add('active');
    }

    setupEventListeners() {
        // Add click event listeners to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.isPaused = true;
        });

        this.container.addEventListener('mouseleave', () => {
            this.isPaused = false;
        });
    }

    goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        if (!this.isPaused) {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        }
    }

    startSlideshow() {
        setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }
}

// Typing Effect for Hero Section
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];

        if (this.isDeleting) {
            this.element.textContent = fullText.substring(0, this.element.textContent.length - 1);
        } else {
            this.element.textContent = fullText.substring(0, this.element.textContent.length + 1);
        }

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.element.textContent === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.element.textContent === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Countdown Timer
// Schedule Section Functionality
class ScheduleManager {
    constructor() {
        this.currentDay = 'day1';
        this.currentTopic = 'all';
        this.isCollapsed = false;
        
        this.init();
    }
    
    init() {
        this.initializeTabs();
        this.initializeDayNavigation();
        this.initializeCollapseButton();
        this.filterEvents();
    }
    
    initializeTabs() {
        const tabs = document.querySelectorAll('.schedule-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                // Update current topic
                this.currentTopic = e.target.dataset.topic;
                this.filterEvents();
            });
        });
    }
    
    initializeDayNavigation() {
        const dayTabs = document.querySelectorAll('.day-tab');
        dayTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Remove active class from all day tabs
                dayTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                e.currentTarget.classList.add('active');
                
                // Update current day
                this.currentDay = e.currentTarget.dataset.day;
                this.switchDay();
            });
        });
    }
    
    initializeCollapseButton() {
        const collapseBtn = document.getElementById('collapseAllBtn');
        const scheduleContent = document.querySelector('.schedule-content');
        
        if (collapseBtn && scheduleContent) {
            collapseBtn.addEventListener('click', () => {
                this.isCollapsed = !this.isCollapsed;
                
                if (this.isCollapsed) {
                    scheduleContent.classList.add('collapsed');
                    collapseBtn.classList.add('collapsed');
                    collapseBtn.querySelector('.collapse-text').textContent = 'Expand All';
                } else {
                    scheduleContent.classList.remove('collapsed');
                    collapseBtn.classList.remove('collapsed');
                    collapseBtn.querySelector('.collapse-text').textContent = 'Collapse All';
                }
            });
        }
    }
    
    switchDay() {
        // Hide all day events
        const allDayEvents = document.querySelectorAll('.day-events');
        allDayEvents.forEach(events => {
            events.classList.remove('active');
        });
        
        // Show selected day events
        const selectedDayEvents = document.getElementById(this.currentDay);
        if (selectedDayEvents) {
            selectedDayEvents.classList.add('active');
        }
        
        // Filter events for the new day
        this.filterEvents();
    }
    
    filterEvents() {
        const currentDayEvents = document.getElementById(this.currentDay);
        if (!currentDayEvents) return;
        
        const events = currentDayEvents.querySelectorAll('.event-item');
        
        events.forEach(event => {
            const eventTopic = event.dataset.topic;
            
            if (this.currentTopic === 'all' || eventTopic === 'all' || eventTopic === this.currentTopic) {
                event.classList.remove('hidden');
            } else {
                event.classList.add('hidden');
            }
        });
    }
}

class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = {
            weeks: document.getElementById('weeks'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        // Check if target date is valid
        if (isNaN(this.targetDate)) {
            console.error('Invalid countdown date provided');
            this.setDefaultValues();
            return;
        }
        
        this.startCountdown();
    }
    
    setDefaultValues() {
        // Set default values if date is invalid
        Object.values(this.elements).forEach(element => {
            if (element) {
                element.textContent = '00';
            }
        });
    }
    
    formatNumber(num) {
        // Ensure we always return a valid two-digit string
        if (isNaN(num) || num < 0) {
            return '00';
        }
        return num.toString().padStart(2, '0');
    }
    
    calculateTimeLeft() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            // Event has passed
            return {
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                expired: true
            };
        }
        
        // Calculate time units
        const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        return {
            weeks: weeks,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            expired: false
        };
    }
    
    updateDisplay() {
        const timeLeft = this.calculateTimeLeft();
        
        // Update each element if it exists
        if (this.elements.weeks) {
            this.elements.weeks.textContent = this.formatNumber(timeLeft.weeks);
        }
        if (this.elements.days) {
            this.elements.days.textContent = this.formatNumber(timeLeft.days);
        }
        if (this.elements.hours) {
            this.elements.hours.textContent = this.formatNumber(timeLeft.hours);
        }
        if (this.elements.minutes) {
            this.elements.minutes.textContent = this.formatNumber(timeLeft.minutes);
        }
        if (this.elements.seconds) {
            this.elements.seconds.textContent = this.formatNumber(timeLeft.seconds);
        }
        
        // If countdown has expired, you can add special handling here
        if (timeLeft.expired) {
            console.log('Countdown has expired');
            // Optionally stop the interval or show a message
        }
    }
    
    startCountdown() {
        // Update immediately
        this.updateDisplay();
        
        // Update every second
        this.interval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    const countdownSection = document.querySelector('.countdown-section');
    if (countdownSection) {
        const countdownDate = countdownSection.getAttribute('data-countdown-date');
        if (countdownDate) {
            new CountdownTimer(countdownDate);
        } else {
            // Fallback date if data attribute is missing
            new CountdownTimer('2025-02-20T09:00:00');
        }
    }

    // Initialize background slideshow
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        new BackgroundSlideshow(heroBackground, 3000); // Change every 3 seconds
    }

    // Initialize Goals slideshow
    const goalsSlideshow = document.querySelector('.goals-slideshow');
    if (goalsSlideshow) {
        new GoalsSlideshow(goalsSlideshow, 4000); // Change every 4 seconds
    }

    // Initialize typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['SEMICONDUCTOR', 'AI & GENAI', 'FINTECH'];
        new TypeWriter(typingElement, words, 2000);
    }

    // Initialize Schedule Manager
    const scheduleSection = document.querySelector('.schedule-section');
    if (scheduleSection) {
        new ScheduleManager();
    }

    // Initialize Back to Top Button and Mobile Menu
    new BackToTopButton();
    new MobileMenuManager();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    initNavbarScrollEffect();

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Hero section should be visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Card hover animations
    const cards = document.querySelectorAll('.speaker-card, .topic-card, .goal-item, .day-card, .venue-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Set initial body opacity for smooth load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (navMenu && mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }

    // Parallax effect for guests-speakers section
    const guestsHero = document.querySelector('.guests-speakers-background');
    if (guestsHero) {
        const guestsSection = document.querySelector('.guests-speakers-hero');
        const rect = guestsSection.getBoundingClientRect();
        const speed = 0.5;
        
        // Only apply parallax when section is in viewport
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const yPos = -(rect.top * speed);
            guestsHero.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// Preload images
function preloadImages() {
    const imageUrls = [
        'https://www.vgic.net/wp-content/uploads/2025/01/heading-1-min.jpg',
        'https://www.vgic.net/wp-content/uploads/2025/01/Marina_Bay_digital_Singapore_1.jpg',
        'https://www.vgic.net/wp-content/uploads/2025/01/conference5-1024x683.jpg',
        'https://www.vgic.net/wp-content/uploads/2025/01/heading-4-min-1024x683.jpg',
        'https://www.vgic.net/wp-content/uploads/2025/01/2C9A0179-min-min-1024x683.jpg',
        'https://www.vgic.net/wp-content/uploads/2025/01/sing2-min.jpeg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Back to Top Button Functionality
class BackToTopButton {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (!this.button) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Handle button click
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }

    scrollToTop() {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.navbar = document.querySelector('.navbar-collapse');
        this.overlay = document.getElementById('navbarOverlay');
        this.toggleButton = document.querySelector('.navbar-toggler');
        this.closeButton = document.querySelector('.mobile-close-btn');
        this.init();
    }

    init() {
        if (!this.navbar || !this.overlay) return;

        // Handle Bootstrap collapse events
        this.navbar.addEventListener('show.bs.collapse', () => {
            this.showOverlay();
        });

        this.navbar.addEventListener('hide.bs.collapse', () => {
            this.hideOverlay();
        });

        // Handle overlay click to close menu
        this.overlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Handle close button click
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu();
            });
        }

        // Handle navigation link clicks on mobile
        const navLinks = this.navbar.querySelectorAll('.nav-link:not(.language-selector)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    this.closeMenu();
                }
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navbar.classList.contains('show')) {
                this.closeMenu();
            }
        });
    }

    showOverlay() {
        this.overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideOverlay() {
        this.overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeMenu() {
        // Check if menu is open
        if (this.navbar.classList.contains('show')) {
            // Use Bootstrap's collapse to properly close
            const bsCollapse = bootstrap.Collapse.getInstance(this.navbar) || new bootstrap.Collapse(this.navbar, { toggle: false });
            bsCollapse.hide();
        }
    }
}

// Initialize navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

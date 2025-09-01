// Easy Personal Loans - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Hero Carousel
    const heroCarousel = {
        slides: document.querySelectorAll('#hero-carousel .carousel-item'),
        dotsContainer: document.getElementById('carousel-dots'),
        currentSlide: 0,
        timer: null,

        init() {
            if (this.slides.length === 0) return;
            this.createDots();
            this.goToSlide(0);
            this.start();
        },

        start() {
            this.timer = setInterval(() => this.nextSlide(), 5000);
        },

        goToSlide(slideIndex) {
            this.currentSlide = (slideIndex + this.slides.length) % this.slides.length;
            this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentSlide));
            this.updateDots();
        },

        nextSlide() {
            this.goToSlide(this.currentSlide + 1);
        },

        createDots() {
            if (!this.dotsContainer) return;
            this.slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition-all', 'duration-300', 'hover:bg-blue-400');
                dot.addEventListener('click', () => {
                    this.goToSlide(i);
                    clearInterval(this.timer);
                    this.start();
                });
                this.dotsContainer.appendChild(dot);
            });
        },

        updateDots() {
            if (!this.dotsContainer) return;
            Array.from(this.dotsContainer.children).forEach((dot, i) => {
                dot.classList.toggle('bg-blue-600', i === this.currentSlide);
                dot.classList.toggle('bg-slate-300', i !== this.currentSlide);
                dot.classList.toggle('w-5', i === this.currentSlide);
            });
        }
    };

    heroCarousel.init();

    // Testimonial Carousel
    const testimonialCarousel = {
        slides: document.querySelectorAll('#testimonial-carousel .testimonial-item'),
        prevBtn: document.getElementById('prev-testimonial'),
        nextBtn: document.getElementById('next-testimonial'),
        currentSlide: 0,

        init() {
            if (this.slides.length === 0) return;
            this.goToSlide(0);
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        },

        goToSlide(slideIndex) {
            this.currentSlide = (slideIndex + this.slides.length) % this.slides.length;
            this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentSlide));
        },

        nextSlide() {
            this.goToSlide(this.currentSlide + 1);
        },

        prevSlide() {
            this.goToSlide(this.currentSlide - 1);
        }
    };

    testimonialCarousel.init();

    // EMI Calculator
    const calculator = {
        loanAmountInput: document.getElementById('loanAmount'),
        interestRateInput: document.getElementById('interestRate'),
        loanTenureInput: document.getElementById('loanTenure'),
        emiResultEl: document.getElementById('emiResult'),
        principalResultEl: document.getElementById('principalResult'),
        interestResultEl: document.getElementById('interestResult'),
        totalResultEl: document.getElementById('totalResult'),
        
        formatCurrency(num) {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(num);
        },
        
        calculate() {
            const p = parseFloat(this.loanAmountInput.value) || 0;
            const r = parseFloat(this.interestRateInput.value) / 100 / 12 || 0;
            const n = parseFloat(this.loanTenureInput.value) * 12 || 0;
            
            if (p > 0 && r > 0 && n > 0) {
                const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalPayable = emi * n;
                const totalInterest = totalPayable - p;
                
                this.emiResultEl.textContent = this.formatCurrency(emi);
                this.principalResultEl.textContent = this.formatCurrency(p);
                this.interestResultEl.textContent = this.formatCurrency(totalInterest);
                this.totalResultEl.textContent = this.formatCurrency(totalPayable);
            } else {
                this.emiResultEl.textContent = '₹ 0';
            }
        },
        
        init() {
            if (!this.loanAmountInput) return;
            
            [this.loanAmountInput, this.interestRateInput, this.loanTenureInput].forEach(input => {
                input.addEventListener('input', () => this.calculate());
            });
            this.calculate();
        }
    };
    
    calculator.init();

    // EMI Calculator Modal Logic
    const modal = document.getElementById('calculator-modal');
    const closeBtn = document.getElementById('close-calculator-modal');
    
    const openModal = () => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };
    
    // Calculator button event listeners
    const calculatorButtons = [
        'header-calculator-button',
        'mobile-calculator-button',
        'cta-calculator-button'
    ];
    
    calculatorButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                // Toggle current item
                item.classList.toggle('open');
            });
        }
    });

    // Counter Animation
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        updateCounter();
    };

    // Scroll Animations with Counter
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Animate counters when they come into view
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.revealable').forEach(el => observer.observe(el));

    // Observe stats section for counter animation
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Easy Personal Loans - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function openMobileMenu() {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenuBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenuBackdrop.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Mobile Products Dropdown
    const mobileProductsToggle = document.querySelector('.mobile-products-toggle');
    const mobileProductsContent = document.querySelector('.mobile-products-content');
    const mobileProductsArrow = document.querySelector('.mobile-products-arrow');

    if (mobileProductsToggle && mobileProductsContent) {
        mobileProductsToggle.addEventListener('click', () => {
            mobileProductsContent.classList.toggle('hidden');
            mobileProductsArrow.classList.toggle('rotate-180');
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

    // Multi-Step Loan Application Modal
    const loanModal = document.getElementById('loan-application-modal');
    const closeLoanModalBtn = document.getElementById('close-loan-application-modal');
    let currentStep = 1;
    const totalSteps = 4;

    const openLoanModal = () => {
        loanModal.classList.remove('opacity-0', 'pointer-events-none');
        loanModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        showStep(1);
    };

    const closeLoanModal = () => {
        loanModal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            loanModal.style.display = 'none';
        }, 300);
    };

    const showStep = (step) => {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.classList.add('hidden');
            stepEl.classList.remove('active');
        });

        // Show current step
        const currentStepEl = document.getElementById(`step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.remove('hidden');
            currentStepEl.classList.add('active');
        }

        // Update step indicators
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNum = index + 1;
            const circle = indicator.querySelector('div');

            if (stepNum <= step) {
                indicator.classList.add('active');
                circle.classList.remove('bg-gray-300', 'text-gray-600');
                circle.classList.add('bg-blue-600', 'text-white');
            } else {
                indicator.classList.remove('active');
                circle.classList.remove('bg-blue-600', 'text-white');
                circle.classList.add('bg-gray-300', 'text-gray-600');
            }
        });

        currentStep = step;
        updateFormFields();
    };

    const updateFormFields = () => {
        const workProfileElement = document.getElementById('workProfile');
        const workProfile = workProfileElement ? workProfileElement.value : '';
        const incomeLabel = document.getElementById('incomeLabel');

        // Update income label based on work profile
        if (incomeLabel) {
            if (workProfile === 'salaried') {
                incomeLabel.textContent = 'Net Monthly Income *';
            } else if (workProfile === 'self-employed') {
                incomeLabel.textContent = 'Annual Sales *';
            } else {
                incomeLabel.textContent = 'Monthly Income *';
            }
        }

        // Show/hide fields based on work profile in step 2
        const selfEmployedFields = document.getElementById('self-employed-fields');
        const salariedFields = document.getElementById('salaried-fields');

        if (selfEmployedFields && salariedFields) {
            if (workProfile === 'self-employed') {
                selfEmployedFields.classList.remove('hidden');
                salariedFields.classList.add('hidden');
            } else if (workProfile === 'salaried') {
                selfEmployedFields.classList.add('hidden');
                salariedFields.classList.remove('hidden');
            }
        }

        // Show/hide financial details based on work profile in step 3
        const selfEmployedFinancial = document.getElementById('self-employed-financial');
        const salariedFinancial = document.getElementById('salaried-financial');

        if (selfEmployedFinancial && salariedFinancial) {
            if (workProfile === 'self-employed') {
                selfEmployedFinancial.classList.remove('hidden');
                salariedFinancial.classList.add('hidden');
            } else if (workProfile === 'salaried') {
                selfEmployedFinancial.classList.add('hidden');
                salariedFinancial.classList.remove('hidden');
            } else {
                // Default to salaried if no work profile is selected
                selfEmployedFinancial.classList.add('hidden');
                salariedFinancial.classList.remove('hidden');
            }
        }
    };

    // Event listeners for Apply Now buttons
    document.querySelectorAll('a[href="#contact"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openLoanModal();
        });
    });

    // Also handle buttons with "Apply Now" text
    document.querySelectorAll('.btn-shine, button, a').forEach(button => {
        if (button.textContent && button.textContent.trim().includes('Apply Now')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openLoanModal();
            });
        }
    });

    // Quick Apply Form Integration
    const quickApplyBtn = document.getElementById('quick-apply-btn');
    if (quickApplyBtn) {
        quickApplyBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Get quick form values
            const quickName = document.getElementById('quick-full-name').value;
            const quickPhone = document.getElementById('quick-phone').value;
            const quickLoanAmount = document.getElementById('quick-loan-amount').value;

            // Pre-fill the main form if values exist
            if (quickName) {
                const mainNameField = document.getElementById('fullName');
                if (mainNameField) mainNameField.value = quickName;
            }

            if (quickPhone) {
                const mainPhoneField = document.getElementById('phoneNumber');
                if (mainPhoneField) mainPhoneField.value = quickPhone;
            }

            if (quickLoanAmount) {
                const mainLoanAmountField = document.getElementById('loanAmount');
                if (mainLoanAmountField) {
                    // Convert quick loan amount to actual amount
                    const amountMap = {
                        '1-5': '300000',
                        '5-10': '750000',
                        '10-25': '1750000',
                        '25+': '2500000'
                    };
                    mainLoanAmountField.value = amountMap[quickLoanAmount] || '';
                }
            }

            // Open the main loan modal
            openLoanModal();
        });
    }

    // Close modal event listeners
    if (closeLoanModalBtn) {
        closeLoanModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeLoanModal();
        });
    }

    if (loanModal) {
        loanModal.addEventListener('click', (e) => {
            if (e.target === loanModal) {
                closeLoanModal();
            }
        });
    }

    // Work profile change listener
    const workProfileSelect = document.getElementById('workProfile');
    if (workProfileSelect) {
        workProfileSelect.addEventListener('change', updateFormFields);
    }

    // Step navigation
    document.getElementById('next-step-1')?.addEventListener('click', () => {
        if (validateStep(1)) showStep(2);
    });

    document.getElementById('prev-step-2')?.addEventListener('click', () => showStep(1));
    document.getElementById('next-step-2')?.addEventListener('click', () => {
        if (validateStep(2)) showStep(3);
    });

    document.getElementById('prev-step-3')?.addEventListener('click', () => showStep(2));
    document.getElementById('next-step-3')?.addEventListener('click', () => {
        if (validateStep(3)) showStep(4);
    });

    document.getElementById('submit-application')?.addEventListener('click', () => {
        // Handle form submission
        alert('Application submitted successfully! We will contact you soon.');
        closeLoanModal();
    });

    const validateStep = (step) => {
        // Basic validation - you can enhance this
        let requiredFields;

        if (step === 3) {
            // For step 3, only validate visible financial details section
            const workProfile = document.getElementById('workProfile').value;
            if (workProfile === 'salaried') {
                requiredFields = document.querySelectorAll('#salaried-financial input[required], #salaried-financial select[required]');
            } else if (workProfile === 'self-employed') {
                requiredFields = document.querySelectorAll('#self-employed-financial input[required], #self-employed-financial select[required]');
            } else {
                alert('Please select a work profile first.');
                return false;
            }
        } else {
            requiredFields = document.querySelectorAll(`#step-${step} input[required], #step-${step} select[required]`);
        }

        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    };

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

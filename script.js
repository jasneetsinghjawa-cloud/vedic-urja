    // ===== INTRO SCREEN =====
    document.addEventListener('DOMContentLoaded', () => {
        // Generate intro particles
        const particlesContainer = document.getElementById('introParticles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('intro-particle');
            const size = Math.random() * 100 + 40;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }

        // Animate intro therapy cards
        const introCards = document.querySelectorAll('.intro-therapy-card');
        introCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, 800 + (index * 300));
        });

        // Hide intro screen
        setTimeout(() => {
            const intro = document.getElementById('introScreen');
            intro.classList.add('hide');
            setTimeout(() => {
                intro.style.display = 'none';
                animateHero();
            }, 800);
        }, 5000);
    });

    // ===== HERO ANIMATIONS =====
    function animateHero() {
        const elements = [
            { el: '.hero-badge', delay: 100 },
            { el: '.hero-title', delay: 250 },
            { el: '.hero-description', delay: 400 },
            { el: '.hero-buttons', delay: 550 },
            { el: '.hero-stats', delay: 700 },
            { el: '.hero-visual', delay: 300 },
        ];

        elements.forEach(({ el, delay }) => {
            setTimeout(() => {
                const element = document.querySelector(el);
                if (element) {
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) translateX(0)';
                }
            }, delay);
        });

        // Animate stat counters
        setTimeout(() => {
            animateCounters();
        }, 1200);
    }

    // ===== COUNTER ANIMATION =====
    function animateCounters() {
        const statItems = document.querySelectorAll('.stat-item h3');
        statItems.forEach(stat => {
            const text = stat.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[1]);
                let current = 0;
                const suffix = text.replace(match[1], '');
                const duration = 2000;
                const increment = target / (duration / 16);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.innerHTML = Math.floor(current) + suffix;
                }, 16);
            }
        });
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar glass effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });

        // Parallax for hero shapes
        const shapes = document.querySelectorAll('.hero-shape');
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.03;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE MENU =====
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navBackdrop = document.getElementById('navBackdrop');

    function toggleMenu(isOpen) {
        mobileToggle.classList.toggle('open', isOpen);
        navLinks.classList.toggle('open', isOpen);
        if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', () => {
        const isOpen = !navLinks.classList.contains('open');
        toggleMenu(isOpen);
    });

    if (navBackdrop) {
        navBackdrop.addEventListener('click', () => toggleMenu(false));
    }

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.offsetTop - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set minimum date to today
    const dateInput = document.getElementById('preferred_date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // ===== EMAILJS CONFIGURATION =====
    const EMAILJS_PUBLIC_KEY = "zhqiT3p26v9YzslES";
    const EMAILJS_SERVICE_ID = "service_53rgc8l";
    const EMAILJS_ADMIN_TEMPLATE_ID = "template_3a6ycuc";
    const EMAILJS_PATIENT_TEMPLATE_ID = "template_lneie39"; // Optional: Add a second template ID if you create an auto-reply template

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // ===== FORM SUBMIT WITH REAL-TIME EMAIL NOTIFICATIONS =====
    async function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const btn = document.getElementById('submitBtn');
        const statusBox = document.getElementById('formStatus');
        const originalBtnHTML = btn.innerHTML;

        const patientName = document.getElementById('patient_name').value.trim();
        const patientPhone = document.getElementById('patient_phone').value.trim();
        const patientEmail = document.getElementById('patient_email').value.trim();
        const therapyType = document.getElementById('therapy_type').value;
        const preferredDate = document.getElementById('preferred_date').value;
        const preferredSlot = document.getElementById('preferred_slot').value;
        const patientConcern = document.getElementById('patient_concern').value.trim() || 'General consultation / not specified';
        const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

        // Show loading state
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ Sending Request...</span>';
        statusBox.style.display = 'none';

        // Prepare email template data (supports both custom & default EmailJS template variables)
        const detailedMessage = `Patient Name: ${patientName}\nPhone: ${patientPhone}\nEmail: ${patientEmail}\nTherapy: ${therapyType}\nDate: ${preferredDate}\nSlot: ${preferredSlot}\nHealth Concern: ${patientConcern}`;

        const templateParams = {
            admin_email: 'jasneetsinghjawa@gmail.com',
            patient_name: patientName,
            patient_phone: patientPhone,
            patient_email: patientEmail,
            therapy_type: therapyType,
            preferred_date: preferredDate,
            preferred_slot: preferredSlot,
            patient_concern: patientConcern,
            submission_time: submissionTime,
            center_name: 'Vedic Urja Alternative Therapy Center',
            therapist_name: 'Jaspreet Kaur (10 Years Exp.)',
            center_phone: '8094086836',
            center_address: 'Apna Ghar, Shalimar Extension, Alwar, Rajasthan',

            // Default EmailJS template variable mappings (in case the template uses default names)
            from_name: patientName,
            to_name: 'Jaspreet Kaur / Vedic Urja',
            reply_to: patientEmail,
            message: detailedMessage
        };

        try {
            // Check if EmailJS keys are provided
            if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && typeof emailjs !== 'undefined') {
                // 1. Send detailed notification email to Therapist / Clinic (jasneetsinghjawa@gmail.com)
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, templateParams);

                // 2. Send instant confirmation email to Patient
                if (EMAILJS_PATIENT_TEMPLATE_ID && EMAILJS_PATIENT_TEMPLATE_ID !== "YOUR_PATIENT_TEMPLATE_ID") {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_PATIENT_TEMPLATE_ID, templateParams);
                }

                // Success feedback
                btn.innerHTML = '<span>✓ Appointment Requested!</span>';
                btn.style.background = 'linear-gradient(135deg, #0D9B6A, #047857)';
                
                statusBox.style.display = 'block';
                statusBox.style.background = 'rgba(13, 155, 106, 0.12)';
                statusBox.style.color = '#047857';
                statusBox.style.border = '1px solid rgba(13, 155, 106, 0.3)';
                statusBox.innerHTML = `
                    <div style="font-weight: 700; font-size: 1rem; margin-bottom: 6px;">✓ Appointment Request Received!</div>
                    <div>Hello <strong>${patientName}</strong>, your request for <strong>${therapyType}</strong> on <strong>${preferredDate} (${preferredSlot})</strong> has been registered.</div>
                    <div style="margin-top: 6px; font-size: 0.85rem; color: #065F46;">A confirmation email has been dispatched to <strong>${patientEmail}</strong>, and therapist Jaspreet Kaur has been notified at <strong>jasneetsinghjawa@gmail.com</strong>. We will call you at <strong>${patientPhone}</strong> to confirm.</div>
                `;

                form.reset();
            } else {
                // If EmailJS keys haven't been pasted yet, provide an instant WhatsApp & Email backup so booking isn't lost
                await new Promise(resolve => setTimeout(resolve, 800));

                const waMessage = encodeURIComponent(
                    `*New Appointment Request - Vedic Urja*\n` +
                    `*Patient:* ${patientName}\n` +
                    `*Phone:* ${patientPhone}\n` +
                    `*Email:* ${patientEmail}\n` +
                    `*Therapy:* ${therapyType}\n` +
                    `*Date:* ${preferredDate}\n` +
                    `*Slot:* ${preferredSlot}\n` +
                    `*Concern:* ${patientConcern}`
                );

                btn.innerHTML = '<span>✓ Details Saved!</span>';
                statusBox.style.display = 'block';
                statusBox.style.background = 'rgba(46, 196, 182, 0.12)';
                statusBox.style.color = '#0D6B5C';
                statusBox.style.border = '1px solid rgba(46, 196, 182, 0.3)';
                statusBox.innerHTML = `
                    <div style="font-weight: 700; font-size: 1rem; margin-bottom: 6px;">📋 Request Recorded for ${patientName}</div>
                    <div style="margin-bottom: 8px;"><strong>Therapy:</strong> ${therapyType} | <strong>Date:</strong> ${preferredDate} (${preferredSlot})</div>
                    <div style="font-size: 0.85rem; margin-bottom: 12px; color: #044E43;">
                        ℹ️ <em>To enable automated real-time email delivery directly to <strong>jasneetsinghjawa@gmail.com</strong>, configure your EmailJS API keys in the code.</em>
                    </div>
                    <a href="https://wa.me/918094086836?text=${waMessage}" target="_blank" style="display: inline-block; padding: 10px 18px; background: #25D366; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.88rem; margin-top: 4px;">
                        📲 Confirm Instantly on WhatsApp →
                    </a>
                `;
            }

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalBtnHTML;
                btn.style.background = '';
            }, 6000);

        } catch (error) {
            console.error('Email sending error:', error);
            btn.disabled = false;
            btn.innerHTML = originalBtnHTML;

            statusBox.style.display = 'block';
            statusBox.style.background = 'rgba(239, 68, 68, 0.1)';
            statusBox.style.color = '#DC2626';
            statusBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            statusBox.innerHTML = `⚠️ Could not send automated email. Please contact therapist Jaspreet Kaur directly at <a href="tel:8094086836" style="color: #047857; font-weight: 700;">8094086836</a> or click below to message on WhatsApp: <br><a href="https://wa.me/918094086836" target="_blank" style="display:inline-block; margin-top: 8px; padding: 6px 14px; background: #25D366; color: white; border-radius: 6px; text-decoration: none;">Chat on WhatsApp</a>`;
        }
    }

    // ===== THERAPY CARD TILT EFFECT =====
    document.querySelectorAll('.therapy-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `translateY(-12px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ===== CURSOR GLOW EFFECT =====
    const glowEl = document.createElement('div');
    glowEl.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(46,196,182,0.04), transparent 70%);
        pointer-events: none;
        z-index: 0;
        transition: transform 0.2s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(glowEl);

    document.addEventListener('mousemove', (e) => {
        glowEl.style.left = e.clientX + 'px';
        glowEl.style.top = e.clientY + 'px';
    });

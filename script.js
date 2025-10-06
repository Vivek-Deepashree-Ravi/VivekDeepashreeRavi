// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Click-to-scroll from scroll indicator to About section
document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.querySelector('.scroll-indicator');
    const about = document.querySelector('#about');
    if (indicator && about) {
        indicator.addEventListener('click', () => {
            about.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Animate project cards on scroll
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const subject = formData.get('subject') || contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add input names to form fields for better functionality
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.querySelector('input[placeholder="Your Name"]');
    const emailInput = document.querySelector('input[placeholder="Your Email"]');
    const subjectInput = document.querySelector('input[placeholder="Subject"]');
    const messageInput = document.querySelector('textarea[placeholder="Your Message"]');
    
    if (nameInput) nameInput.name = 'name';
    if (emailInput) emailInput.name = 'email';
    if (subjectInput) subjectInput.name = 'subject';
    if (messageInput) messageInput.name = 'message';
});

// Parallax effect for hero section (apply to background image only)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        const rate = scrolled * -0.2; // lighter parallax to avoid overlap
        heroBg.style.transform = `translateY(${rate}px) scale(1.06)`;
        heroBg.style.willChange = 'transform';
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

// Add reveal class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    revealObserver.observe(section);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ------------ Project Carousel (lightweight) ------------
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach((carousel, idx) => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let current = 0;

        // Build dots only when multiple slides
        if (slides.length > 1) {
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });
        }
        const dots = Array.from(dotsContainer.children);

        function update() {
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function goTo(i) {
            current = (i + slides.length) % slides.length;
            update();
        }

        // Hide arrows/dots when single slide
        if (slides.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (dotsContainer) dotsContainer.style.display = 'none';
        } else {
            prevBtn?.addEventListener('click', () => goTo(current - 1));
            nextBtn?.addEventListener('click', () => goTo(current + 1));
        }

        // Helper to ensure video sources are attached before play
        function ensureVideoSources(videoEl) {
            if (!videoEl) return;
            const sources = Array.from(videoEl.querySelectorAll('source'));
            let updated = false;
            sources.forEach(srcEl => {
                const dataSrc = srcEl.getAttribute('data-src');
                if (dataSrc && !srcEl.getAttribute('src')) {
                    srcEl.setAttribute('src', dataSrc);
                    updated = true;
                }
            });
            if (updated) {
                // Load metadata only when user intends to play
                try { videoEl.load(); } catch (e) {}
            }
        }

        // Video play overlay
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            const overlay = slide.querySelector('.play-overlay');
            if (video && overlay) {
                video.controls = false;
                overlay.addEventListener('click', () => {
                    ensureVideoSources(video);
                    // Pause others in this carousel
                    slides.forEach(s => {
                        const v = s.querySelector('video');
                        if (v && !v.paused) v.pause();
                        const o = s.querySelector('.play-overlay');
                        if (o) o.style.display = '';
                    });
                    overlay.style.display = 'none';
                    const tryPlay = () => {
                        const p = video.play();
                        if (p && typeof p.then === 'function') {
                            p.catch(() => { /* ignore auto-play errors */ });
                        }
                    };
                    if (video.readyState >= 2) {
                        tryPlay();
                    } else {
                        video.addEventListener('canplay', tryPlay, { once: true });
                    }
                    video.setAttribute('controls', 'controls');
                });
                // Restore overlay when video ends
                video.addEventListener('ended', () => {
                    video.removeAttribute('controls');
                    overlay.style.display = '';
                });
            }
        });

        update();
    });
});

// -------- Lazy attach video sources using IntersectionObserver --------
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');

    // Move src -> data-src initially to prevent any eager fetches
    videos.forEach(video => {
        const sources = video.querySelectorAll('source');
        sources.forEach(src => {
            const current = src.getAttribute('src');
            if (current) {
                src.setAttribute('data-src', current);
                src.removeAttribute('src');
            }
        });
    });

    const attachSources = (video) => {
        const sources = video.querySelectorAll('source');
        let updated = false;
        sources.forEach(src => {
            const dataSrc = src.getAttribute('data-src');
            if (dataSrc && !src.getAttribute('src')) {
                src.setAttribute('src', dataSrc);
                updated = true;
            }
        });
        // Do not call load() here to respect preload="none" until user intent
        return updated;
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const v = entry.target;
                attachSources(v);
                io.unobserve(v);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    videos.forEach(v => io.observe(v));
});

// Video placeholder functionality
document.addEventListener('DOMContentLoaded', () => {
    // Helper to derive a human-readable title from a video src
    function deriveTitleFromSrc(src) {
        if (!src) return '';
        try {
            const decoded = decodeURIComponent(src);
            const filename = decoded.split('/').pop() || '';
            const withoutExt = filename.replace(/\.[^/.]+$/, '');
            const spaced = withoutExt.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
            // Title case words
            return spaced.replace(/\b\w/g, (m) => m.toUpperCase());
        } catch (e) {
            return src;
        }
    }

    // Auto-set captions based on actual video filenames
    const videoSources = document.querySelectorAll('video source');
    videoSources.forEach(source => {
        const src = source.getAttribute('src');
        if (!src) return;
        const derivedTitle = deriveTitleFromSrc(src);
        const videoCard = source.closest('.video-card');
        if (videoCard) {
            let caption = videoCard.querySelector('.video-caption');
            if (!caption) {
                caption = document.createElement('div');
                caption.className = 'video-caption';
                videoCard.appendChild(caption);
            }
            caption.textContent = derivedTitle;
        }
    });

    // Add click handlers for video placeholders
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const projectEl = this.closest('.project-card') || this.closest('.special-project');
            let videoTitle = this.querySelector('span')?.textContent?.trim();
            const sourceInProject = projectEl?.querySelector('video source');
            if (sourceInProject) {
                const derived = deriveTitleFromSrc(sourceInProject.getAttribute('src'));
                if (derived) videoTitle = derived;
            }
            const projectName = projectEl?.querySelector('h3')?.textContent;
            
            // Show a modal or alert for now (can be replaced with actual video player)
            showVideoModal(videoTitle, projectName);
        });
        
        // Add hover effects
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate special projects on scroll
    const specialProjects = document.querySelectorAll('.special-project');
    specialProjects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        project.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const specialProjectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    specialProjects.forEach(project => {
        specialProjectObserver.observe(project);
    });
});

// Video modal function (placeholder for future video integration)
function showVideoModal(videoTitle, projectName) {
    // Create modal HTML
    const modalHTML = `
        <div class="video-modal" id="videoModal">
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3>${videoTitle}</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="video-modal-body">
                    <div class="video-placeholder-large">
                        <i class="fas fa-play-circle"></i>
                        <span>Video Coming Soon</span>
                        <p>This video will showcase ${projectName}</p>
                        <p>Currently in development - check back soon!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('videoModal');
    modal.style.display = 'flex';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal) {
            modal.remove();
        }
    });
}

// Add CSS for video modal
const videoModalStyle = document.createElement('style');
videoModalStyle.textContent = `
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    }
    
    .video-modal-content {
        background: white;
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .video-modal-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .video-modal-header h3 {
        margin: 0;
        font-size: 1.3rem;
    }
    
    .close-modal {
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
        transition: transform 0.2s ease;
    }
    
    .close-modal:hover {
        transform: scale(1.1);
    }
    
    .video-modal-body {
        padding: 2rem;
    }
    
    .video-placeholder-large {
        text-align: center;
        padding: 3rem 2rem;
        background: #f8f9fa;
        border-radius: 15px;
        border: 2px dashed #dee2e6;
    }
    
    .video-placeholder-large i {
        font-size: 4rem;
        color: #667eea;
        margin-bottom: 1rem;
        display: block;
    }
    
    .video-placeholder-large span {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
        display: block;
        margin-bottom: 1rem;
    }
    
    .video-placeholder-large p {
        color: #4a5568;
        margin: 0.5rem 0;
        font-size: 1rem;
    }
`;
document.head.appendChild(videoModalStyle);


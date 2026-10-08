// ===== GLOBAL VARIABLES =====
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const header = document.querySelector('.header');

// ===== INITIALIZE AOS ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Load featured paintings
    loadFeaturedPaintings();
    
    // Update footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize header scroll effect
    initHeaderScroll();
});

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== LOAD FEATURED PAINTINGS =====
function loadFeaturedPaintings() {
    const featuredGrid = document.querySelector('.featured-grid');
    if (!featuredGrid) return;
    
    // Sample paintings data (in a real app, this would come from a database)
    const paintings = [
        {
            id: 1,
            title: "Abstract Ocean Sunset",
            image: "images/painting1.jpg",
            price: 450,
            category: "Abstract",
            size: "24x36 inches"
        },
        {
            id: 2,
            title: "Mountain Morning Mist",
            image: "images/painting2.jpg",
            price: 380,
            category: "Landscape",
            size: "20x24 inches"
        },
        {
            id: 3,
            title: "City Lights at Night",
            image: "images/painting3.jpg",
            price: 520,
            category: "Urban",
            size: "30x40 inches"
        },
        {
            id: 4,
            title: "Wildflower Meadow",
            image: "images/painting4.jpg",
            price: 320,
            category: "Botanical",
            size: "18x24 inches"
        }
    ];
    
    // Create HTML for each painting
    featuredGrid.innerHTML = paintings.map(painting => `
        <div class="featured-item" data-aos="fade-up">
            <div class="featured-image">
                <img src="${painting.image}" alt="${painting.title}" loading="lazy">
            </div>
            <div class="featured-content">
                <h3 class="featured-title">${painting.title}</h3>
                <div class="featured-price">$${painting.price.toLocaleString()}</div>
                <div class="featured-actions">
                    <span class="featured-category">${painting.category} • ${painting.size}</span>
                    <a href="shop.html?id=${painting.id}" class="featured-btn">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== FORM SUBMISSION HANDLING =====
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    event.target.reset();
    
    return false;
}

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PARTICLE EFFECT (OPTIONAL) =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(20px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles if on home page
if (document.getElementById('particles')) {
    createParticles();
}

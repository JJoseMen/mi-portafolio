// ========== NAVEGACIÓN ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle menú móvil
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== NAVEGACIÓN ACTIVA AL HACER SCROLL ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========== EFECTO TYPING ==========
const typingElement = document.getElementById('typing');
const words = ['Full Stack', 'Frontend', 'Backend', 'React', 'Laravel', 'Node.js'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

if (typingElement) {
    typeEffect();
}

// ========== ANIMACIÓN DE BARRAS DE HABILIDADES ==========
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.getElementById('habilidades');

const animateSkills = () => {
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.clientHeight;
    
    if (window.scrollY >= sectionTop - window.innerHeight + 100) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
};

window.addEventListener('scroll', animateSkills);

// ========== TABS DE HABILIDADES ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const skillsGrids = document.querySelectorAll('.skills-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos
        tabBtns.forEach(b => b.classList.remove('active'));
        skillsGrids.forEach(g => g.classList.remove('active'));
        
        // Agregar active al clickeado
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ========== FILTRO DE PROYECTOS ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const proyectoCards = document.querySelectorAll('.proyecto-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        proyectoCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ========== CONTADORES ANIMADOS ==========
const statNumbers = document.querySelectorAll('.stat-item .number');
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const animateStats = () => {
    const sectionTop = statsSection.offsetTop;
    
    if (window.scrollY >= sectionTop - window.innerHeight + 100 && !statsAnimated) {
        statsAnimated = true;
        
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    num.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    num.textContent = target + (target === 100 ? '%' : '+');
                }
            };
            
            updateNumber();
        });
    }
};

window.addEventListener('scroll', animateStats);

// ========== ANIMACIÓN SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.proyecto-card, .skill-item, .contacto-item, .stat-item');

const revealObserver = new IntersectionObserver((entries) => {
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

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ========== FORMULARIO DE CONTACTO ==========
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Cambiar estado del botón
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            formStatus.textContent = 'Hubo un error al enviar. Por favor, intenta de nuevo o contáctame por email.';
            formStatus.className = 'form-status error';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

// ========== BOTÓN VOLVER ARRIBA ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== DESCARGA DE CV ==========
const downloadCvBtn = document.getElementById('downloadCv');

if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
        // Verificar si el archivo existe
        fetch('assets/cv-juan-mendoza.pdf')
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    alert('El CV aún no está disponible. Por favor, contáctame por email.');
                }
            })
            .catch(() => {
                e.preventDefault();
                alert('El CV aún no está disponible. Por favor, contáctame por email.');
            });
    });
}

// ========== SMOOTH SCROLL PARA LINKS INTERNOS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== PARALLAX EFFECT EN HERO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase para animaciones iniciales
    document.body.classList.add('loaded');
    
    console.log('🚀 Portafolio de Juan José Mendoza cargado correctamente');
    console.log('📧 Contacto: juanjosemendoza342@gmail.com');
});
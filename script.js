// ========== PAGE LOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('is-loading');
  }, 800);
});

// ========== SMOOTH REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Parallax for glow orbs
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  
  if (orb1) {
    orb1.style.transform = `translate(${scrolled * 0.3}px, ${scrolled * 0.2}px)`;
  }
  
  if (orb2) {
    orb2.style.transform = `translate(${-scrolled * 0.2}px, ${-scrolled * 0.3}px)`;
  }
  
  // Parallax for hero media
  const heroMedia = document.querySelector('.hero-media img');
  if (heroMedia) {
    heroMedia.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// ========== MOUSE MOVE EFFECT ON CARDS ==========
const cards = document.querySelectorAll('.card, .tile');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ========== ANIMATED COUNTER FOR METRICS ==========
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
};

// Запускаємо лічильники коли metrics входять в viewport
const metrics = document.querySelectorAll('.metric b');
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      
      const text = entry.target.textContent;
      const number = parseInt(text);
      
      if (!isNaN(number)) {
        animateCounter(entry.target, number, 1500);
      }
    }
  });
}, { threshold: 0.5 });

metrics.forEach(metric => {
  metricsObserver.observe(metric);
});

// ========== DYNAMIC CURSOR EFFECT ==========
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Додаємо стилі для курсора
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent-main);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, opacity 0.15s ease;
    z-index: 10000;
    opacity: 0;
  }
  
  .custom-cursor.hover {
    transform: translate(-50%, -50%) scale(1.5);
    background: var(--accent-soft);
  }
  
  @media (max-width: 900px) {
    .custom-cursor {
      display: none;
    }
  }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

// Змінюємо курсор на інтерактивних елементах
const interactiveElements = document.querySelectorAll('a, button, .btn, .tile, .card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#top' || href === '#') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========== NAVBAR BACKGROUND ON SCROLL ==========
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(5,7,12,.95)';
    header.style.boxShadow = '0 8px 32px rgba(0,0,0,.5)';
  } else {
    header.style.background = 'rgba(5,7,12,.85)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,.3)';
  }
  
  lastScroll = currentScroll;
});

// ========== TILE STAGGER ANIMATION ==========
const tiles = document.querySelectorAll('.tile');
tiles.forEach((tile, index) => {
  tile.style.animationDelay = `${index * 0.1}s`;
});

// ========== TABLE ROW HIGHLIGHT ==========
const tableRows = document.querySelectorAll('.table tr');
tableRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.background = 'rgba(255,255,255,.06)';
  });
  
  row.addEventListener('mouseleave', () => {
    row.style.background = '';
  });
});

// ========== PARTICLE EFFECT ON HERO ==========
const createParticles = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  `;
  
  hero.style.position = 'relative';
  hero.insertBefore(particlesContainer, hero.firstChild);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: var(--accent-main);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.1};
      animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
  
  const particleAnimation = document.createElement('style');
  particleAnimation.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.5;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        transform: translate(${Math.random() * 200 - 100}px, -100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleAnimation);
};

// Запускаємо частинки після завантаження
setTimeout(createParticles, 1000);

// ========== BUTTON RIPPLE EFFECT ==========
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ========== TEXT TYPING EFFECT ==========
const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// ========== BRAND ANIMATION ==========
const brand = document.querySelector('.brand span');
if (brand) {
  const originalText = brand.textContent;
  brand.addEventListener('mouseenter', () => {
    brand.style.letterSpacing = '2px';
  });
  
  brand.addEventListener('mouseleave', () => {
    brand.style.letterSpacing = '0px';
  });
}

// ========== IMAGE LAZY LOADING WITH BLUR EFFECT ==========
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.style.filter = 'blur(10px)';
  img.style.transition = 'filter 0.5s ease';
  
  img.addEventListener('load', () => {
    img.style.filter = 'blur(0)';
  });
  
  if (img.complete) {
    img.style.filter = 'blur(0)';
  }
});

// ========== RANDOM FLOATING ELEMENTS ==========
const addFloatingAnimation = () => {
  const floatingElements = document.querySelectorAll('.pill, .metric');
  
  floatingElements.forEach((el, index) => {
    el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    el.style.animationDelay = `${index * 0.2}s`;
  });
  
  const floatKeyframes = document.createElement('style');
  floatKeyframes.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(floatKeyframes);
};

addFloatingAnimation();

// ========== PERFORMANCE OPTIMIZATION ==========
let ticking = false;

const requestTick = (callback) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
};

// ========== CONSOLE MESSAGE ==========
console.log('%c🚀 PresentationLab Enhanced!', 
  'color: #6fd1c4; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%c✨ Improved animations and interactions loaded successfully!', 
  'color: #8b8b8b; font-size: 14px;');

// ========== PREVENT FOUC (Flash of Unstyled Content) ==========
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.visibility = 'visible';
});
/* ============================================
   АНІМАЦІЯ ЗАВАНТАЖЕННЯ - JAVASCRIPT
   Вставте в КІНЕЦЬ вашого script.js
   ============================================ */

// Анімація завантаження - 2 секунди
document.addEventListener('DOMContentLoaded', function() {
  
  // Встановлюємо клас сторінки для кольору loader
  const fileName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.body.classList.add('page-' + fileName);
  
  // Знаходимо loader
  const loader = document.querySelector('.page-loader');
  
  if (loader) {
    // Ховаємо loader через 2 секунди
    setTimeout(function() {
      loader.classList.add('hidden');
      
      // Видаляємо з DOM після анімації
      setTimeout(function() {
        loader.remove();
      }, 500);
      
    }, 2000); // 2 секунди завантаження
  }
  
});

// Опціонально: показати loader при переході між сторінками
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href$=".html"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Показуємо loader тільки для внутрішніх посилань
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
          <div class="loader-content">
            <div class="loader-spinner">
              <div class="loader-core">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div class="loader-text">Завантаження...</div>
            <div class="loader-progress">
              <div class="loader-progress-bar"></div>
            </div>
          </div>
        `;
        document.body.appendChild(loader);
      }
    });
  });
});

console.log('⏳ Анімація завантаження активована - 2 секунди');


// ========== BURGER MENU ==========
(function() {
  var burger = document.querySelector('.burger-icon');
  var mobileNav = document.querySelector('.mobile-nav');
  var overlay = document.querySelector('.overlay');

  if (!burger || !mobileNav) return;

  function openMenu() {
    burger.classList.add('active');
    mobileNav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function() {
    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
})();

// ========== LOGO BACKGROUND ==========
(function() {
  // Визначаємо яку сторінку відкрито
  var page = window.location.pathname.split('/').pop() || 'index.html';
  
  var bgClass = 'bg-index'; // за замовчуванням
  if (page.indexOf('power-point') !== -1) bgClass = 'bg-pp';
  else if (page.indexOf('google-slides') !== -1) bgClass = 'bg-gs';
  else if (page.indexOf('canva') !== -1) bgClass = 'bg-canva';
  else if (page.indexOf('prezi') !== -1) bgClass = 'bg-prezi';

  // Створюємо div і вставляємо ПЕРЕД усім контентом
  var div = document.createElement('div');
  div.className = 'logo-bg ' + bgClass;
  document.body.insertBefore(div, document.body.firstChild);
})();

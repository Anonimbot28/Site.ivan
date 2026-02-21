/* animated-bg.js — Animated software logo background */
(function() {
  // SVG logos for presentation software
  const LOGOS = {
    powerpoint: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#D24726" opacity="0.9"/>
        <text x="24" y="32" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="22" fill="white">P</text>
      </svg>`,
      color: '#D24726'
    },
    googleslides: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#F9AB00" opacity="0.9"/>
        <rect x="11" y="13" width="26" height="22" rx="2" fill="white" opacity="0.9"/>
        <rect x="14" y="16" width="20" height="2" rx="1" fill="#F9AB00"/>
        <rect x="14" y="20" width="14" height="2" rx="1" fill="#ccc"/>
        <rect x="14" y="24" width="16" height="2" rx="1" fill="#ccc"/>
        <rect x="14" y="28" width="10" height="2" rx="1" fill="#ccc"/>
      </svg>`,
      color: '#F9AB00'
    },
    canva: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="24" fill="#7D2AE8" opacity="0.9"/>
        <text x="24" y="32" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="22" fill="white">C</text>
      </svg>`,
      color: '#7D2AE8'
    },
    prezi: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#3CCFCF" opacity="0.9"/>
        <circle cx="24" cy="24" r="10" fill="none" stroke="white" stroke-width="3"/>
        <circle cx="24" cy="24" r="4" fill="white"/>
      </svg>`,
      color: '#3CCFCF'
    },
    figma: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#0ACF83" opacity="0.9"/>
        <text x="24" y="32" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="20" fill="white">F</text>
      </svg>`,
      color: '#0ACF83'
    },
    keynote: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#1E6BF1" opacity="0.9"/>
        <text x="24" y="32" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="20" fill="white">K</text>
      </svg>`,
      color: '#1E6BF1'
    }
  };

  // Determine which page we're on and set accent logos
  function getPageLogos() {
    const path = window.location.pathname;
    if (path.includes('power-point')) {
      return [LOGOS.powerpoint, LOGOS.powerpoint, LOGOS.powerpoint,
              LOGOS.googleslides, LOGOS.canva, LOGOS.prezi, LOGOS.keynote];
    } else if (path.includes('google-slides')) {
      return [LOGOS.googleslides, LOGOS.googleslides, LOGOS.googleslides,
              LOGOS.powerpoint, LOGOS.canva, LOGOS.prezi, LOGOS.figma];
    } else if (path.includes('canva')) {
      return [LOGOS.canva, LOGOS.canva, LOGOS.canva,
              LOGOS.powerpoint, LOGOS.googleslides, LOGOS.prezi, LOGOS.figma];
    } else if (path.includes('prezi')) {
      return [LOGOS.prezi, LOGOS.prezi, LOGOS.prezi,
              LOGOS.powerpoint, LOGOS.canva, LOGOS.googleslides, LOGOS.keynote];
    }
    // Default — all logos
    return Object.values(LOGOS);
  }

  function createBackground() {
    const container = document.createElement('div');
    container.className = 'logo-bg-canvas';
    document.body.insertBefore(container, document.body.firstChild);

    const logos = getPageLogos();
    const COUNT = 22;

    for (let i = 0; i < COUNT; i++) {
      const logo = logos[Math.floor(Math.random() * logos.length)];
      const el = document.createElement('div');
      el.className = 'logo-bg-item';

      const size = 28 + Math.random() * 42; // 28–70px
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 14 + Math.random() * 22; // 14–36s
      const delay = -(Math.random() * duration); // pre-offset
      const driftY = (Math.random() > 0.5 ? -1 : 1) * (60 + Math.random() * 120);
      const rotStart = Math.random() * 40 - 20;
      const rotEnd = rotStart + (Math.random() * 60 - 30);
      const maxOpacity = 0.05 + Math.random() * 0.10; // 5–15% opacity

      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        --rot-start: ${rotStart}deg;
        --rot-end: ${rotEnd}deg;
        --drift-y: ${driftY}px;
        --max-opacity: ${maxOpacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        color: ${logo.color};
      `;

      el.innerHTML = logo.svg;
      container.appendChild(el);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBackground);
  } else {
    createBackground();
  }
})();

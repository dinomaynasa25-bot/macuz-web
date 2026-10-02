/* ============================================
   MACUZ IMPORTACIONES · Scripts
   ============================================ */

/* ============ LOADER ============ */
(function initLoader() {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  const percent = document.getElementById('loaderPercent');
  let value = 0;

  const interval = setInterval(() => {
    value += Math.random() * 15;
    if (value >= 100) {
      value = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    }
    progress.style.width = value + '%';
    percent.textContent = Math.floor(value);
  }, 150);

  document.body.style.overflow = 'hidden';
})();

/* ============ CURSOR ============ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || window.innerWidth < 900) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .category-card, .product-card, .color-item, input, select, textarea, .ba-slider')) {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .category-card, .product-card, .color-item, input, select, textarea, .ba-slider')) {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    }
  });
})();

/* ============ NAVBAR ============ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
})();

/* ============ HERO SWIPER ============ */
(function initHeroSwiper() {
  new Swiper('.heroSwiper', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1200,
    loop: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { el: '.hero-pagination', clickable: true },
    navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
    on: {
      slideChangeTransitionStart() {
        const activeSlide = this.slides[this.activeIndex];
        const elements = activeSlide.querySelectorAll('.slide-tag, .slide-title, .slide-desc, .slide-buttons');
        elements.forEach(el => {
          el.style.animation = 'none';
          void el.offsetWidth;
          el.style.animation = '';
        });
      }
    }
  });
})();

/* ============ FEATURED SWIPER ============ */
(function initFeaturedSwiper() {
  new Swiper('.featuredSwiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    pagination: { el: '.featured-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 2.2, spaceBetween: 24 },
      900: { slidesPerView: 3, spaceBetween: 24 },
      1200: { slidesPerView: 4, spaceBetween: 24 },
    }
  });
})();

/* ============ TESTIMONIALS SWIPER ============ */
(function initTestimonialsSwiper() {
  new Swiper('.testimonialsSwiper', {
    slidesPerView: 1.1,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 6000, disableOnInteraction: false },
    pagination: { el: '.testimonials-pagination', clickable: true },
    breakpoints: {
      700: { slidesPerView: 2, spaceBetween: 24 },
      1100: { slidesPerView: 3, spaceBetween: 24 },
    }
  });
})();

/* ============ COLORES MARQUEE ============ */
(function initColorsMarquee() {
  const colors = [
    { name: 'Trupan', hex: '#C89B6B' },
    { name: 'Plomo', hex: '#4A4A4A' },
    { name: 'Dorado', hex: '#D4A017' },
    { name: 'Blanco', hex: '#F5F5F5' },
    { name: 'Negro', hex: '#0A0A0A' },
    { name: 'Nogal', hex: '#5C3A21' },
    { name: 'Caoba', hex: '#8B4513' },
    { name: 'Grafito', hex: '#2A2A2A' }
  ];

  const track = document.getElementById('marqueeColors');
  if (!track) return;

  const buildItem = (c) => `
    <div class="color-item">
      <div class="swatch" style="background:${c.hex}"></div>
      <span>${c.name}</span>
    </div>
  `;

  track.innerHTML = colors.map(buildItem).join('') + colors.map(buildItem).join('');
})();

/* ============ CALCULADORA ============ */
(function initCalculator() {
  const btn = document.getElementById('calcBtn');
  const result = document.getElementById('calcResult');
  const number = document.getElementById('calcNumber');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const ancho = parseFloat(document.getElementById('calcAncho').value) || 0;
    const alto = parseFloat(document.getElementById('calcAlto').value) || 0;
    const panelAncho = parseFloat(document.getElementById('calcPanel').value) || 0.16;

    if (ancho <= 0 || alto <= 0) {
      alert('Ingresá medidas válidas');
      return;
    }

    const paneles = Math.ceil(ancho / panelAncho);
    const panelesConMargen = Math.ceil(paneles * 1.1);

    let current = 0;
    const step = panelesConMargen / 30;
    const interval = setInterval(() => {
      current += step;
      if (current >= panelesConMargen) {
        current = panelesConMargen;
        clearInterval(interval);
      }
      number.textContent = Math.floor(current);
    }, 30);

    result.classList.add('show');

    const link = result.querySelector('a');
    const text = `Hola, necesito cotizar ${panelesConMargen} paneles para una pared de ${ancho}m x ${alto}m.`;
    link.href = `https://wa.me/59176715659?text=${encodeURIComponent(text)}`;
  });
})();

/* ============ ANTES / DESPUÉS ============ */
(function initBeforeAfter() {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const afterWrap = slider.querySelector('.ba-after-wrap');
    const handle = slider.querySelector('.ba-handle');
    const afterImg = slider.querySelector('.ba-after');
    let isDragging = false;

    function resizeAfterImg() {
      afterImg.style.width = slider.offsetWidth + 'px';
    }
    resizeAfterImg();
    window.addEventListener('resize', resizeAfterImg);

    function move(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      afterWrap.style.width = percent + '%';
      handle.style.left = percent + '%';
    }

    slider.addEventListener('mousedown', (e) => { isDragging = true; move(e.clientX); });
    slider.addEventListener('touchstart', (e) => { isDragging = true; move(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (isDragging) move(e.clientX); });
    window.addEventListener('touchmove', (e) => { if (isDragging) move(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
  });
})();

/* ============ SCROLL REVEAL ============ */
(function initReveal() {
  if (typeof gsap === 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    });
  });

  const grids = [
    { sel: '.category-grid .category-card', stagger: 0.15 },
    { sel: '.process-grid .process-step', stagger: 0.12 },
  ];

  grids.forEach(({ sel, stagger }) => {
    const items = document.querySelectorAll(sel);
    if (!items.length) return;
    gsap.from(items, {
      scrollTrigger: { trigger: items[0].parentElement, start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.9, stagger, ease: 'power3.out',
    });
  });
})();

/* ============ FORMULARIO ============ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.classList.add('loading');

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 6000);
      } else {
        alert('Hubo un error. Intenta por WhatsApp por favor.');
      }
    } catch (error) {
      alert('Error de conexión. Escríbenos por WhatsApp.');
    } finally {
      btn.classList.remove('loading');
    }
  });
})();

/* ============ ESTADO ABIERTO/CERRADO ============ */
(function initStatus() {
  const badge = document.getElementById('statusBadge');
  const text = document.getElementById('statusText');
  if (!badge) return;

  function update() {
    const now = new Date();
    const bolivia = new Date(now.toLocaleString('en-US', { timeZone: 'America/La_Paz' }));
    const day = bolivia.getDay();
    const hour = bolivia.getHours();

    let open = false;
    if (day >= 1 && day <= 5 && hour >= 8 && hour < 20) open = true;
    if (day === 6 && hour >= 9 && hour < 18) open = true;

    if (open) {
      badge.classList.remove('closed');
      text.textContent = 'Estamos en línea';
    } else {
      badge.classList.add('closed');
      text.textContent = 'Fuera de horario — Respondemos pronto';
    }
  }
  update();
  setInterval(update, 60000);
})();

/* ============ SMOOTH SCROLL ============ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
})();

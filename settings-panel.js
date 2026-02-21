(function () {

  /* ── HTML панелі ── */
  var panelHTML = `
    <button id="settings-toggle" title="Налаштування">⚙</button>

    <div id="settings-panel">

      <!-- Заголовок -->
      <div class="sp-header">
        <span class="sp-header-icon">⚙️</span>
        <div>
          <div class="sp-header-text">Налаштування</div>
          <div class="sp-header-sub">Персоналізуй сайт під себе</div>
        </div>
      </div>

      <!-- ВИГЛЯД -->
      <div class="sp-section">
        <div class="sp-section-title">Вигляд</div>

        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">🌙</span>Тема</span>
          <button class="sp-btn" id="sp-theme-btn">☀️ Світла</button>
        </div>

        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">🔆</span>Контраст</span>
          <button class="sp-btn" id="sp-contrast-btn">Увімк.</button>
        </div>

        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">🖼</span>Фон логотипів</span>
          <div class="sp-slider-wrap">
            <input class="sp-slider" type="range" min="0" max="100" value="100" id="sp-bg-slider">
            <span class="sp-slider-val" id="sp-bg-val">100%</span>
          </div>
        </div>
      </div>

      <!-- ТЕКСТ -->
      <div class="sp-section">
        <div class="sp-section-title">Текст</div>

        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">📝</span>Розмір</span>
          <div class="sp-size-controls">
            <button id="sp-size-down" title="Зменшити">−</button>
            <span id="sp-size-val">100%</span>
            <button id="sp-size-up" title="Збільшити">+</button>
          </div>
        </div>

        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">📖</span>Режим читання</span>
          <button class="sp-btn" id="sp-read-btn">Увімк.</button>
        </div>
      </div>

      <!-- РЕЖИМИ -->
      <div class="sp-section">
        <div class="sp-section-title">Режими</div>
        <div class="sp-compact-row">
          <button class="sp-compact-btn" id="sp-anim-btn">
            <span class="cb-icon">✨</span>
            <span class="cb-label">Анімації</span>
          </button>
          <button class="sp-compact-btn" id="sp-compact-btn">
            <span class="cb-icon">⬜</span>
            <span class="cb-label">Компактно</span>
          </button>
          <button class="sp-compact-btn" id="sp-focus-btn">
            <span class="cb-icon">🎯</span>
            <span class="cb-label">Фокус</span>
          </button>
          <button class="sp-compact-btn" id="sp-cursor-btn">
            <span class="cb-icon">🖱</span>
            <span class="cb-label">Курсор</span>
          </button>
        </div>
      </div>

      <!-- ШВИДКІСТЬ АНІМАЦІЙ -->
      <div class="sp-section">
        <div class="sp-section-title">Швидкість анімацій</div>
        <div class="sp-speed-btns">
          <button class="sp-speed-btn" data-speed="0.5">0.5×</button>
          <button class="sp-speed-btn active" data-speed="1">1×</button>
          <button class="sp-speed-btn" data-speed="1.5">1.5×</button>
          <button class="sp-speed-btn" data-speed="2">2×</button>
        </div>
      </div>

      <!-- ВПУ ПОСИЛАННЯ -->
      <a class="sp-vpu-link" href="https://vpu1.inf.ua/" target="_blank" rel="noopener">
        <div class="sp-vpu-icon">🎓</div>
        <div class="sp-vpu-text">
          ВПУ №1 міста Рівного
          <div class="sp-vpu-sub">vpu1.inf.ua — офіційний сайт</div>
        </div>
        <span style="margin-left:auto;color:rgba(255,255,255,0.3);font-size:12px;">↗</span>
      </a>

      <!-- НИЖНЯ ЗОНА -->
      <div class="sp-footer-zone">
        <button id="sp-reset-btn">↺ Скинути всі налаштування</button>
        <button id="sp-exit-btn">→ Вийти з сайту</button>
      </div>

    </div>
  `;

  /* Вставляємо в body */
  var wrapper = document.createElement('div');
  wrapper.innerHTML = panelHTML;
  document.body.appendChild(wrapper);

  /* ── Елементи ── */
  var toggle      = document.getElementById('settings-toggle');
  var panel       = document.getElementById('settings-panel');
  var themeBtn    = document.getElementById('sp-theme-btn');
  var contrastBtn = document.getElementById('sp-contrast-btn');
  var readBtn     = document.getElementById('sp-read-btn');
  var sizeUp      = document.getElementById('sp-size-up');
  var sizeDown    = document.getElementById('sp-size-down');
  var sizeVal     = document.getElementById('sp-size-val');
  var bgSlider    = document.getElementById('sp-bg-slider');
  var bgVal       = document.getElementById('sp-bg-val');
  var animBtn     = document.getElementById('sp-anim-btn');
  var compactBtn  = document.getElementById('sp-compact-btn');
  var focusBtn    = document.getElementById('sp-focus-btn');
  var cursorBtn   = document.getElementById('sp-cursor-btn');
  var resetBtn    = document.getElementById('sp-reset-btn');
  var exitBtn     = document.getElementById('sp-exit-btn');
  var speedBtns   = document.querySelectorAll('.sp-speed-btn');

  /* ── Стан із localStorage ── */
  var state = {
    fontSize:   parseInt(localStorage.getItem('sp_fontSize')   || '100', 10),
    lightMode:  localStorage.getItem('sp_light')     === 'true',
    readMode:   localStorage.getItem('sp_reading')   === 'true',
    contrast:   localStorage.getItem('sp_contrast')  === 'true',
    noAnim:     localStorage.getItem('sp_noAnim')    === 'true',
    compact:    localStorage.getItem('sp_compact')   === 'true',
    focus:      localStorage.getItem('sp_focus')     === 'true',
    cursor:     localStorage.getItem('sp_cursor')    !== 'false', // default ON
    bgOpacity:  parseInt(localStorage.getItem('sp_bgOpacity') || '100', 10),
    speed:      parseFloat(localStorage.getItem('sp_speed')   || '1'),
  };

  /* Застосовуємо збережений стан */
  applyAll();

  /* ── Відкриття / закриття ── */
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = panel.classList.toggle('sp-open');
    toggle.classList.toggle('sp-open-btn', isOpen);
  });
  document.addEventListener('click', function (e) {
    if (!panel.contains(e.target) && e.target !== toggle) {
      panel.classList.remove('sp-open');
      toggle.classList.remove('sp-open-btn');
    }
  });

  /* ── Тема ── */
  themeBtn.addEventListener('click', function () {
    state.lightMode = !state.lightMode;
    localStorage.setItem('sp_light', state.lightMode);
    applyTheme();
  });

  /* ── Контраст ── */
  contrastBtn.addEventListener('click', function () {
    state.contrast = !state.contrast;
    localStorage.setItem('sp_contrast', state.contrast);
    applyContrast();
  });

  /* ── Режим читання ── */
  readBtn.addEventListener('click', function () {
    state.readMode = !state.readMode;
    localStorage.setItem('sp_reading', state.readMode);
    applyReading();
  });

  /* ── Розмір тексту ── */
  sizeUp.addEventListener('click', function () {
    if (state.fontSize < 150) { state.fontSize += 10; save('sp_fontSize', state.fontSize); applyFontSize(); }
  });
  sizeDown.addEventListener('click', function () {
    if (state.fontSize > 70) { state.fontSize -= 10; save('sp_fontSize', state.fontSize); applyFontSize(); }
  });

  /* ── Прозорість фону ── */
  bgSlider.value = state.bgOpacity;
  bgSlider.addEventListener('input', function () {
    state.bgOpacity = parseInt(this.value, 10);
    localStorage.setItem('sp_bgOpacity', state.bgOpacity);
    applyBgOpacity();
  });

  /* ── Анімації ── */
  animBtn.addEventListener('click', function () {
    state.noAnim = !state.noAnim;
    localStorage.setItem('sp_noAnim', state.noAnim);
    applyAnimations();
  });

  /* ── Компактний режим ── */
  compactBtn.addEventListener('click', function () {
    state.compact = !state.compact;
    localStorage.setItem('sp_compact', state.compact);
    applyCompact();
  });

  /* ── Режим фокусу ── */
  focusBtn.addEventListener('click', function () {
    state.focus = !state.focus;
    localStorage.setItem('sp_focus', state.focus);
    applyFocus();
  });

  /* ── Кастомний курсор ── */
  cursorBtn.addEventListener('click', function () {
    state.cursor = !state.cursor;
    localStorage.setItem('sp_cursor', state.cursor);
    applyCursor();
  });

  /* ── Швидкість анімацій ── */
  speedBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.speed = parseFloat(this.dataset.speed);
      localStorage.setItem('sp_speed', state.speed);
      applySpeed();
      speedBtns.forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  /* ── Скидання ── */
  resetBtn.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
  });

  /* ── Вихід ── */
  exitBtn.addEventListener('click', function () {
    if (confirm('Справді бажаєте вийти?')) {
      window.location.href = 'about:blank';
    }
  });

  /* ────────────────────────────────
     ФУНКЦІЇ ЗАСТОСУВАННЯ
  ──────────────────────────────── */

  function applyAll() {
    applyTheme();
    applyContrast();
    applyReading();
    applyFontSize();
    applyBgOpacity();
    applyAnimations();
    applyCompact();
    applyFocus();
    applyCursor();
    applySpeed();
    syncSpeedBtns();
  }

  function applyTheme() {
    document.body.classList.toggle('light-mode', state.lightMode);
    themeBtn.innerHTML = state.lightMode ? '🌙 Темна' : '☀️ Світла';
    themeBtn.classList.toggle('active', state.lightMode);
  }

  function applyContrast() {
    document.body.classList.toggle('high-contrast', state.contrast);
    contrastBtn.innerHTML = state.contrast ? 'Вимк.' : 'Увімк.';
    contrastBtn.classList.toggle('active', state.contrast);
  }

  function applyReading() {
    document.body.classList.toggle('reading-mode', state.readMode);
    readBtn.innerHTML = state.readMode ? 'Вимк.' : 'Увімк.';
    readBtn.classList.toggle('active', state.readMode);
  }

  function applyFontSize() {
    document.documentElement.style.fontSize = state.fontSize + '%';
    sizeVal.textContent = state.fontSize + '%';
  }

  function applyBgOpacity() {
    var el = document.querySelector('.logo-bg');
    if (el) el.style.opacity = state.bgOpacity / 100;
    bgVal.textContent = state.bgOpacity + '%';
    bgSlider.value = state.bgOpacity;
  }

  function applyAnimations() {
    document.body.classList.toggle('no-animations', state.noAnim);
    animBtn.classList.toggle('active', !state.noAnim);
    animBtn.querySelector('.cb-label').textContent = state.noAnim ? 'Вимкн.' : 'Анімації';
  }

  function applyCompact() {
    document.body.classList.toggle('compact-mode', state.compact);
    compactBtn.classList.toggle('active', state.compact);
  }

  function applyFocus() {
    document.body.classList.toggle('focus-mode', state.focus);
    focusBtn.classList.toggle('active', state.focus);
  }

  function applyCursor() {
    // Кастомний курсор з script.js — просто показуємо/ховаємо
    var cur = document.querySelector('.custom-cursor');
    if (cur) cur.style.display = state.cursor ? 'block' : 'none';
    cursorBtn.classList.toggle('active', state.cursor);
  }

  function applySpeed() {
    // CSS custom property для швидкості анімацій
    document.documentElement.style.setProperty('--anim-speed', state.speed);
    // Застосовуємо через CSS var
    var styleId = 'sp-speed-style';
    var existing = document.getElementById(styleId);
    if (existing) existing.remove();
    var style = document.createElement('style');
    style.id = styleId;
    var dur = (1 / state.speed).toFixed(2);
    style.textContent = state.speed !== 1
      ? `*, *::before, *::after { animation-duration: calc(var(--sp-dur, 1s) / ${state.speed}) !important; transition-duration: calc(0.3s / ${state.speed}) !important; }`
      : '';
    document.head.appendChild(style);
  }

  function syncSpeedBtns() {
    speedBtns.forEach(function(b){
      b.classList.toggle('active', parseFloat(b.dataset.speed) === state.speed);
    });
  }

  function save(key, val) {
    localStorage.setItem(key, val);
  }

})();

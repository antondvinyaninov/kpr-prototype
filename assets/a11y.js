(function () {
  var KEY = 'kp-a11y';
  var root = document.documentElement;

  var defaults = { theme: 'normal', fs: 0, noimg: false, noanim: false };
  var state = defaults;

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    state = Object.assign({}, defaults, saved);
  } catch (e) { /* игнорируем битое хранилище */ }

  function apply() {
    root.classList.toggle('a11y-bw', state.theme === 'bw');
    root.classList.toggle('a11y-wb', state.theme === 'wb');
    root.classList.toggle('a11y-by', state.theme === 'by');
    root.classList.toggle('a11y-fs-1', state.fs === 1);
    root.classList.toggle('a11y-fs-2', state.fs === 2);
    root.classList.toggle('a11y-noimg', !!state.noimg);
    root.classList.toggle('a11y-noanim', !!state.noanim);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* приватный режим */ }
  }

  function update() {
    state.fs = Number(state.fs) || 0;
    apply();
    save();
    document.querySelectorAll('[data-a11y-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.a11yTheme === state.theme));
    });
    document.querySelectorAll('[data-a11y-fs]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.a11yFs) === state.fs));
    });
    var img = document.getElementById('a11yNoimg');
    var anim = document.getElementById('a11yNoanim');
    if (img) img.checked = !!state.noimg;
    if (anim) anim.checked = !!state.noanim;
  }

  var eye = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';

  function build() {
    var host = document.querySelector('.nav-actions');
    if (!host || host.querySelector('.a11y-wrap')) return;

    var wrap = document.createElement('div');
    wrap.className = 'a11y-wrap';
    wrap.innerHTML =
      '<button type="button" class="a11y-btn" id="a11yToggle" aria-label="Версия для слабовидящих" aria-expanded="false" aria-controls="a11yPanel">' + eye + '</button>' +
      '<div class="a11y-panel" id="a11yPanel" hidden>' +
        '<h4>Настройки отображения</h4>' +
        '<div class="a11y-group"><span class="cap">Цветовая схема</span><div class="a11y-row">' +
          '<button type="button" class="a11y-opt" data-a11y-theme="normal" aria-pressed="true">Обычная</button>' +
          '<button type="button" class="a11y-opt" data-a11y-theme="bw" aria-pressed="false">Ч/Б</button>' +
          '<button type="button" class="a11y-opt" data-a11y-theme="wb" aria-pressed="false">Белый на чёрном</button>' +
          '<button type="button" class="a11y-opt" data-a11y-theme="by" aria-pressed="false">Жёлтый на чёрном</button>' +
        '</div></div>' +
        '<div class="a11y-group"><span class="cap">Размер текста</span><div class="a11y-row">' +
          '<button type="button" class="a11y-opt" data-a11y-fs="0" aria-pressed="true">100%</button>' +
          '<button type="button" class="a11y-opt" data-a11y-fs="1" aria-pressed="false">112%</button>' +
          '<button type="button" class="a11y-opt" data-a11y-fs="2" aria-pressed="false">125%</button>' +
        '</div></div>' +
        '<label class="a11y-check"><input type="checkbox" id="a11yNoimg"> Без изображений</label>' +
        '<label class="a11y-check"><input type="checkbox" id="a11yNoanim"> Без анимации</label>' +
        '<button type="button" class="a11y-reset" id="a11yReset">Обычная версия</button>' +
      '</div>';
    host.insertBefore(wrap, host.firstChild);

    var toggle = wrap.querySelector('#a11yToggle');
    var panel = wrap.querySelector('#a11yPanel');

    function close() {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      if (!panel.hidden) {
        var first = panel.querySelector('button');
        if (first) first.focus();
      }
    });

    panel.addEventListener('click', function (e) {
      var t = e.target.closest('[data-a11y-theme]');
      var f = e.target.closest('[data-a11y-fs]');
      if (t) { state.theme = t.dataset.a11yTheme; update(); }
      if (f) { state.fs = Number(f.dataset.a11yFs); update(); }
    });

    wrap.querySelector('#a11yNoimg').addEventListener('change', function (e) {
      state.noimg = e.target.checked; update();
    });
    wrap.querySelector('#a11yNoanim').addEventListener('change', function (e) {
      state.noanim = e.target.checked; update();
    });
    wrap.querySelector('#a11yReset').addEventListener('click', function () {
      state = Object.assign({}, defaults);
      update();
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { close(); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !wrap.contains(e.target)) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); update(); });
  } else {
    build(); update();
  }
})();

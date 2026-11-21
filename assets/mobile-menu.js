(function () {
  var burger = document.getElementById('burger');
  if (!burger) return;

  var groups = [
    { title: 'Разделы', items: [
      ['Новости', 'news.html'],
      ['Афиша', 'index.html#afisha'],
      ['Интересно', 'news.html'],
      ['Бизнес', 'rubric.html'],
      ['Персона', 'rubric.html'],
      ['История', 'rubric.html']
    ]},
    { title: 'Сервисы', items: [
      ['Справочник', 'spravochnik.html'],
      ['Каталог организаций', 'katalog.html'],
      ['Авторы', 'authors.html'],
      ['Свежий номер', 'index.html#afisha'],
      ['Обратная связь', '#']
    ]}
  ];

  var wrap = document.createElement('div');
  wrap.className = 'mmenu';
  wrap.id = 'mmenu';
  wrap.hidden = true;

  var panel = document.createElement('div');
  panel.className = 'mmenu-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Меню сайта');

  var head = document.createElement('div');
  head.className = 'mmenu-head';
  head.innerHTML = '<span class="mmenu-title">Меню</span>' +
    '<button class="mmenu-close" type="button" aria-label="Закрыть меню">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
    '</button>';
  panel.appendChild(head);

  groups.forEach(function (g) {
    var cap = document.createElement('div');
    cap.className = 'mmenu-grp';
    cap.textContent = g.title;
    panel.appendChild(cap);
    g.items.forEach(function (it) {
      var a = document.createElement('a');
      a.href = it[1];
      a.textContent = it[0];
      panel.appendChild(a);
    });
  });

  var cta = document.createElement('a');
  cta.className = 'mmenu-cta';
  cta.href = '#';
  cta.textContent = 'Войти';
  panel.appendChild(cta);

  var backdrop = document.createElement('div');
  backdrop.className = 'mmenu-backdrop';

  wrap.appendChild(backdrop);
  wrap.appendChild(panel);
  document.body.appendChild(wrap);

  function open() {
    wrap.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mmenu-open');
    var first = panel.querySelector('a, button');
    if (first) first.focus();
  }

  function close() {
    wrap.hidden = true;
    var nav = burger.closest('.nav, .hrow');
  if (nav && nav.firstElementChild !== burger) nav.insertBefore(burger, nav.firstElementChild);

  burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mmenu-open');
    burger.focus();
  }

  var nav = burger.closest('.nav, .hrow');
  if (nav && nav.firstElementChild !== burger) nav.insertBefore(burger, nav.firstElementChild);

  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'mmenu');
  burger.addEventListener('click', function () {
    if (wrap.hidden) open(); else close();
  });
  backdrop.addEventListener('click', close);
  panel.querySelector('.mmenu-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !wrap.hidden) close();
  });
  wrap.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a && a.getAttribute('href') !== '#') close();
  });
})();

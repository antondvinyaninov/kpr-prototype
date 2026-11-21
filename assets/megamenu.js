(function () {
  var roots = Array.prototype.slice.call(document.querySelectorAll('.mega'));
  if (!roots.length) return;

  var items = roots.map(function (root) {
    return {
      root: root,
      trigger: root.querySelector('.mega-trigger'),
      panel: root.querySelector('.mega-panel'),
      timer: null
    };
  }).filter(function (i) { return i.trigger && i.panel; });

  function open(item) {
    items.forEach(function (other) { if (other !== item) close(other); });
    if (item.timer) clearTimeout(item.timer);
    item.panel.hidden = false;
    item.trigger.setAttribute('aria-expanded', 'true');
  }

  function close(item) {
    if (item.timer) clearTimeout(item.timer);
    item.panel.hidden = true;
    item.trigger.setAttribute('aria-expanded', 'false');
  }

  function closeSoon(item) {
    if (item.timer) clearTimeout(item.timer);
    item.timer = setTimeout(function () { close(item); }, 140);
  }

  items.forEach(function (item) {
    item.trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (item.panel.hidden) open(item); else close(item);
    });
    item.root.addEventListener('mouseenter', function () { open(item); });
    item.root.addEventListener('mouseleave', function () { closeSoon(item); });
    item.panel.addEventListener('mouseenter', function () { open(item); });
    item.panel.addEventListener('mouseleave', function () { closeSoon(item); });
    item.root.addEventListener('focusin', function () { open(item); });
    item.root.addEventListener('focusout', function (e) {
      if (!item.root.contains(e.relatedTarget)) closeSoon(item);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    items.forEach(function (item) {
      if (!item.panel.hidden) { close(item); item.trigger.focus(); }
    });
  });

  document.addEventListener('click', function (e) {
    items.forEach(function (item) {
      if (!item.panel.hidden && !item.root.contains(e.target)) close(item);
    });
  });
})();

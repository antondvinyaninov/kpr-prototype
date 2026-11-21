(function () {
  var mega = document.getElementById('mega');
  if (!mega) return;
  var trigger = document.getElementById('megaTrigger');
  var panel = document.getElementById('megaPanel');
  if (!trigger || !panel) return;

  var timer = null;

  function open() {
    if (timer) clearTimeout(timer);
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function close() {
    if (timer) clearTimeout(timer);
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  function closeSoon() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(close, 140);
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (panel.hidden) open(); else close();
  });

  mega.addEventListener('mouseenter', open);
  mega.addEventListener('mouseleave', closeSoon);
  panel.addEventListener('mouseenter', open);
  panel.addEventListener('mouseleave', closeSoon);

  mega.addEventListener('focusin', open);
  mega.addEventListener('focusout', function (e) {
    if (!mega.contains(e.relatedTarget) && !panel.contains(e.relatedTarget)) closeSoon();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) {
      close();
      trigger.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !mega.contains(e.target)) close();
  });
})();

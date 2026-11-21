(function () {
  var mark = document.querySelector('.logo-mark');
  if (!mark) return;
  var fish = mark.querySelector('.fish');
  var parts = mark.querySelectorAll('.red');
  if (!fish || parts.length < 2) return;

  var kra = parts[0], noe = parts[1];
  var clicks = 0, resetTimer = null, hideTimer = null, active = false;

  function reset() {
    clicks = 0;
    if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
  }

  function restore() {
    kra.textContent = 'КРА';
    noe.style.display = '';
    mark.classList.remove('is-cyber');
    active = false;
  }

  fish.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (active) return;

    clicks += 1;
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(reset, 4000);

    if (clicks >= 5) {
      reset();
      active = true;
      kra.textContent = 'КИБЕР';
      noe.style.display = 'none';
      mark.classList.add('is-cyber');
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(restore, 6000);
    }
  });
})();

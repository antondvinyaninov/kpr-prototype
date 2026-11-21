(function () {
  var mark = document.querySelector('.logo-mark');
  if (!mark) return;
  var fish = mark.querySelector('.fish');
  var badge = mark.querySelector('.logo-cyber');
  if (!fish || !badge) return;

  var clicks = 0;
  var timer = null;

  function reset() {
    clicks = 0;
    if (timer) { clearTimeout(timer); timer = null; }
  }

  fish.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    clicks += 1;
    if (timer) clearTimeout(timer);
    timer = setTimeout(reset, 4000); // серия кликов живёт 4 секунды

    if (clicks >= 5) {
      mark.classList.add('is-cyber');
      reset();
      setTimeout(function () { mark.classList.remove('is-cyber'); }, 6000);
    }
  });
})();

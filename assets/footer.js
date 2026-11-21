(function () {
  var host = document.getElementById('site-footer');
  if (!host || host.dataset.loaded === '1') return;
  fetch('assets/footer.html?v=3')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      host.innerHTML = html;
      host.dataset.loaded = '1';
    })
    .catch(function () { /* без футера страница остаётся рабочей */ });
})();

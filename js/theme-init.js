(function () {
  var STORAGE_KEY = 'clineval-theme';
  var stored = localStorage.getItem(STORAGE_KEY);
  var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();

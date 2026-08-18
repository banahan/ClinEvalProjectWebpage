(function () {
  var STORAGE_KEY = 'clineval-theme';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function iconSrc(theme) {
    return theme === 'dark' ? 'assets/light.svg' : 'assets/dark.svg';
  }

  function toggleLabel(theme) {
    return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  function updateButton(btn, img, theme) {
    var label = toggleLabel(theme);
    btn.setAttribute('aria-label', label);
    btn.title = label;
    img.src = iconSrc(theme);
  }

  function mountThemeApp() {
    var root = document.getElementById('theme-app');
    if (!root || root.querySelector('.theme-toggle')) {
      return;
    }

    var theme = getTheme();
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';

    var img = document.createElement('img');
    img.alt = '';
    img.width = 24;
    img.height = 24;

    updateButton(btn, img, theme);
    btn.appendChild(img);

    btn.addEventListener('click', function () {
      theme = getTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
      updateButton(btn, img, theme);
    });

    root.appendChild(btn);
  }

  function mountLogoTooltips() {
    document.querySelectorAll('.partner-logo[title]').forEach(function (logo) {
      var chip = logo.closest('.logo-chip');
      if (!chip) {
        return;
      }

      chip.dataset.tooltip = logo.title;
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-label', logo.title);
      logo.removeAttribute('title');
    });
  }

  function initSiteUi() {
    mountThemeApp();
    mountLogoTooltips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteUi);
  } else {
    initSiteUi();
  }
})();

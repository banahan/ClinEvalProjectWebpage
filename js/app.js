(function () {
  var STORAGE_KEY = 'clineval-theme';

  var ThemeToggle = {
    data: function () {
      return {
        theme: document.documentElement.getAttribute('data-theme') || 'dark',
      };
    },
    computed: {
      iconSrc: function () {
        return this.theme === 'dark' ? 'assets/light.svg' : 'assets/dark.svg';
      },
      toggleLabel: function () {
        return this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      },
    },
    methods: {
      toggleTheme: function () {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem(STORAGE_KEY, this.theme);
      },
    },
    template:
      '<button type="button" class="theme-toggle" :aria-label="toggleLabel" :title="toggleLabel" @click="toggleTheme">' +
      '<img :src="iconSrc" alt="" width="24" height="24" />' +
      '</button>',
  };

  Vue.createApp(ThemeToggle).mount('#theme-app');
})();

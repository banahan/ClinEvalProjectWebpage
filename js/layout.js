(function () {
  function logoChip(options) {
    return (
      '<span class="' + options.chipClass + ' logo-chip">' +
        '<img class="' + options.logoClass + ' partner-logo" ' +
          'src="' + options.src + '" ' +
          'alt="' + options.alt + '" ' +
          'title="' + options.title + '">' +
      '</span>'
    );
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) {
        return;
      }

      this.dataset.rendered = 'true';
      this.classList.add('site-header');
      this.innerHTML =
        '<nav class="site-nav" aria-label="Main">' +
          '<div class="site-nav__links">' +
            '<a href="index.html">Home</a>' +
            '<a href="team.html">Team</a>' +
            '<a href="publications.html">Publications</a>' +
          '</div>' +
          '<div class="site-nav__partners site-nav__partners--right" aria-label="Partners">' +
            logoChip({
              chipClass: 'site-nav__logo-chip',
              logoClass: 'site-nav__logo',
              src: 'images/logos/mater_logo.png',
              alt: 'Mater',
              title: 'Mater Misericordiae University Hospital'
            }) +
            logoChip({
              chipClass: 'site-nav__logo-chip',
              logoClass: 'site-nav__logo',
              src: 'images/logos/ucd_logo.jpg',
              alt: 'University College Dublin',
              title: 'University College Dublin'
            }) +
            logoChip({
              chipClass: 'site-nav__logo-chip',
              logoClass: 'site-nav__logo',
              src: 'images/logos/rinn_AI_logo.png',
              alt: 'RINN AI',
              title: 'Rinn Artificial Intelligence'
            }) +
          '</div>' +
        '</nav>';
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) {
        return;
      }

      this.dataset.rendered = 'true';
      this.classList.add('site-footer');
      this.innerHTML =
        '<div class="site-footer__inner">' +
          '<p class="site-footer__title">ClinEval</p>' +
          '<p class="site-footer__author">Paul Banahan</p>' +
          '<section class="site-footer__funders" aria-label="Project funders">' +
            '<p class="site-footer__funders-label">Supported by</p>' +
            '<div class="site-footer__logos">' +
              logoChip({
                chipClass: 'site-footer__logo-chip',
                logoClass: 'site-footer__logo',
                src: 'images/logos/ri_green.png',
                alt: 'Research Ireland',
                title: 'Research Ireland'
              }) +
              logoChip({
                chipClass: 'site-footer__logo-chip',
                logoClass: 'site-footer__logo',
                src: 'images/logos/Mater_health_foundation.png',
                alt: 'Mater Hospital Foundation',
                title: 'Mater Hospital Foundation'
              }) +
              logoChip({
                chipClass: 'site-footer__logo-chip',
                logoClass: 'site-footer__logo',
                src: 'images/logos/ucdAIHH.png',
                alt: 'UCD AI Healthcare Hub',
                title: 'UCD AI Healthcare Hub'
              }) +
            '</div>' +
          '</section>' +
        '</div>';
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
})();

(function () {
  var SVG_URL = 'clineval_raw.svg';
  var THEME_TEXT_IDS = ['subtitle'];

  function normalizeFill(value) {
    return (value || '').trim().toLowerCase();
  }

  function resolveSvgIdConflicts(svg) {
    var titleEl = svg.getElementById('title');
    if (titleEl) {
      titleEl.id = 'wf-diagram-title';
    }
  }

  function applyThemeTextClasses(svg) {
    THEME_TEXT_IDS.forEach(function (id) {
      var el = svg.getElementById(id);
      if (el) {
        el.classList.add('wf-text-theme');
      }
    });
  }

  function createTooltip() {
    var el = document.createElement('div');
    el.className = 'workflow-tooltip';
    el.setAttribute('role', 'tooltip');
    el.innerHTML =
      '<strong class="workflow-tooltip__label"></strong>' +
      '<p class="workflow-tooltip__description"></p>';
    document.body.appendChild(el);
    return {
      root: el,
      label: el.querySelector('.workflow-tooltip__label'),
      description: el.querySelector('.workflow-tooltip__description'),
    };
  }

  function ensureHitTarget(regionEl) {
    if (regionEl.tagName === 'rect') {
      var fill = normalizeFill(regionEl.getAttribute('fill'));
      if (fill === 'none' || fill === '') {
        regionEl.setAttribute('fill', 'transparent');
      }
    }
  }

  function bindRegion(regionEl, meta, tooltip, container) {
    ensureHitTarget(regionEl);
    regionEl.classList.add('wf-region');
    regionEl.setAttribute('tabindex', '0');
    regionEl.setAttribute('role', 'button');
    regionEl.setAttribute('aria-label', meta.label + ': ' + meta.description);

    function show(clientX, clientY) {
      tooltip.label.textContent = meta.label;
      tooltip.description.textContent = meta.description;
      tooltip.root.classList.add('workflow-tooltip--visible');
      regionEl.classList.add('wf-region--hover');
      positionTooltip(tooltip.root, clientX, clientY, container);
    }

    function hide() {
      tooltip.root.classList.remove('workflow-tooltip--visible');
      regionEl.classList.remove('wf-region--hover');
    }

    regionEl.addEventListener('mouseenter', function (e) {
      show(e.clientX, e.clientY);
    });

    regionEl.addEventListener('mousemove', function (e) {
      if (tooltip.root.classList.contains('workflow-tooltip--visible')) {
        positionTooltip(tooltip.root, e.clientX, e.clientY, container);
      }
    });

    regionEl.addEventListener('mouseleave', hide);

    regionEl.addEventListener('focus', function () {
      var box = regionEl.getBoundingClientRect();
      show(box.left + box.width / 2, box.top);
    });

    regionEl.addEventListener('blur', hide);
  }

  function positionTooltip(tooltipEl, clientX, clientY, container) {
    var offset = 14;
    var pad = 8;
    var rect = tooltipEl.getBoundingClientRect();
    var x = clientX + offset;
    var y = clientY + offset;

    if (x + rect.width > window.innerWidth - pad) {
      x = clientX - rect.width - offset;
    }
    if (y + rect.height > window.innerHeight - pad) {
      y = clientY - rect.height - offset;
    }

    tooltipEl.style.left = Math.max(pad, x) + 'px';
    tooltipEl.style.top = Math.max(pad, y) + 'px';
  }

  function bindRegions(svg, container) {
    var tooltip = createTooltip();

    Object.keys(WORKFLOW_REGIONS).forEach(function (id) {
      var regionEl = svg.getElementById(id);
      if (!regionEl) {
        return;
      }
      bindRegion(regionEl, WORKFLOW_REGIONS[id], tooltip, container);
    });
  }

  function initWorkflowDiagram(svg, container) {
    svg.classList.add('clineval-workflow');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'ClinEval project workflow');
    resolveSvgIdConflicts(svg);
    applyThemeTextClasses(svg);
    bindRegions(svg, container);
  }

  function loadWorkflowDiagram() {
    var container = document.getElementById('workflow-diagram');
    if (!container) {
      return;
    }

    fetch(SVG_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load workflow diagram');
        }
        return response.text();
      })
      .then(function (svgText) {
        container.innerHTML = svgText;
        container.removeAttribute('aria-busy');
        var svg = container.querySelector('svg');
        if (!svg) {
          throw new Error('Invalid workflow diagram');
        }
        initWorkflowDiagram(svg, container);
      })
      .catch(function () {
        container.removeAttribute('aria-busy');
        container.innerHTML =
          '<p class="workflow-diagram__error">Unable to load the workflow diagram.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWorkflowDiagram);
  } else {
    loadWorkflowDiagram();
  }
})();

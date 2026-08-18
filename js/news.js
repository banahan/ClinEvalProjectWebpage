(function () {
  var MONTH_ORDER = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };

  function newsItems() {
    if (typeof CLINEVAL_NEWS === 'undefined') {
      return [];
    }
    return CLINEVAL_NEWS.filter(function (item) {
      return item && item.title && item.month && item.year;
    });
  }

  function groupKey(item) {
    return item.month + ' - ' + item.year;
  }

  function sortItems(items) {
    return items.slice().sort(function (a, b) {
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      return (MONTH_ORDER[b.month] || 0) - (MONTH_ORDER[a.month] || 0);
    });
  }

  function grouped(items) {
    var groups = [];
    var indexByKey = {};
    sortItems(items).forEach(function (item) {
      var key = groupKey(item);
      if (indexByKey[key] === undefined) {
        indexByKey[key] = groups.length;
        groups.push({ heading: key, items: [] });
      }
      groups[indexByKey[key]].items.push(item);
    });
    return groups;
  }

  function createItem(item) {
    var el = item.href ? document.createElement('a') : document.createElement('article');
    el.className = 'news-item';
    if (item.href) {
      el.href = item.href;
    }

    var img = document.createElement('img');
    img.className = 'news-item__logo';
    img.src = item.logo || '';
    img.alt = item.acronym || item.conference || '';
    img.width = 52;
    img.height = 52;

    var fallback = document.createElement('span');
    fallback.className = 'news-item__fallback';
    fallback.textContent = item.acronym || 'NEWS';
    fallback.setAttribute('aria-hidden', 'true');

    if (!item.logo) {
      el.classList.add('is-logo-missing');
    } else {
      img.addEventListener('error', function () {
        el.classList.add('is-logo-missing');
      });
    }

    var body = document.createElement('div');
    body.className = 'news-item__body';

    var title = document.createElement('span');
    title.className = 'news-item__title';
    title.textContent = item.title;

    var conference = document.createElement('span');
    conference.className = 'news-item__conference';
    conference.textContent = item.conference;

    body.appendChild(title);
    body.appendChild(conference);
    el.appendChild(img);
    el.appendChild(fallback);
    el.appendChild(body);
    return el;
  }

  function render(root, items) {
    grouped(items).forEach(function (group) {
      var section = document.createElement('section');
      section.className = 'news-group';

      var h = document.createElement('h3');
      h.className = 'news-group__heading';
      h.textContent = group.heading;
      section.appendChild(h);

      group.items.forEach(function (item) {
        section.appendChild(createItem(item));
      });

      root.appendChild(section);
    });
  }

  function init() {
    var root = document.getElementById('news-section');
    if (!root) {
      return;
    }
    render(root, newsItems());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

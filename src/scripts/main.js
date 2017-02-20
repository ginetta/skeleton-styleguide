// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js

// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
const $ = require('jquery');

const contentIframeEl = $('#styleguide-content');
const navItems = $('.js-styleguide-nav-item');
const activeClass = 'styleguide-nav-item--active';
const sidebar = $('.styleguide-sidebar');

function setIframeSrc(url) {
  const parentContainer = contentIframeEl.parent();
  contentIframeEl.remove();
  contentIframeEl.attr('src', url);
  parentContainer.append(contentIframeEl);

  // contentIframeEl.attr('src', url);
  return false;
}

function convertURL(url) {
  const page = url.substr(url.indexOf('?') + 6);
  const baseURL = window.location.href.split('?')[0];
  return baseURL + page;
}

function setActiveClass(url) {
  sidebar.find(`.${activeClass}`).removeClass(activeClass);
  if (url.includes('?page=')) {
    const target = url.substr(url.indexOf('?') + 6).split('.')[0];
    $(`a[href*=${target}]`).addClass(activeClass);
  }
}

function loadIframe() {
  const currentURL = window.location.href;
  const url = convertURL(window.location.href);
  setActiveClass(currentURL);
  if (currentURL.includes('?page=')) {
    setIframeSrc(url);
  } else {
    setIframeSrc('');
  }
}

// load the correct page in the iframe
window.onload = () => loadIframe();

// Event handler for the browsers back/forward buttons
window.addEventListener('popstate', loadIframe);

// The code for the website comes here.
navItems.each(() => {
  $(this).find('.js-styleguide-nav-link').on('click', function (e) {
    const target = $(this).attr('href');
    e.preventDefault();
    setIframeSrc(target);
    window.history.pushState(null, null, `?page=${target}`);
    $(`.${activeClass}`).removeClass(activeClass);
    $(this).parent().addClass(activeClass);
  });
});

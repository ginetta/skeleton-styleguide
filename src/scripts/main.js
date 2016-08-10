'use strict';

// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
var $ = require('jquery');
var contentIframeEl = $('#styleguide-content');
var navItems = $('.js-styleguide-nav-item');
var activeClass = 'styleguide-nav-item--active';
var sidebar = $('.styleguide-sidebar');

// load the correct page in the iframe
window.onload = function() {
  loadIframe();
};

// Event handler for the browsers back/forward buttons
window.addEventListener('popstate', function(event) {
  loadIframe();
});

// The code for the website comes here.
navItems.each(function(i) {
  $(this).find('.js-styleguide-nav-link').on('click', function(e) {
    var target = $(this).attr('href');
    e.preventDefault();
    setIframeSrc(target);
    window.history.pushState(null, null, '?page=' + target);
    $('.' + activeClass).removeClass(activeClass);
    $(this).parent().addClass(activeClass);
  });
})

function setIframeSrc(url) {
  var parentContainer = contentIframeEl.parent();
  contentIframeEl.remove();
  contentIframeEl.attr('src', url);
  parentContainer.append(contentIframeEl);

  // contentIframeEl.attr('src', url);
  return false;
}

function convertURL(url) {
  var page = url.substr(url.indexOf('?') + 6);
  var baseURL = window.location.href.split('?')[0];
  return baseURL + page;
}

function loadIframe() {
  var currentURL = window.location.href;
  var url = convertURL(window.location.href);
  setActiveClass(currentURL);
  if (currentURL.includes('?page=')) {
    setIframeSrc(url);
  } else {
    setIframeSrc('');
  }
}

function setActiveClass(url) {
    sidebar.find('.' + activeClass).removeClass(activeClass);
    if (url.includes('?page=')) {
      var target = url.substr(url.indexOf('?') + 6).split('.')[0];
      $('a[href*=' + target + ']').addClass(activeClass);
    }
}

'use strict';

// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
var $ = require('jquery');
var contentIframeEl = $('#styleguide-content');
var navItems = $('.js-styleguide-nav-item');
var activeClass = 'styleguide-nav-item--active';

// load the correct page in the iframe
window.onload = function() {
  var currentURL = window.location.href;
  if (currentURL.includes("?page=")) {
    var url = convertURL(window.location.href);
    changeContent(url);
  };
};

// The code for the website comes here.
navItems.each(function(i) {
  $(this).find('.js-styleguide-nav-link').on('click', function(e){
    var target = $(this).attr('href');
    e.preventDefault();
    changeContent(target);
    window.history.pushState('page2', 'Title', '?page=' + target);
    navItems.removeClass(activeClass);
    $(this).parent().addClass(activeClass);
  });
})

function changeContent(url) {
  contentIframeEl.attr('src', url);
  return false;
}

function convertURL(url) {
  var page = url.substr(url.indexOf("?") + 6);
  var baseURL = window.location.href.split('?')[0];
  return baseURL + page;
}

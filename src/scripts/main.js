'use strict';

// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
var $ = require('jquery');
var contentIframeEl = $('#styleguide-content');
var navItems = $('.nav-item');
var activeClass = 'nav-item--active';

// The code for the website comes here.
navItems.each(function(i) {
  $(this).find('.nav-link').on('click', function(e){
    e.preventDefault();
    changeContent($(this).attr('href'));
    navItems.removeClass(activeClass);
    $(this).parent().addClass(activeClass);
  });
})


function changeContent(url) {
  contentIframeEl.attr('src', url);
  return false;
}

// This is how you require your component script:
require('elements/header/script');

// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
var mediaQuery = require('sensible/mediaQuery');

// The code for the website comes here.
if ( mediaQuery.isNot('mobile') ){
  console.log("I'm a not a mobile")
}



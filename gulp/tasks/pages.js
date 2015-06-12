'use strict';
var yamljs        = require('yamljs');
var merge         = require('merge-stream');
var path          = require('path');
var pageshelpers  = require('../utils/pagesHelpers');
var handleError   = require('../utils/handleError');
var stream        = require('../utils/browserSync').stream;

module.exports = function (gulp, $, config) {
  var srcFiles           = config.appFiles.pages;
  var destFiles          = config.paths.pages.dest;
  var languages          = config.languages;
  var contentPath        = config.paths.content.dest;
  var baseDir            = config.basePaths.src;
  var moduleHelpers      = pageshelpers(config);


  // Returns the relative path between the page and the root of the web server
  var getRelativePath = function(file, language) {
    var destPath = config.paths.pages.src + language;
    var filePath = path.dirname(file.path);

    return (path.relative(destPath, filePath) || '.') + '/';
  };

  return function () {

    // Load the content for the page
    function loadContent(language) {

      return yamljs.load(contentPath + language + '.yml');
    }

    function getDestPath(language) {
      var destPath = destFiles + language;
      // Put the default language at the root
      if (language === config.languages[0]) {
        destPath = destFiles;
      }
      return destPath;
    }


    function compilePages(language) {
      var destPath = getDestPath(language);

      return gulp.src(srcFiles)
              .pipe($.plumber(handleError))
              .pipe($.jadeGlobbing())
              .pipe($.data(function(file) {
                return {
                  data:         loadContent(language),
                  relativePath: getRelativePath(file, language),
                  helpers:      moduleHelpers
                };
              }))
              .pipe($.jade({
                pretty:  true,
                client:  false,
                basedir: baseDir
              }))
              .pipe(gulp.dest(destPath));
    }

    // Generate the pages for each language
    var pagesStreams = languages.map(compilePages);

    return merge(pagesStreams).pipe(stream());
  };
};
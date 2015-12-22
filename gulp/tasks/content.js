'use strict';
var merge      = require('merge-stream');
var glob       = require('globby').sync;

module.exports = function (gulp, $, config) {
  var srcFiles  = config.paths.content.src;
  var languages = config.languages;
  var destFiles = config.paths.content.dest;
  var buildDest = config.basePaths.dest;

  // '../filename.html' => 'Filename'
  // Isn't there a node package to help with this?
  var getFileName = function(link) {
    var filename = new String(link).substring(link.lastIndexOf('/') + 1);
      if(filename.lastIndexOf('.') != -1)
        filename = filename.substring(0, filename.lastIndexOf('.'));
     return filename;
  }

  // '../filename.html'
  // =>
  // {
  //   title: 'Filename',
  //   link: '../filename.html',
  // }
  var transformLinks = function(link) {
    return {
      title: getFileName(link),
      link: link
    }
  }

  // '**/*.html'
  // =>
  // {
  //   links: {
  //     {
  //       title: 'Filename1',
  //       link: 'filename1.html',
  //     },
  //     ...
  //   }
  // }
  var replaceGlobs = function(key, value) {
    if (key === 'links' && typeof value === 'string') {
      var links = glob(value, {cwd: buildDest});
      return links.map(transformLinks);
    } else {
      return value;
    }
  }

  var task = function () {
    // Generate the language file for each language
    var contentStreams = languages.map(function(language) {
      return gulp.src(srcFiles + language + '/**/*.yml')
              .pipe($.concat(language + '.yml'))
              .pipe($.yaml({space: 2, replacer: replaceGlobs}))
              // TODO: warn when there is a duplicate key
              .pipe(gulp.dest(destFiles));
    });

    return merge(contentStreams);
  };

  task.description = 'Concatenates all the content files';
  return task;
};

'use strict';
var argv = require('yargs').argv;
var path = require('path');

module.exports = function (dest) {
  var root = path.join(__dirname, '..');
  var basePaths = {
    src:     root + '/src/',
    content: root + '/content/',
    assets:  root + '/assets/',
    dest:    root + '/build/',
    tmp:     root + '/.tmp/'
  };

  // This helps overwriting the target destination
  // For changing .src folders you need to overwrite by hand:
  // conf = require('thisConfig');
  // conf.paths.content.src = 'anotherFolder'
  if (dest != undefined) {
    basePaths.dest = dest;
  }

  var languages = ['en'];

  var paths = {
    scripts: {
      src:  basePaths.src + 'scripts/',
      dest: basePaths.dest + 'js/'
    },
    styles: {
      src:  basePaths.src + 'styles/',
      dest: basePaths.dest + 'css/'
    },
    content: {
      src:  basePaths.content + 'data/',
      dest: basePaths.dest + 'content/data/'
    },
    pages: {
      src:  basePaths.src + 'pages/',
      dest: basePaths.dest
    },
    layouts: {
      src:  basePaths.src + 'layouts/'
    },
    images: {
      src:  basePaths.content + 'images/',
      dest: basePaths.dest + 'content/images/'
    },
    logos: {
      src:  basePaths.assets + 'logos/',
      dest: basePaths.dest + 'assets/logos/'
    },
    favicons: {
      src:  basePaths.assets + 'favicons/',
      dest: basePaths.dest
    },
    fonts: {
      src:  basePaths.assets + 'fonts/',
      dest: basePaths.dest + 'assets/fonts/'
    }
  };

  var appFiles = {
    scripts:   paths.scripts.src + '**/*.js',
    styles:    paths.styles.src + '**/*.scss',
    content:   paths.content.src + '**/*.yml',
    pages:     paths.pages.src + '**/*.jade',
    layouts:   paths.layouts.src + '**/*.jade',
    images:    paths.images.src + '**/*',
    logos:     paths.logos.src + '**/*',
    favicons:  paths.favicons.src + '**/*',
    fonts:     paths.fonts.src + '**/*'
  };

  var components = [
    basePaths.src + 'modules/',
    basePaths.src + 'partials/'
  ];

  var gulpFiles = [
    'gulp/**/*.js',
    'gulpfile.js'
  ];

  var environments = {
    testing: {
      host:        argv.host,
      username:    argv.username,
      projectPath: 'preview.ginetta.net/skeleton-styleguide/',
      releasePath: argv.path,
      privateKey:  argv.privateKey
    }
  };

  return {
    root:         root,
    basePaths:    basePaths,
    languages:    languages,
    paths:        paths,
    appFiles:     appFiles,
    components:   components,
    gulpFiles:    gulpFiles,
    environments: environments
  };
};



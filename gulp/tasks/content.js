const merge = require('merge-stream');
const glob = require('glob').sync;

module.exports = (gulp, $, config) => {
  const srcFiles = config.paths.content.src;
  const languages = config.languages;
  const destFiles = config.paths.content.dest;
  const buildDest = config.basePaths.dest;

  // '../filename.html' => 'Filename'
  // Isn't there a node package to help with this?
  const getFileName = (link) => {
    // eslint-disable-next-line no-new-wrappers
    let filename = new String(link).substring(link.lastIndexOf('/') + 1);
    if (filename.lastIndexOf('.') !== -1) {
      filename = filename.substring(0, filename.lastIndexOf('.'));
    }
    return filename;
  };

  // '../filename.html'
  // =>
  // {
  //   title: 'Filename',
  //   link: '../filename.html',
  // }
  const transformLinks = link => ({
    title: getFileName(link),
    link
  });

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
  const replaceGlobs = (key, value) => {
    if (key === 'links' && typeof value === 'string') {
      return glob(value, { cwd: buildDest }).map(transformLinks);
    }
    return value;
  };

  const task = () => {
    // Generate the language file for each language
    const contentStreams = languages.map(language =>
      gulp.src(`${srcFiles}${language}/**/*.yml`)
        .pipe($.concat(`${language}.yml`))
        .pipe($.yaml({ space: 2, replacer: replaceGlobs }))
        // TODO: warn when there is a duplicate key
        .pipe(gulp.dest(destFiles))
    );

    return merge(contentStreams);
  };

  task.description = 'Concatenates all the content files';
  return task;
};

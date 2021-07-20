const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon');

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
      port: 3005,
      proxy: "localhost:8000",
    },
    browser: "google chrome",
    open: false
  });

  gulp.watch('./**.ejs').on('change', browserSync.reload);
  gulp.watch('./*.ejs').on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./views/*.ejs').on('change', browserSync.reload);
  gulp.watch('./*.js').on('change', browserSync.reload);
}

function start() {
  nodemon({
    script: 'app.js',
    legacyWatch: true,
  }).on('start', function () { watch()})
}


// exports.watch = watch
exports.start = start
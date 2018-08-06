'use strict'

const gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync');

const folder = {
  src: 'src/',
  dist: 'dist/'
}

gulp.task('css', function () {
  return gulp.src([
    folder.src + 'scss/custom.scss'
  ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulp.dest(folder.dist + 'css/'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(folder.dist + 'css/'));
})

gulp.task('js', function () {
  var out = folder.dist + 'js/';
  return gulp.src([
    folder.src + 'js/plugin1.js',
    folder.src + 'js/plugin2.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(out))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(out));
})

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: folder.dist
    }
  })
})

gulp.task('watch', function () {
  gulp.watch(folder.src + 'scss/**/*', ['css', browserSync.reload]);
  gulp.watch(folder.src + 'js/**/*', ['js', browserSync.reload]);
})



gulp.task('default', [ 'css', 'js', 'browserSync','watch' ]);



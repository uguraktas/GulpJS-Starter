'use strict'

const gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  pump = require('pump'),
  newer = require('gulp-newer'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  until = require('gulp-until'),
  autoprefixer = require('gulp-autoprefixer'),
  lodash = require('lodash')


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
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(gulp.dest(folder.dist + 'css/'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cssnano({
      discardComments: { removeAll: true }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(folder.dist + 'css/'));
})

gulp.task('js', function () {
  var out = folder.dist + 'js/';
  return gulp.src([
    folder.src + 'js/vendor/jquery.min.js',
    folder.src + 'js/plugin1.js',
    folder.src + 'js/plugin2.js',
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


gulp.task('html', function () {
  var out = folder.dist;
  return gulp.src([
    folder.src + '*.html',
  ])
    .pipe(gulp.dest(out));
})


gulp.task('copy-assets', function () {
  var assets = {
    js: [
      './node_modules/jquery/dist/jquery.min.js'
    ],
    scss: [
      './node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
  };
  lodash(assets).forEach(function (assets, type) {
    if (type == 'scss') {
      gulp.src(assets)
        .pipe(rename({
          prefix: '_',
          extname: '.scss'
        }))
        .pipe(gulp.dest(folder.src + 'scss/vendor'));
    }
    else {
      gulp.src(assets).pipe(gulp.dest(folder.src + 'js/vendor'));
    }
  })
})


gulp.task('watch', function () {

  gulp.watch(folder.src + '*.html', ['html', browserSync.reload]);
  gulp.watch(folder.src + 'scss/**/*', ['css', browserSync.reload]);
  gulp.watch(folder.src + 'js/**/*', ['js', browserSync.reload]);
})



gulp.task('default', ['copy-assets', 'html', 'css', 'js', 'browserSync', 'watch']);



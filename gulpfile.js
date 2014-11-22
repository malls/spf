'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    reload = require('gulp-livereload'), //do we need both?
    mocha = require('gulp-mocha'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    bowerFiles = require('main-bower-files');

gulp.task('default', function() {
    console.log('run gulp develop!');
});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});

gulp.task('inject', function () {
  var target = gulp.src('./assets/views/layout.jade');
  var sources = gulp.src(['./public/scripts/*.js', './public/stylesheets/*.css'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./public/views'));
});

gulp.task('watch', function() {
    reload.listen();
    gulp.watch('public/**').on('change', reload.changed);
});

gulp.task('sass', function() {
  gulp.src('./assets/styles/*.scss')
    .pipe(watch())
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(reload());
});

gulp.task('test', function () {
    gulp.src('./app/tests/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('develop', function () {
  nodemon({ script: 'app.js', ext: 'js jade scss'})
    .on('change', ['lint', 'test', 'sass', /* 'inject', */ 'watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

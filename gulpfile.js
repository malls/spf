'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    reload = require('gulp-livereload'), //do we need both?
    mocha = require('gulp-mocha');

gulp.task('default', function() {
    console.log('run gulp develop!');
});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});

gulp.task('watch', function() {
    reload.listen();
    gulp.watch('public/**').on('change', reload.changed);
});

gulp.task('sass', function() {
  gulp.src('sass/*.scss')
    .pipe(watch())
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(reload());
});

gulp.task('test', function () {
    gulp.src('./app/tests/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('develop', function () {
  nodemon({ script: 'app.js', ext: 'js jade scss'})
    .on('change', ['lint', 'test', 'watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

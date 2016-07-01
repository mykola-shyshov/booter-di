var gulp = require('gulp')
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');

gulp.task('build', function() {
  runSequence('clean', 'babel');
});

gulp.task('clean', function() {
  return gulp.src('./dist/')
    .pipe(clean());
});

gulp.task('babel', function() {
  return gulp
    .src('./src/*')
    .pipe(babel())
    .pipe(gulp.dest('./dist/'));
});


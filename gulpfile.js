var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('sample-todo', function () {

    return browserify({
        entries: [ './samples/todo/client/src/app.js'],
        debug: true

    })
    .on('error', gutil.log)
    .transform(babelify, { presets: ["es2015", "stage-0"] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./samples/todo/client/assets'));
});

gulp.task('sample', function () {

    return browserify({
        entries: [ './sample/app.js' ]
    })
    .transform(babelify, { presets: ["es2015"] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./sample/dist/'));
});

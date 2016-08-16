var gulp = require('gulp');
var less = require('gulp-less');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('sample-todo', function () {

    return browserify({
        entries: 'samples/todo/client/src/app.js'
    })
    .transform(babelify.configure({
        "presets": ["es2015", "stage-0"]
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('samples/todo/client/assets/app.js'));
});

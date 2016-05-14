var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	browserSync = require('browser-sync');

gulp.task('webpack', function() {
  return gulp.src('js/src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('watch', ['browserSync', 'webpack'], function() {
  gulp.watch('js/src/**/*.js', browserSync.reload);
});
var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  fs = require("fs"),
  path = require("path"),
  url = require("url");

gulp.task('webpack', function() {
  return gulp.src('js/src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// The default file if the file/path is not found
var defaultFile = "index.html"

// I had to resolve to the previous folder, because this task lives inside a ./tasks folder
// If that's not your case, just use `__dirname`
var folder = path.resolve(__dirname);

gulp.task('browserSync', function() {
  browserSync({
    files: ["./css/*.css", "./js/*.js", "./index.html"],
    server: {
      baseDir: "./",
      middleware: function(req, res, next) {
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        var fileExists = fs.existsSync(folder + fileName);
        if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
            req.url = "/" + defaultFile;
        }
        return next();
      }
    }
  });
});
 
gulp.task('compress', function() {
  return gulp.src('js/build.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/builded'));
});

gulp.task('watch', ['browserSync', 'webpack'], function() {
  gulp.watch('js/src/**/*.js', browserSync.reload);
});
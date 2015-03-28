var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
    compass = require('gulp-compass');
 
gulp.task('compass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'build/css',
      sass: 'src/sass'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

 
gulp.task('uglify', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});


gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./build/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['build/*.html'], ['html']);
  gulp.watch('src/sass/style.scss', ['compass']);
  gulp.watch('src/sass/**/*.scss', ['compass']);
  gulp.watch('src/js/*.js', ['uglify']);
});

gulp.task('default', [ 'html', 'compass', 'uglify','connect', 'watch']);
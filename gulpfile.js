var   gulp = require('gulp')
	, babel = require('gulp-babel')
	, concat = require('gulp-concat')
	, uglify = require('gulp-uglify')
	, uglifyCss = require('gulp-uglifycss')
	, ngAnnotate = require('gulp-ng-annotate')
	, watcher = gulp.watch(['./main/components/**/*.js', './main/styles/**/*.css'], ['default']);

watcher.on('change', function( event ) {
	console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date() + ' , running tasks...');
});

gulp.task('css', function() {
	gulp.src('./main/styles/*.css')
		.pipe(uglifyCss())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('./dist/styles/'))
});

gulp.task('javascript', function() {
	gulp.src('./main/components/**/*.js')
		.pipe(babel({
			presets: ['babel-preset-es2015']
		}))
		.pipe(ngAnnotate())
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/src/'))
});

gulp.task('default', ['css', 'javascript']);
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plugins = require('gulp-load-plugins')();
var buffer = require('vinyl-buffer');
var del = require('del');
var bs = require('browser-sync').create();

var paths = {
	sass : {
		scss : 'scss/**/*.scss',
		css : './css',
		map : './'
	},
	js : {
		input : 'js-libs/**/*.js',
		output : './js'
	},
	img : {
		sprites : 'img/sprites/*',
		sprites_output : 'spr.png',
		sprites_scss : '../scss/_sprite.scss',
		images : './img'
	},
	html : 'index.html',
	php : './**/*.php'
}

bs.init({
	proxy: {
		target: "http://html.loc/benebit",
		ws: true
	}
});


gulp.task('sass', function(){
	setTimeout(function(){
	return gulp.src(paths.sass.scss)
		.pipe(sass({
			outputStyle: 'compressed',
			sourceComments: false
		}).on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({browsers:['> 1%', 'IE 8'], cascade: false}))
		.pipe(sourcemaps.write(paths.sass.map))
		.pipe(gulp.dest(paths.sass.css))
		.pipe(notify("CSS Updated"))
		.pipe(bs.stream({match: '**/*.css'}));
		}, 800);
});
gulp.task('scripts', function () {
	return gulp.src(paths.js.input)
		.pipe(plugins.uglify())
		.pipe(plugins.concat('app.min.js'))
		.pipe(gulp.dest(paths.js.output))
		.pipe(notify("JS Updated"));
});
gulp.task('sprites', function () {
	return gulp.src(paths.img.sprites).pipe(spritesmith({
			imgName: paths.img.sprites_output,
			cssName: paths.img.sprites_scss,
			imgOpts: {quality: 100},
			padding: 5,
			algorithm: 'top-down'
		}))
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest('img/'))
		.pipe(notify("Sprites ready."));
});

gulp.task('watch-js', function () {
	gulp.watch(paths.js.input, ['scripts']);
});
gulp.task('watch-sprites', function () {
	gulp.watch(paths.img.sprites, ['sprites']);
});

gulp.task('watch-styles', function () {
	gulp.watch(paths.sass.scss, ['sass']);
});
gulp.task('watch-code', function () {
	gulp.watch([
		paths.html,
		paths.img.images,
		paths.js.input,
		paths.php
	], bs.reload);
});
gulp.task('default', ['watch-styles', 'watch-sprites', 'watch-js','watch-code']);

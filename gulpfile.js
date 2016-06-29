var gulp = require('gulp'),
	gutil = require('gulp-util'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	jsonminify = require('gulp-jsonminify'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	concat = require('gulp-concat');

var env,
	jsSources,
	sassSources,
	htmlSources,
	blogSources,
	portfolioSources,
	jsonSources,
	fontSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development'){
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = '../bretteast-production/';
	sassStyle = 'compact';
}
	
jsSources = ['builds/development/js/*.js'];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '/*.html'];
blogSources = ['builds/development/blog/'];
portfolioSources = ['builds/development/portfolio/'];
jsonSources = [outputDir + '/js/*.json'];
fontSources = [outputDir + 'fonts/*.*'];


gulp.task('js', function(){
	gulp.src('builds/development/js/*.js')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
		.pipe(connect.reload())
});

gulp.task('font', function(){
	gulp.src(fontSources)
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + '/fonts')))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + '/images',
			style: sassStyle
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + '/css'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('builds/development/js/*.js', ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/**/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('blog', function(){
  gulp.src('builds/development/blog/**')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'blog')))
		.pipe(connect.reload())
});

gulp.task('portfolio', function(){
  gulp.src('builds/development/portfolio/**')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'portfolio')))
		.pipe(connect.reload())
});

gulp.task('images', function(){
	gulp.src('builds/development/images/**/*.*')
		.pipe(gulpif(env === 'production', imagemin({
			progressive: true,
			svgoPlugins:[{ removeViewBox: false }],
			use: [pngcrush()]
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
		.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src('builds/development/js/*.json')
		.pipe(gulpif(env === 'production', jsonminify()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
		.pipe(connect.reload())
});

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	})
});

gulp.task('default', ['html', 'json', 'js', 'blog', 'portfolio', 'compass', 'connect', 'images', 'watch']);
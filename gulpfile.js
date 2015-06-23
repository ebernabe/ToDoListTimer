var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var uglify = require("gulp-uglify");
var jadeify = require("jadeify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');;
var nib = require('nib');
var minify = require('gulp-minify-css');
var jade = require("gulp-jade");

gulp.task("build",["js","styl","jade"]);

gulp.task("js",function(){
		return browserify({
			entries:"./app/js/app.js",
			transform:[babelify,jadeify]
			})
		.bundle()
		.pipe(source("app.js"))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest("./public/js/"))
	});

gulp.task("styl",function(){
   return gulp.src("./app/styl/main.styl")
   .pipe(stylus({use:nib()}))
   .pipe(concat("app.css"))
   .pipe(minify())
   .pipe(gulp.dest("./public/css/"));

	});
gulp.task("jade",function(){
	return gulp.src("./app/jade/*.jade")
	.pipe(jade())
	.pipe(gulp.dest("./public/"))
	});

gulp.task("watch",function(){
	gulp.watch("./app/jade/*.jade",["jade"]);
	gulp.watch("./app/styl/*.styl",["styl"]);
	gulp.watch("./app/js/*.js",["js"]);
	
	});
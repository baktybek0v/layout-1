var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleancss = require("gulp-clean-css");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var jsmin = require("gulp-jsmin");


// Функция преоброзвание scss в css (По умолчанию)
function Sass(path) {
    return gulp.src(path)
           .pipe(sass().on('error', sass.logError))
           .pipe(autoprefixer({
                cascade: false,
                browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
            }))
            .pipe(gulp.dest("css/"))
}

// Функция минимизация css кода (По Вызову)
function Style(path) {
    return gulp.src(path)
            .pipe(sourcemaps.init())
            .pipe(cleancss())
            .pipe(rename({suffix: ".min"}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest("css/"))
}

// Функция сжатия Javascript кода  (По умолчанию)
function Js(path) {
    return gulp.src(path)
            .pipe(jsmin())
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest('js/'))
}

gulp.task('default', function () {
    Sass("scss/style.scss"); 
    Js("js/script.js");
});

gulp.task('css', function() {
     Style("css/style.css");
});



/* CV - exercise for HEPL Technical College
 *
 * /gulpfile.js - Gulp tasks
 *
 * coded by MullerCedric
 * started at 25/09/2017
 */

var gulp = require("gulp"),
    image = require("gulp-image"),
    htmlmin = require('gulp-htmlmin'),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps");

// --- Task for images
gulp.task("images", function () {
    gulp.src("src/images/**/*.jpg")
        .pipe(image())
        .pipe(gulp.dest("assets/images"));
});

// --- Task to minify HTML
gulp.task('minify', function() {
    return gulp.src("src/html/**/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./"));
});

// --- Task for styles
gulp.task("css", function () {
    gulp.src("src/sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest("assets/css"));
});

// --- Task for js
gulp.task("js", function () {
    gulp.src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on("error", function (oError) {
            console.error(oError);
            this.emit("end");
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("assets/js"));
});


// --- Watch tasks
gulp.task("watch", function () {
    gulp.watch("src/images/**", ["images"]);
    gulp.watch("src/html/**/*.html", ["minify"]);
    gulp.watch("src/sass/**/*.scss", ["css"]);
    gulp.watch("src/js/**/*.js", ["js"]);
});

// --- Aliases
gulp.task("default", ["images", "minify", "css", "js"]);
gulp.task("work", ["default", "watch"]);
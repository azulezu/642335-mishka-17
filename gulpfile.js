"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("css.old", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server.old", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start.old", gulp.series("css.old", "server.old"));
gulp.task("build.old", gulp.series("css.old", "server.old"));

// ============================================

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo({plugins: [
          {cleanupAttrs: true},
          {removeComments: true},
          {convertPathData: false}
          ]})
      ]))
    .pipe(gulp.dest("source/img-opt"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img-opt"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img-opt/{icon-*,logo-htmlacademy}.svg",
      "!source/img-opt/{icon-flag,icon-interior,icon-toys,icon-tick,icon-map-pin}.svg",
      "!source/img-opt/icon-menu-*,icon-*-arrow}.svg")
    .pipe(imagemin([
            imagemin.svgo({plugins: [
              {removeAttrs: {attrs: ["fill"]}}
            ]})
          ]))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy-files", function () {
  return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/js/**",
        "source/*.ico"
        ],
        {base: "source"}
      )
      .pipe(gulp.dest("build"))
});

gulp.task("copy-img", function () {
  return gulp.src(["source/img-opt/**"])
      .pipe(gulp.dest("build/img"))
});

gulp.task("copy", gulp.series("copy-files", "copy-img"));

gulp.task("clean", function () {
  return del("build");
});


gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  // gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/img/*.*", gulp.series("images", "webp", "sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("images", "webp", "clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));

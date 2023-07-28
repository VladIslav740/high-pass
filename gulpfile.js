const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const image = require("gulp-image");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));

const clean = () => {
  return del(["app"]);
};

const resources = () => {
  return src("src/resources/**").pipe(dest("app"));
};

const html = () => {
  return src("src/**/*.html").pipe(dest("app")).pipe(browserSync.stream());
};

const fonts = () => {
  return src("src/fonts/**").pipe(dest("app/fonts"));
};

const styles = () => {
  return src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/img/svg/**/*.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("app/img"));
};

const images = () => {
  return src([
    "src/img/**/*.jpg",
    "src/img/**/*.png",
    "src/img/*.svg",
    "src/img/**/*.jpeg",
  ]).pipe(dest("app/img"));
};

const scripts = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "app",
    },
  });

  watch("src/scss/**/*.scss", styles);
  watch("src/index.html", html);
  watch("src/fonts/**", fonts);
  watch("src/img/**/*.jpg", images);
  watch("src/img/**/*.png", images);
  watch("src/img/*.svg", images);
  watch("src/img/**/*.jpeg", images);
  watch("src/img/svg/**/*.svg", svgSprites);
  watch("src/js/**/*.js", scripts);
  watch("src/resources/**", resources);
};

exports.default = series(
  clean,
  resources,
  html,
  scripts,
  styles,
  fonts,
  images,
  svgSprites,
  watchFiles
);

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("app"));
};

const stylesBuild = () => {
  return src("src/scss/**/*.scss")
    .pipe(sass().on("error", notify.onError()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("app/css/"));
};

const scriptsBuild = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("script.js"))
    .pipe(uglify({ toplevel: true }).on("error", notify.onError()))
    .pipe(dest("app/js/"));
};

const imagesBuild = () => {
  return src([
    "src/img/**/*.jpg",
    "src/img/**/*.png",
    "src/img/*.svg",
    "src/img/**/*.jpeg",
  ])
    .pipe(image())
    .pipe(dest("app/img"));
};

exports.build = series(
  clean,
  resources,
  htmlMinify,
  scriptsBuild,
  stylesBuild,
  fonts,
  imagesBuild,
  svgSprites
);

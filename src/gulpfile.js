const gulp = require('gulp'),
  log = require('fancy-log'),
  sass = require('gulp-sass'),
  glob = require('gulp-sass-glob'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano');

// Only include config if exists.
let config;
try {
  config = require("./gulp.config");
} catch (error) {
  log(error);
}

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
function sassProdPublic(cb) {
  return (
    gulp.src(config.public.sass.src)
      .pipe(glob())
      .pipe(sass())
      .on('error', (error)=> {log(error)})
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(cssnano())
      .on('end', ()=> {log('Minified CSS')})
      .pipe(gulp.dest(config.public.buildLocation.css))
      .on('end', ()=> {log('Saved CSS files')})
  );
}

function sassDevPublic(cb) {
  return (
    gulp.src(config.public.sass.src)
    .pipe(sourcemaps.init())
    .pipe(glob())
    .pipe(sass())
    .on('error', (error) => {
      log(error);
    }).on('end', ()=> {
      log('Compiled SASS to CSS')
    })
    .pipe(autoprefixer({
      cascade: false
    })).on('end', ()=> {
      log('Autoprefixed CSS')
    })
    .pipe(sourcemaps.write('./maps')).on('end', ()=> {
      log('Created CSS map files')
    })
    .pipe(gulp.dest(config.public.buildLocation.css)).on('end', ()=> {
      log('Saved CSS files for the public theme')
    })
  );
}

exports.sassProdPublic = sassProdPublic;
exports.sassDevPublic = sassDevPublic;

exports.sassProd = sassProdPublic;
exports.sassDev = sassDevPublic;
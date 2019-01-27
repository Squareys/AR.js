let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');

let paths = {
    threejs: 'three.js/',
    aframe: 'aframe/',
    artoolkit: 'three.js/vendor/jsartoolkit5/',
    aruco: 'three.js/src/threex/threex-aruco/',
    signals: 'three.js/vendor/signals.min.js',

};

function aruco() {
    return gulp.src([
        paths.threejs + 'vendor/js-aruco/src/aruco.js',
        paths.threejs + 'vendor/js-aruco/src/cv.js',
        paths.threejs + 'vendor/js-aruco/src/posit1.js',
        paths.threejs + 'vendor/js-aruco/src/svd.js',
        paths.aruco + 'threex-*.js',
    ])
    .pipe(concat('threex-aruco.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist/'));
}

function threejs() {
    return gulp.src([
        paths.artoolkit + 'build/artoolkit.min.js',
        paths.artoolkit + 'js/artoolkit.api.js',
        paths.aruco,
        paths.signals,
        'dist/threex-aruco.js',
        paths.threejs + 'src/threex/*.js',
        paths.threejs + 'src/new-api/*.js',
        paths.threejs + 'src/markers-area/*.js'
    ])
    .pipe(concat('ar.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist/'));
}

function aframe() {
    return gulp.src([
        'dist/ar.js',
        paths.aframe + 'src/component-*.js',
        paths.aframe + 'src/system-arjs*.js',
    ])
    .pipe(concat('aframe-ar.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist/'));
}

var build = gulp.series(aruco, threejs, aframe)

exports.build = build;
exports.default = build;


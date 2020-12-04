//导入模块
const gulp = require('gulp');
const html = require('gulp-htmlmin');
const rename = require('gulp-rename')
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
const imgmin = require('gulp-imagemin');
const babel = require('gulp-babel');
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}



function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle:'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}

function fnJs(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'))
}
function fnImg(){
    return gulp.src('./src/img/*')
    .pipe(imgmin())
    .pipe(gulp.dest('./dist/img'));
}
function fnHtml(){
    return gulp.src('./src/pages/*.html')
    .pipe(html())
    .pipe(gulp.dest('./dist/pages'));
}
function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/sass/*.scss',fnCss);
    gulp.watch('./src/js/*.js',fnJs);
    gulp.watch('./src/pages/*.html',fnHtml);
    
}
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJs;
exports.img = fnImg;

exports.html =  fnHtml;
exports.default = fnWatch;
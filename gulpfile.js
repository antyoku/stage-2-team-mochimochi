//開発中のソースは
//ejsは「src/ejs/core/」または「src/ejs/component/」
//sassは「src/sass/core/」または「src/sass/component/」
//jsは「src/js/」内
//画像は「src/image/」内
//に保存すること

//「gulp」実行で
//ブラウザが立ち上がります
//ejs,sass,js,imageの変更を監視し、適宜変換し、docsに格納します
//docsを変更を監視し、ブラウザをリロードします

//「gulp reloadDocs」実行で
//強制的にejs,sass,js,imageをdocsに格納します

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  ejs = require('gulp-ejs'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync');

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: "./docs/",
      startPath: './docs/index.html'
    }
  });
  return watch('./docs/**', function () {
    browserSync.reload();
  });
});

//func-srcファイルをdocsへコピー
function sassDocs() {
  gulp.src('./src/sass/core/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./docs/css'));
};

function ejsDocs() {
  gulp.src('./src/ejs/core/*.ejs')
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./docs'));
};

function jsDocs() {
  gulp.src('./src/js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./docs/js'));
};

function imageDocs() {
  gulp.src('./src/image/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('./docs/image'));
};

//task-srcの変更を監視
gulp.task('watchSass', function () {
  return watch('./src/sass/*/*.scss', sassDocs);
});
gulp.task('watchEjs', function () {
  return watch('./src/ejs/*/*.ejs', ejsDocs);
});
gulp.task('watchJs', function () {
  return watch('./src/js/*.js', jsDocs);
});
gulp.task('watchImage', function () {
  return watch('./src/image/*', imageDocs);
});

//task-srcを元にdocsを更新
gulp.task('reloadDocs', function () {
  sassDocs();
  ejsDocs();
  jsDocs();
  imageDocs();
});


gulp.task('default', ['server', 'watchSass', 'watchEjs', 'watchJs', 'watchImage']);
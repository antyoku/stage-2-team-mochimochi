var gulp = require('gulp')
var watch = require('gulp-watch')
var sass = require('gulp-sass')
var plumber = require('gulp-plumber')
var imagemin = require('gulp-imagemin')
var concat = require('gulp-concat')
var ejs = require('gulp-ejs')
var rename = require('gulp-rename')
var browserSync = require('browser-sync')

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: './docs/',
      startPath: './docs/index.html'
    }
  })
  return watch('./docs/**', function () {
    browserSync.reload()
  })
})

// func-srcファイルをdocsへコピー
function sassDocs () {
  gulp.src('./src/sass/core/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./docs/css'))
}

function ejsDocs () {
  gulp.src('./src/ejs/core/*.ejs')
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./docs'))
}

function jsDocs () {
  gulp.src('./src/js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./docs/js'))
}

function imageDocs () {
  gulp.src('./src/image/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('./docs/image'))
}

// task-srcの変更を監視
gulp.task('watchSass', function () {
  return watch('./src/sass/*/*.scss', sassDocs)
})
gulp.task('watchEjs', function () {
  return watch('./src/ejs/*/*.ejs', ejsDocs)
})
gulp.task('watchJs', function () {
  return watch('./src/js/*.js', jsDocs)
})
gulp.task('watchImage', function () {
  return watch('./src/image/*', imageDocs)
})

// task-srcを元にdocsを更新
gulp.task('reloadDocs', function () {
  sassDocs()
  ejsDocs()
  jsDocs()
  imageDocs()
})

gulp.task('default', ['server', 'watchSass', 'watchEjs', 'watchJs', 'watchImage'])

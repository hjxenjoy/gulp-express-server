var gulp = require('gulp');
var server = require('gulp-express');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');

// 启动静态服务器，并且提前编译静态文件和css
gulp.task('server', ['complie'], function () {
  server.run(['app.js']);
});

// 编译静态HTML，使用EJS模板
gulp.task('templates', function () {
  // 使用ejs模板编译生成HTML，并设置为.html后缀
  gulp.src('./templates/*.ejs')
    .pipe(ejs({}, {ext: '.html'}).on('error', gutil.log))
    .pipe(gulp.dest('./public'));
});

// 编译SCSS文件，进行压缩和重新命名（加.min后缀）
gulp.task('styles', function () {
  gulp.src('./sass/*.scss')
    // 将scss文件编译成css
    .pipe(sass()).on('error', sass.logError)
    // 自动添加浏览器产商前缀，例如-webkit-
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
    }))
    // css文件压缩
    .pipe(cssnano())
    // 文件重命名
    .pipe(rename(function (path) {
      path.extname = ".min.css"
    }))
    .pipe(gulp.dest('./public/styles'));
});

// 实时监听源文件变化
gulp.task('watch', function () {
  gulp.watch(['./templates/**/*.ejs'], ['templates']);
  gulp.watch(['./sass/**/*.scss'], ['styles']);
});

// 组合命令别名，方便调用
gulp.task('complie', ['templates', 'styles', 'watch']);

// 默认GULP任务，方便快捷启动
gulp.task('default', ['server']);
/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    i18n = require('gulp-i18n-combine'),
    rename = require("gulp-rename"),
    connect = require('gulp-connect'),
    clearAll = require('del'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minimist = require('minimist'),
    browsersync = require('browser-sync');;
var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

//默认development环境
var knowOptions = {
    string: 'env',
    default: {
      env: process.env.NODE_ENV || 'development'
    }
  };

const config = require('./webpack.config.js');

  gulp.task('webpack', function (callback) {

    webpack(config).run(function (err, stats) {
  
      if(err) {
  
        throw new gutil.PluginError('webpack:build-dev', err);
  
      }
  
      gutil.log('[webpack:build-dev]', stats.toString({
  
        chunks: false,
  
        colors: true
  
      }));
  
      callback();
  
    });
  
  });


var options = minimist(process.argv.slice(2), knowOptions);

gulp.task('constants', function() {
    //读入config.json文件
    var myConfig = require('./config.json');
    //取出对应的配置信息
    var envConfig = myConfig[options.env];
    var conConfig = 'appconfig = ' + JSON.stringify(envConfig);
    //生成config.js文件
    return string_src("config.js", conConfig)
        .pipe(gulp.dest('src/js/'))
  });

//生成filename文件，存入string内容
function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
      this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
      this.push(null)
    }
    return src
  }

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images')).on('end', done);
});
// 测试配置的语言包
// gulp.task('i18n', function () {
// 	return gulp.src('./src/i18n/**/*.json')
// 		.pipe(i18n({ mod: 2 })) // 采用模式2
// 		.pipe(gulp.dest('./dist/i18n/'));
// });



//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    // gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        // .pipe(md5(10, 'dist/app/*.html'))
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('dist/rev/js'))
        .on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    // gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src('dist/css/*.css')
        // .pipe(md5(10, 'dist/app/*.html'))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('dist/rev/css'))
        .on('end', done);
});
//Html替换css、js文件版本
gulp.task('revHtml', function (done) {
    gulp.src(['dist/rev/**/*.json','dist/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist/'))
        .on('end', done);
});



//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/*.html','src/**/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .on('end', done);
        // .pipe(connect.reload())
});


gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});



//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('lessmin', function (done) {
    gulp.src(['src/css/main.less', 'src/css/*.css'])
        .pipe(less())
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        //.pipe(spriter({}))
        // .pipe(concat('style.min.css'))
        // .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())   //压缩css
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});

//js

gulp.task('script', function (done) {
    gulp.src(['src/js/**/*.js'])
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('dist/js/'))
        .on('end', done);
});

gulp.task('watch', function (done) {
    // gulp.watch('src/**/*', ['lessmin', 'build-js', 'fileinclude'])
    //     .on('end', done);
    //     gulp.watch('src/*', ['lessmin', 'build-js', 'fileinclude'])
    //     .on('end', done);
    // browsersync.init({
    //     server: {
    //         baseDir: ['dist']
    //     }
    // });
    gulp.watch(['src/*.html','src/*.inc'],['fileinclude'], browsersync.reload).on('end', done);
    gulp.watch('src/css/*.css',['lessmin'], browsersync.reload).on('end', done);
    gulp.watch('src/images/**/*',['copy:images'], browsersync.reload).on('end', done);
    gulp.watch('src/js/*.js',["webpack"], browsersync.reload).on('end', done);
    // gulp.watch('src/js/*.js',["script"], browsersync.reload).on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);



//清空dist文件夹
gulp.task('clearAll', function () {
    clearAll('./dist/*');
});


//发布
gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'revHtml' , 'open']);

// 删除
gulp.task('del', ['clearAll']);

//开发 1  'script'
// gulp.task('dev', ['connect', 'constants', 'copy:images','script' , 'fileinclude', 'lessmin', 'watch', 'open']);
//开发 2
gulp.task('dev', ['connect', 'constants', 'copy:images','build-js' ,  'fileinclude', 'lessmin', 'watch', 'open']);
//打包
gulp.task('build', ['connect', 'constants', 'copy:images','build-js' , 'fileinclude', 'lessmin', 'watch', 'open']);



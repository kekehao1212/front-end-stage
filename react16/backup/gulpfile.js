var gulp = require('gulp-param')(require('gulp'), process.argv),
    image = require('gulp-image'),
    del = require('del'),
    md5 = require('md5'),
    pkg = require('./package.json'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip'),
    ejs = require("gulp-ejs"),
    exec = require('child_process').exec,
    htmlmin = require('gulp-htmlmin');
   // gulp_remove_logging = require("gulp-remove-logging");
var pubVersion = require('./publishVersion')
var repo_static_path = pkg.name + '/'

gulp.task('clean', function (callback) {
    return del(['build/*', 'release/*'], callback);
});

gulp.task('image', function () {
    gulp.src('./src/img/*.*', {base: './src/'})
        .pipe(image())
        .pipe(gulp.dest('build/' + repo_static_path ));
});


gulp.task('appImg', function () {
    gulp.src('./appImg/**/*.*', {base: './'})
        .pipe(image())
        .pipe(gulp.dest('build/' + repo_static_path));
});


gulp.task('assets', function () {
    gulp.src(['./src/assets/**/*.*', '!./src/assets/**/*.js'], {base: './'})
        .pipe(gulp.dest('build/' + repo_static_path ));
    gulp.src('./src/assets/**/*.js', {base: './'})
    //.pipe(uglify())
        .pipe(gulp.dest('build/' + repo_static_path ));
});
gulp.task('html', function () {
    gulp.src('./src/index.html', {base: './'})
        .pipe(gulp.dest('build' + repo_static_path));
})
gulp.task('js', function () {
    gulp.src('./dist/**/*.js')
        .pipe(gulp.dest('build/' + repo_static_path + pubVersion + '/js'));
})


function exe(cmd, fn) {
    exec(cmd, { 
   encoding: 'utf8',
   //timeout: 0, /*子进程最长执行时间 */
   maxBuffer: 2000*1024,  /*stdout和stderr的最大长度*/
   killSignal: 'SIGTERM',
   //cwd: null,
   //env: null
 },function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        console.log(err);
        if (fn) {
            fn()
        }
    });
}

gulp.task('copyTxt', function () {
    gulp.src(['./config/**/*'])
        .pipe(gulp.dest('release'));
    gulp.src(['./config/**/.*'])
     .pipe(gulp.dest('release'))
})

gulp.task('zipHtml', function () {
    gulp.src(['./src/index_prod.html'])
        .pipe(ejs({
            version: pubVersion
        }))
        .pipe(htmlmin({removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest('release'))
})
gulp.task('zipStatic', function () {
    gulp.src('build/**/*.*')
        .pipe(zip('static.zip'))
        .pipe(gulp.dest('release'))
})

gulp.task('build', function () {
    //gulp.start(['clean']);
    gulp.start([ 'image', 'zipHtml']);
    console.log(gutil.colors.green('build is starting...'))
    exe('webpack --progress -p  --config webpack.config.prod.js --optimize-minimize', function () {
        console.log(gutil.colors.green('build is done'))
        gulp.start(['js']);
        // setTimeout(function(){
        //     gulp.start(['zipStatic']);
        // },5000)
        console.log(gutil.colors.green('all done!!!'))
    })
})

gulp.task('default', function () {
    gulp.start(['build']);
});

gulp.task('vera', function () {
    vera()

})
function vera(fn) {
    del('./src/lib/vera').then(function (paths) {
        console.log(gutil.colors.green('del...:' + paths.join('\n')))
        exe('cd src/lib && git clone git@gitlab.tools.vipshop.com:wikies.wan/vera.git && cd vera && git checkout react-vera-156', function () {
            del('./src/lib/vera/.git')
            del('./src/lib/vera/.gitignore')
            console.log(gutil.colors.green('vera is updated'))
            if (fn) {
                fn()
            }
        })
    })
}

gulp.task('md5', ['doMd5'], function (version) {
});

gulp.task('doMd5', function (version) {

    if (typeof version !== 'string') {
        console.error(gutil.colors.red('error: gulp md5 --version yourVerson'))
        return false
    }
    var versonMd5 = md5(version)
    console.log(versonMd5)
    console.log(versonMd5.substring(0, 8))
});





